"use client";

import { useState, useRef, useCallback } from "react";
import Icon from "@/components/ui/Icon";

type User = { id: string; name: string | null; email: string; avatar: string | null };
type Folder = {
  id: string;
  name: string;
  parentId: string | null;
  order: number;
  createdAt: string | Date;
  _count: { files: number; children: number };
};
type MediaFile = {
  id: string;
  name: string;
  url: string;
  size: number;
  contentType: string;
  folderId: string | null;
  createdAt: string | Date;
  uploadedBy: User;
};
type BreadcrumbItem = { id: string | null; name: string };

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImage(contentType: string) {
  return contentType.startsWith("image/");
}

function fileIcon(contentType: string) {
  if (contentType.startsWith("image/")) return "image";
  if (contentType.includes("pdf")) return "article";
  if (contentType.includes("video")) return "photo_camera";
  return "article";
}

export default function MediaBrowser({
  initialFolders,
  initialFiles,
}: {
  initialFolders: Folder[];
  initialFiles: MediaFile[];
}) {
  const [folders, setFolders] = useState(initialFolders);
  const [files, setFiles] = useState(initialFiles);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([{ id: null, name: "Mediathek" }]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [renameTarget, setRenameTarget] = useState<{ type: "file" | "folder"; id: string; name: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentFolderId = breadcrumbs[breadcrumbs.length - 1].id;

  const fetchFolderContents = useCallback(async (folderId: string | null) => {
    setLoading(true);
    const params = folderId ? `?parentId=${folderId}` : "";
    const fileParams = folderId ? `?folderId=${folderId}` : "";
    const [foldersRes, filesRes] = await Promise.all([
      fetch(`/api/media/folders${params}`),
      fetch(`/api/media${fileParams}`),
    ]);
    if (foldersRes.ok) setFolders(await foldersRes.json());
    if (filesRes.ok) setFiles(await filesRes.json());
    setLoading(false);
  }, []);

  async function navigateToFolder(folder: Folder) {
    setBreadcrumbs((prev) => [...prev, { id: folder.id, name: folder.name }]);
    await fetchFolderContents(folder.id);
  }

  async function navigateToBreadcrumb(index: number) {
    const target = breadcrumbs[index];
    setBreadcrumbs((prev) => prev.slice(0, index + 1));
    await fetchFolderContents(target.id);
  }

  async function uploadFiles(fileList: FileList) {
    setUploading(true);
    for (const file of Array.from(fileList)) {
      const formData = new FormData();
      formData.append("file", file);
      if (currentFolderId) formData.append("folderId", currentFolderId);
      const res = await fetch("/api/media", { method: "POST", body: formData });
      if (res.ok) {
        const uploaded = await res.json();
        setFiles((prev) => [uploaded, ...prev]);
      }
    }
    setUploading(false);
  }

  async function createFolder() {
    if (!newFolderName.trim()) return;
    const res = await fetch("/api/media/folders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newFolderName.trim(), parentId: currentFolderId }),
    });
    if (res.ok) {
      const folder = await res.json();
      setFolders((prev) => [...prev, folder]);
    }
    setNewFolderName("");
    setShowNewFolder(false);
  }

  async function deleteFile(id: string) {
    if (!confirm("Datei wirklich löschen?")) return;
    const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
    if (res.ok) setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  async function deleteFolder(id: string) {
    if (!confirm("Ordner und alle Inhalte wirklich löschen?")) return;
    const res = await fetch(`/api/media/folders/${id}`, { method: "DELETE" });
    if (res.ok) setFolders((prev) => prev.filter((f) => f.id !== id));
  }

  async function renameItem() {
    if (!renameTarget || !renameTarget.name.trim()) return;
    const endpoint =
      renameTarget.type === "folder"
        ? `/api/media/folders/${renameTarget.id}`
        : `/api/media/${renameTarget.id}`;
    const res = await fetch(endpoint, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: renameTarget.name.trim() }),
    });
    if (res.ok) {
      const updated = await res.json();
      if (renameTarget.type === "folder") {
        setFolders((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
      } else {
        setFiles((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
      }
    }
    setRenameTarget(null);
  }

  return (
    <div className="rounded-xl border border-outline-variant/10 bg-surface-container-low overflow-hidden">
      <div className="px-6 py-4 border-b border-outline-variant/10 flex items-center justify-between">
        <nav className="flex items-center gap-1 text-sm">
          {breadcrumbs.map((item, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <Icon name="chevron_right" className="text-xs text-secondary" />}
              <button
                onClick={() => navigateToBreadcrumb(i)}
                className={`hover:text-surface-tint transition-colors ${
                  i === breadcrumbs.length - 1
                    ? "text-on-background font-medium"
                    : "text-secondary"
                }`}
              >
                {item.name}
              </button>
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewFolder(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-highest/50 text-on-background text-xs font-medium hover:bg-surface-tint/10 transition-colors"
          >
            <Icon name="add" className="text-xs" />
            Neuer Ordner
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-tint/10 text-surface-tint text-xs font-medium hover:bg-surface-tint/20 transition-colors disabled:opacity-50"
          >
            <Icon name="cloud_upload" className="text-xs" />
            {uploading ? "Lädt hoch..." : "Hochladen"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && uploadFiles(e.target.files)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Icon name="progress_activity" className="text-2xl text-secondary animate-spin" />
        </div>
      ) : (
        <div className="p-6">
          {!folders.length && !files.length && (
            <div className="text-center py-16 text-secondary text-sm">
              <Icon name="folder_open" className="text-4xl mb-3 block mx-auto" />
              Dieser Ordner ist leer.
            </div>
          )}

          {folders.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  className="group relative rounded-xl border border-outline-variant/10 p-4 hover:bg-surface-tint/10 transition-colors cursor-pointer"
                  onClick={() => navigateToFolder(folder)}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="folder_open" className="text-3xl text-surface-tint" />
                    <span className="text-sm text-on-background font-medium text-center truncate w-full">
                      {folder.name}
                    </span>
                    <span className="text-xs text-secondary">
                      {folder._count.children} Ordner · {folder._count.files} Dateien
                    </span>
                  </div>
                  <div className="absolute top-2 right-2 hidden group-hover:flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setRenameTarget({ type: "folder", id: folder.id, name: folder.name });
                      }}
                      className="p-1 rounded text-secondary hover:text-on-background transition-colors"
                    >
                      <Icon name="edit" className="text-xs" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFolder(folder.id);
                      }}
                      className="p-1 rounded text-secondary hover:text-error transition-colors"
                    >
                      <Icon name="delete" className="text-xs" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {files.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="group relative rounded-xl border border-outline-variant/10 overflow-hidden hover:border-surface-tint/30 transition-colors"
                >
                  <div className="aspect-square bg-surface-container-highest/50 flex items-center justify-center overflow-hidden">
                    {isImage(file.contentType) ? (
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Icon name={fileIcon(file.contentType)} className="text-4xl text-secondary" />
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm text-on-background truncate font-medium">{file.name}</p>
                    <p className="text-xs text-secondary">{formatSize(file.size)}</p>
                  </div>
                  <div className="absolute top-2 right-2 hidden group-hover:flex items-center gap-1">
                    <button
                      onClick={() => setRenameTarget({ type: "file", id: file.id, name: file.name })}
                      className="p-1.5 rounded-lg bg-surface-container-low/90 text-secondary hover:text-on-background transition-colors"
                    >
                      <Icon name="edit" className="text-xs" />
                    </button>
                    <button
                      onClick={() => deleteFile(file.id)}
                      className="p-1.5 rounded-lg bg-surface-container-low/90 text-secondary hover:text-error transition-colors"
                    >
                      <Icon name="delete" className="text-xs" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showNewFolder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 w-full max-w-sm p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-on-background">Neuer Ordner</h3>
              <button
                onClick={() => { setShowNewFolder(false); setNewFolderName(""); }}
                className="text-secondary hover:text-on-background transition-colors"
              >
                <Icon name="close" className="text-lg" />
              </button>
            </div>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Ordnername"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && createFolder()}
              className="w-full px-3 py-2 rounded-lg bg-surface-container-highest/50 text-on-background text-sm border border-outline-variant/10 focus:outline-none focus:border-surface-tint mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => { setShowNewFolder(false); setNewFolderName(""); }}
                className="px-4 py-2 rounded-lg text-sm text-secondary hover:text-on-background transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={createFolder}
                disabled={!newFolderName.trim()}
                className="px-4 py-2 rounded-lg bg-surface-tint text-white text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-colors"
              >
                Erstellen
              </button>
            </div>
          </div>
        </div>
      )}

      {renameTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 w-full max-w-sm p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-on-background">Umbenennen</h3>
              <button
                onClick={() => setRenameTarget(null)}
                className="text-secondary hover:text-on-background transition-colors"
              >
                <Icon name="close" className="text-lg" />
              </button>
            </div>
            <input
              type="text"
              value={renameTarget.name}
              onChange={(e) => setRenameTarget({ ...renameTarget, name: e.target.value })}
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && renameItem()}
              className="w-full px-3 py-2 rounded-lg bg-surface-container-highest/50 text-on-background text-sm border border-outline-variant/10 focus:outline-none focus:border-surface-tint mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRenameTarget(null)}
                className="px-4 py-2 rounded-lg text-sm text-secondary hover:text-on-background transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={renameItem}
                disabled={!renameTarget.name.trim()}
                className="px-4 py-2 rounded-lg bg-surface-tint text-white text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-colors"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
