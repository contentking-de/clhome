import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { messages, title = "Research Export" } = await request.json();

    const children: Paragraph[] = [
      new Paragraph({
        text: title,
        heading: HeadingLevel.HEADING_1,
        spacing: { after: 300 },
      }),
    ];

    for (const msg of messages) {
      const label = msg.role === "user" ? "Benutzer" : "Assistent";

      children.push(
        new Paragraph({
          spacing: { before: 200 },
          children: [new TextRun({ text: `${label}:`, bold: true })],
        }),
      );

      children.push(
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: msg.content })],
        }),
      );
    }

    const doc = new Document({
      sections: [{ children }],
    });

    const buffer = await Packer.toBuffer(doc);

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": 'attachment; filename="research-export.docx"',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to export document" }, { status: 500 });
  }
}
