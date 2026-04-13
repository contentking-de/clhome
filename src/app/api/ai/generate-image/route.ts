import { NextRequest } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { put } from "@vercel/blob";
import sharp from "sharp";
import { auth } from "@/lib/auth";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const TARGET_WIDTH = 1280;
const TARGET_HEIGHT = 720;
const MAX_FILE_SIZE = 100 * 1024; // 100KB

function buildImagePrompt(title: string, excerpt: string): string {
  return `Create a photorealistic, editorial-quality photograph that could serve as the hero image for a professional blog article titled: "${title}".

Context: ${excerpt || title}

Requirements:
- Photorealistic style, like a professional stock photo or editorial photography
- Modern, clean composition with good lighting
- Related to law, legal tech, digitalization, or business technology
- No text, no watermarks, no logos, no UI elements
- Subtle, professional color palette
- Suitable as a wide banner/hero image for a blog post`;
}

async function compressToTarget(
  pngBuffer: Buffer,
  maxBytes: number
): Promise<Buffer> {
  let quality = 82;

  while (quality >= 30) {
    const result = await sharp(pngBuffer)
      .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: "cover" })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();

    if (result.byteLength <= maxBytes) {
      return result;
    }
    quality -= 8;
  }

  return sharp(pngBuffer)
    .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: "cover" })
    .jpeg({ quality: 30, mozjpeg: true })
    .toBuffer();
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  const { title, excerpt } = body;

  if (!title || typeof title !== "string") {
    return Response.json(
      { error: "Ein Titel ist erforderlich" },
      { status: 400 }
    );
  }

  try {
    const prompt = buildImagePrompt(title, excerpt || "");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: prompt,
      config: {
        responseModalities: ["IMAGE"],
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts) {
      throw new Error("Keine Antwort von Gemini erhalten");
    }

    let imageData: string | null = null;
    for (const part of parts) {
      if (part.inlineData?.data) {
        imageData = part.inlineData.data;
        break;
      }
    }

    if (!imageData) {
      throw new Error("Kein Bild in der Antwort gefunden");
    }

    const pngBuffer = Buffer.from(imageData, "base64");
    const jpegBuffer = await compressToTarget(pngBuffer, MAX_FILE_SIZE);

    const slug = title
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const filename = `covers/${slug}-${Date.now()}.jpg`;

    const blob = await put(filename, jpegBuffer, {
      access: "public",
      contentType: "image/jpeg",
    });

    return Response.json({
      url: blob.url,
      size: jpegBuffer.byteLength,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Bildgenerierung fehlgeschlagen";
    return Response.json({ error: message }, { status: 500 });
  }
}
