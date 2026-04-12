"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface PostFormProps {
  initialData?: {
    id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    published: boolean;
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ToolbarButton({
  onClick,
  active,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
        active
          ? "bg-surface-tint text-white"
          : "text-secondary hover:bg-surface-container-highest"
      }`}
    >
      {children}
    </button>
  );
}

export default function PostForm({ initialData }: PostFormProps) {
  const router = useRouter();
  const isEdit = !!initialData?.id;

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [coverImage, setCoverImage] = useState(
    initialData?.coverImage || ""
  );
  const [published, setPublished] = useState(
    initialData?.published || false
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Beginnen Sie hier mit dem Schreiben...",
      }),
      Image,
    ],
    content: initialData?.content || "",
    editorProps: {
      attributes: {
        class: "prose-blog",
      },
    },
  });

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!isEdit) {
      setSlug(slugify(value));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editor) return;

    setSaving(true);
    setError("");

    const body = {
      title,
      slug,
      excerpt,
      content: editor.getHTML(),
      coverImage,
      published,
    };

    try {
      const url = isEdit ? `/api/posts/${initialData!.id}` : "/api/posts";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Fehler beim Speichern");
      }

      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ein Fehler ist aufgetreten."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-on-surface mb-1.5">
            Titel
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/50 text-on-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-on-surface mb-1.5">
            Slug
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/50 text-on-background"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-on-surface mb-1.5">
          Auszug
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/50 text-on-background resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-on-surface mb-1.5">
          Titelbild-URL
        </label>
        <input
          type="url"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="https://..."
          className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/50 text-on-background"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-on-surface mb-1.5">
          Inhalt
        </label>
        {editor && (
          <div className="border border-outline-variant/30 rounded-lg overflow-hidden bg-surface">
            <div className="flex items-center gap-1 p-2 border-b border-outline-variant/20 bg-surface-container-low flex-wrap">
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                active={editor.isActive("heading", { level: 2 })}
                title="Überschrift 2"
              >
                H2
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                active={editor.isActive("heading", { level: 3 })}
                title="Überschrift 3"
              >
                H3
              </ToolbarButton>
              <span className="w-px h-5 bg-outline-variant/30 mx-1" />
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                active={editor.isActive("bold")}
                title="Fett"
              >
                <strong>B</strong>
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                active={editor.isActive("italic")}
                title="Kursiv"
              >
                <em>I</em>
              </ToolbarButton>
              <span className="w-px h-5 bg-outline-variant/30 mx-1" />
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleBulletList().run()
                }
                active={editor.isActive("bulletList")}
                title="Aufzählung"
              >
                <span className="material-symbols-outlined text-base">
                  format_list_bulleted
                </span>
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleOrderedList().run()
                }
                active={editor.isActive("orderedList")}
                title="Nummerierung"
              >
                <span className="material-symbols-outlined text-base">
                  format_list_numbered
                </span>
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleBlockquote().run()
                }
                active={editor.isActive("blockquote")}
                title="Zitat"
              >
                <span className="material-symbols-outlined text-base">
                  format_quote
                </span>
              </ToolbarButton>
              <span className="w-px h-5 bg-outline-variant/30 mx-1" />
              <ToolbarButton
                onClick={() => {
                  const url = window.prompt("Bild-URL:");
                  if (url) {
                    editor.chain().focus().setImage({ src: url }).run();
                  }
                }}
                title="Bild einfügen"
              >
                <span className="material-symbols-outlined text-base">
                  image
                </span>
              </ToolbarButton>
            </div>
            <div className="tiptap-editor">
              <EditorContent editor={editor} />
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-outline-variant/30 rounded-full peer peer-checked:bg-surface-tint transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
        </label>
        <span className="text-sm font-medium text-on-surface">
          {published ? "Veröffentlicht" : "Entwurf"}
        </span>
      </div>

      {error && (
        <div className="bg-error-container text-on-error-container px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-surface-tint text-white px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition-all disabled:opacity-50"
        >
          {saving
            ? "Wird gespeichert..."
            : isEdit
              ? "Aktualisieren"
              : "Erstellen"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 rounded-lg border border-outline-variant/30 font-semibold hover:bg-surface-container-low transition-all"
        >
          Abbrechen
        </button>
      </div>
    </form>
  );
}
