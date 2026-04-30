"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { useState, useRef, useCallback } from "react";

const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: { default: null, renderHTML: (attrs) => (attrs.width ? { width: attrs.width } : {}) },
      style: { default: null, renderHTML: (attrs) => (attrs.style ? { style: attrs.style } : {}) },
    };
  },
  addNodeView() {
    return ({ node, editor, getPos }) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("tiptap-image-wrapper");
      wrapper.style.width = node.attrs.width || "100%";
      wrapper.style.position = "relative";
      wrapper.style.display = "inline-block";
      wrapper.style.maxWidth = "100%";

      const img = document.createElement("img");
      img.src = node.attrs.src;
      if (node.attrs.alt) img.alt = node.attrs.alt;
      if (node.attrs.title) img.title = node.attrs.title;
      img.style.width = "100%";
      img.style.display = "block";
      img.draggable = false;

      const handle = document.createElement("div");
      handle.classList.add("tiptap-image-handle");

      wrapper.append(img, handle);

      let startX = 0;
      let startWidth = 0;

      function onPointerDown(e: PointerEvent) {
        e.preventDefault();
        startX = e.clientX;
        startWidth = wrapper.offsetWidth;
        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerUp);
      }

      function onPointerMove(e: PointerEvent) {
        const newWidth = Math.max(80, startWidth + (e.clientX - startX));
        wrapper.style.width = `${newWidth}px`;
      }

      function onPointerUp() {
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
        if (typeof getPos === "function") {
          const pos = getPos();
          if (pos == null) return;
          editor.chain().focus().command(({ tr }) => {
            tr.setNodeMarkup(pos, undefined, { ...node.attrs, width: wrapper.style.width });
            return true;
          }).run();
        }
      }

      handle.addEventListener("pointerdown", onPointerDown);

      return { dom: wrapper, destroy() { handle.removeEventListener("pointerdown", onPointerDown); } };
    };
  },
});
import { useRouter } from "next/navigation";
import AiGenerateDialog from "./AiGenerateDialog";
import Icon from "../ui/Icon";

interface PostFormProps {
  initialData?: {
    id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    published: boolean;
    authorId?: string;
  };
  authors?: { id: string; name: string | null; email: string }[];
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

async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: formData });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Upload fehlgeschlagen");
  }
  const data = await res.json();
  return data.url;
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

export default function PostForm({ initialData, authors }: PostFormProps) {
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
  const [authorId, setAuthorId] = useState(initialData?.authorId || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [coverUploading, setCoverUploading] = useState(false);
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const editorImageInputRef = useRef<HTMLInputElement>(null);

  const handleCoverUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setCoverUploading(true);
      setError("");
      try {
        const url = await uploadFile(file);
        setCoverImage(url);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Titelbild-Upload fehlgeschlagen"
        );
      } finally {
        setCoverUploading(false);
        if (coverInputRef.current) coverInputRef.current.value = "";
      }
    },
    []
  );

  const handleEditorImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editorRef.current) return;
      setError("");
      try {
        const url = await uploadFile(file);
        editorRef.current.chain().focus().setImage({ src: url }).run();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Bild-Upload fehlgeschlagen"
        );
      } finally {
        if (editorImageInputRef.current)
          editorImageInputRef.current.value = "";
      }
    },
    []
  );

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Beginnen Sie hier mit dem Schreiben...",
      }),
      ResizableImage,
      Table.configure({ resizable: false }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: initialData?.content || "",
    editorProps: {
      attributes: {
        class: "prose-blog",
      },
    },
  });

  const editorRef = useRef(editor);
  editorRef.current = editor;

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!isEdit) {
      setSlug(slugify(value));
    }
  }

  const handleAiGenerated = useCallback(
    (data: {
      title: string;
      excerpt: string;
      content: string;
    }) => {
      setTitle(data.title);
      setSlug(slugify(data.title));
      setExcerpt(data.excerpt);
      if (editorRef.current) {
        editorRef.current.commands.setContent(data.content);
      }
    },
    []
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editor) return;

    setSaving(true);
    setError("");

    const body: Record<string, unknown> = {
      title,
      slug,
      excerpt,
      content: editor.getHTML(),
      coverImage,
      published,
    };

    if (authorId) {
      body.authorId = authorId;
    }

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
      <div className="bg-gradient-to-r from-surface-tint/5 to-surface-tint/10 border border-surface-tint/20 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-surface-tint/15 flex items-center justify-center">
            <Icon name="auto_awesome" className="text-surface-tint text-xl" />
          </div>
          <div>
            <p className="text-sm font-semibold text-on-background">
              KI-Assistent
            </p>
            <p className="text-xs text-secondary">
              Artikel mit Web-Recherche generieren
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setAiDialogOpen(true)}
          className="bg-surface-tint text-white px-4 py-2 rounded-lg text-sm font-semibold hover:brightness-110 transition-all flex items-center gap-2"
        >
          <Icon name="auto_awesome" className="text-base" />
          Mit KI generieren
        </button>
      </div>

      <AiGenerateDialog
        open={aiDialogOpen}
        onClose={() => setAiDialogOpen(false)}
        onGenerated={handleAiGenerated}
      />

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

      {authors && authors.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-on-surface mb-1.5">
            Autor
          </label>
          <select
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/50 text-on-background"
          >
            {!authorId && <option value="">— Aktueller Benutzer —</option>}
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name || author.email}
              </option>
            ))}
          </select>
        </div>
      )}

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
          Titelbild
        </label>
        <input
          ref={coverInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleCoverUpload}
          className="hidden"
        />
        {coverImage ? (
          <div className="relative group">
            <img
              src={coverImage}
              alt="Titelbild-Vorschau"
              className="w-full h-48 object-cover rounded-lg border border-outline-variant/30"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="bg-white text-on-surface px-4 py-2 rounded-lg text-sm font-medium hover:bg-surface-container-highest transition-colors"
              >
                Ersetzen
              </button>
              <button
                type="button"
                onClick={() => setCoverImage("")}
                className="bg-error text-on-error px-4 py-2 rounded-lg text-sm font-medium hover:brightness-110 transition-all"
              >
                Entfernen
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            disabled={coverUploading}
            className="w-full h-48 rounded-lg border-2 border-dashed border-outline-variant/40 bg-surface-container-low hover:bg-surface-container-highest transition-colors flex flex-col items-center justify-center gap-2 text-secondary disabled:opacity-50"
          >
            {coverUploading ? (
              <>
                <Icon name="progress_activity" className="text-3xl animate-spin" />
                <span className="text-sm">Wird hochgeladen...</span>
              </>
            ) : (
              <>
                <Icon name="cloud_upload" className="text-3xl" />
                <span className="text-sm">Bild hochladen</span>
                <span className="text-xs text-secondary/60">
                  JPEG, PNG, WebP oder GIF
                </span>
              </>
            )}
          </button>
        )}
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
                <Icon name="format_list_bulleted" className="text-base" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleOrderedList().run()
                }
                active={editor.isActive("orderedList")}
                title="Nummerierung"
              >
                <Icon name="format_list_numbered" className="text-base" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleBlockquote().run()
                }
                active={editor.isActive("blockquote")}
                title="Zitat"
              >
                <Icon name="format_quote" className="text-base" />
              </ToolbarButton>
              <span className="w-px h-5 bg-outline-variant/30 mx-1" />
              <ToolbarButton
                onClick={() => editorImageInputRef.current?.click()}
                title="Bild hochladen"
              >
                <Icon name="image" className="text-base" />
              </ToolbarButton>
              <span className="w-px h-5 bg-outline-variant/30 mx-1" />
              <ToolbarButton
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run()
                }
                title="Tabelle einfügen"
              >
                <Icon name="table" className="text-base" />
              </ToolbarButton>
            </div>
            <input
              ref={editorImageInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleEditorImageUpload}
              className="hidden"
            />
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
