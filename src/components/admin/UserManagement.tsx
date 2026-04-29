"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Icon from "../ui/Icon";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: "ADMIN" | "EDITOR";
  bio: string | null;
  bioEn: string | null;
  jobTitle: string | null;
  jobTitleEn: string | null;
  avatar: string | null;
  emailVerified: string | null;
  createdAt: string;
  _count: { posts: number };
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

export default function UserManagement({
  currentUserId,
}: {
  currentUserId: string;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState<"EDITOR" | "ADMIN">("EDITOR");
  const [inviting, setInviting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Fehler beim Laden");
      const data = await res.json();
      setUsers(data);
    } catch {
      setError("Nutzer konnten nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (!successMessage) return;
    const t = setTimeout(() => setSuccessMessage(""), 4000);
    return () => clearTimeout(t);
  }, [successMessage]);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setInviting(true);
    setError("");
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: inviteEmail,
          name: inviteName,
          role: inviteRole,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Einladung fehlgeschlagen");
      }
      setSuccessMessage(`Einladung an ${inviteEmail} gesendet.`);
      setInviteEmail("");
      setInviteName("");
      setInviteRole("EDITOR");
      setShowInvite(false);
      fetchUsers();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ein Fehler ist aufgetreten."
      );
    } finally {
      setInviting(false);
    }
  }

  async function handleRoleChange(
    userId: string,
    newRole: "ADMIN" | "EDITOR"
  ) {
    setError("");
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Änderung fehlgeschlagen");
      }
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ein Fehler ist aufgetreten."
      );
    }
  }

  async function handleDelete(userId: string, email: string) {
    if (!confirm(`Nutzer ${email} wirklich löschen?`)) return;
    setError("");
    try {
      const res = await fetch(`/api/users/${userId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Löschen fehlgeschlagen");
      }
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      setSuccessMessage(`${email} wurde entfernt.`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ein Fehler ist aufgetreten."
      );
    }
  }

  async function handleProfileSave(userId: string, profile: Partial<User>) {
    setError("");
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Speichern fehlgeschlagen");
      }
      const updated = await res.json();
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, ...updated } : u))
      );
      setEditingId(null);
      setSuccessMessage("Autorenprofil gespeichert.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ein Fehler ist aufgetreten."
      );
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Icon name="progress_activity" className="text-4xl text-secondary animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-headline text-2xl font-bold mb-1">Nutzer</h1>
          <p className="text-secondary text-sm">
            {users.length} {users.length === 1 ? "Nutzer" : "Nutzer"} ·
            Verwalten und einladen
          </p>
        </div>
        {!showInvite && (
          <button
            type="button"
            onClick={() => setShowInvite(true)}
            className="bg-surface-tint text-white px-5 py-2.5 rounded-lg font-semibold hover:brightness-110 transition-all inline-flex items-center gap-2"
          >
            <Icon name="person_add" className="text-xl" />
            Nutzer einladen
          </button>
        )}
      </div>

      {successMessage && (
        <div className="mb-6 bg-surface-tint/10 text-surface-tint px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2">
          <Icon name="check_circle" className="text-lg" />
          {successMessage}
        </div>
      )}

      {error && (
        <div className="mb-6 bg-error-container text-on-error-container px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {showInvite && (
        <div className="mb-8 bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
          <h2 className="font-headline font-bold text-lg mb-4">
            Nutzer einladen
          </h2>
          <form onSubmit={handleInvite} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1.5">
                  E-Mail-Adresse *
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                  placeholder="name@beispiel.de"
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/50 text-on-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="Vor- und Nachname"
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/50 text-on-background"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">
                Rolle
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setInviteRole("EDITOR")}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                    inviteRole === "EDITOR"
                      ? "bg-surface-tint text-white border-surface-tint"
                      : "border-outline-variant/30 text-secondary hover:bg-surface-container-highest"
                  }`}
                >
                  Redakteur
                </button>
                <button
                  type="button"
                  onClick={() => setInviteRole("ADMIN")}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                    inviteRole === "ADMIN"
                      ? "bg-surface-tint text-white border-surface-tint"
                      : "border-outline-variant/30 text-secondary hover:bg-surface-container-highest"
                  }`}
                >
                  Administrator
                </button>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={inviting}
                className="bg-surface-tint text-white px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition-all disabled:opacity-50"
              >
                {inviting ? "Wird gesendet..." : "Einladung senden"}
              </button>
              <button
                type="button"
                onClick={() => setShowInvite(false)}
                className="px-6 py-3 rounded-lg border border-outline-variant/30 font-semibold hover:bg-surface-container-low transition-all"
              >
                Abbrechen
              </button>
            </div>
          </form>
        </div>
      )}

      {users.length === 0 ? (
        <div className="text-center py-16 bg-surface-container-low rounded-xl border border-outline-variant/10">
          <Icon name="group" className="text-5xl text-outline mb-4 block" />
          <p className="text-secondary mb-4">Noch keine Nutzer vorhanden.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => {
            const isCurrentUser = user.id === currentUserId;
            const isEditing = editingId === user.id;
            return (
              <div
                key={user.id}
                className="bg-surface-container-low rounded-xl border border-outline-variant/10 hover:border-outline-variant/30 transition-colors"
              >
                <div className="flex items-center justify-between p-5">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-surface-tint/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name || ""}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Icon name="person" className="text-surface-tint text-xl" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-headline font-bold text-on-background truncate">
                          {user.name || user.email}
                        </span>
                        {isCurrentUser && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-surface-tint/10 text-surface-tint">
                            Sie
                          </span>
                        )}
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            user.role === "ADMIN"
                              ? "bg-error-container text-on-error-container"
                              : "bg-outline-variant/20 text-secondary"
                          }`}
                        >
                          {user.role === "ADMIN" ? "Admin" : "Redakteur"}
                        </span>
                      </div>
                      <p className="text-secondary text-sm truncate">
                        {user.name ? user.email : ""}
                        {user.jobTitle ? ` · ${user.jobTitle}` : ""}
                        {user.emailVerified ? "" : " · Ausstehend"} ·{" "}
                        {user._count.posts}{" "}
                        {user._count.posts === 1 ? "Beitrag" : "Beiträge"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() =>
                        setEditingId(isEditing ? null : user.id)
                      }
                      className={`p-2 rounded-lg transition-colors ${
                        isEditing
                          ? "text-surface-tint bg-surface-tint/10"
                          : "text-secondary hover:text-on-background hover:bg-surface-container-highest"
                      }`}
                      title="Autorenprofil bearbeiten"
                    >
                      <Icon name="edit" className="text-xl" />
                    </button>
                    {!isCurrentUser && (
                      <>
                        <select
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(
                              user.id,
                              e.target.value as "ADMIN" | "EDITOR"
                            )
                          }
                          className="px-3 py-2 rounded-lg border border-outline-variant/30 bg-surface text-sm text-on-background focus:outline-none focus:ring-2 focus:ring-surface-tint/50"
                        >
                          <option value="EDITOR">Redakteur</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                        <button
                          onClick={() => handleDelete(user.id, user.email)}
                          className="p-2 rounded-lg text-secondary hover:text-error hover:bg-error-container/30 transition-colors"
                          title="Nutzer löschen"
                        >
                          <Icon name="delete" className="text-xl" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <ProfileEditor
                    user={user}
                    onSave={(profile) => handleProfileSave(user.id, profile)}
                    onCancel={() => setEditingId(null)}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ProfileEditor({
  user,
  onSave,
  onCancel,
}: {
  user: User;
  onSave: (profile: Partial<User>) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(user.name || "");
  const [jobTitle, setJobTitle] = useState(user.jobTitle || "");
  const [jobTitleEn, setJobTitleEn] = useState(user.jobTitleEn || "");
  const [bio, setBio] = useState(user.bio || "");
  const [bioEn, setBioEn] = useState(user.bioEn || "");
  const [avatar, setAvatar] = useState(user.avatar || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      setAvatar(url);
    } catch {
      // handled silently
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave({ name, jobTitle, jobTitleEn, bio, bioEn, avatar });
    setSaving(false);
  }

  return (
    <div className="border-t border-outline-variant/10 p-5">
      <h3 className="font-headline font-bold text-sm mb-4 flex items-center gap-2">
        <Icon name="badge" className="text-lg text-surface-tint" />
        Autorenprofil
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start gap-6">
          <div className="flex flex-col items-center gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleAvatarUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="w-20 h-20 rounded-full bg-surface-container-highest border-2 border-dashed border-outline-variant/40 hover:border-surface-tint/50 transition-colors flex items-center justify-center overflow-hidden group relative"
            >
              {avatar ? (
                <>
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon name="photo_camera" className="text-white text-xl" />
                  </div>
                </>
              ) : uploading ? (
                <Icon name="progress_activity" className="text-secondary animate-spin" />
              ) : (
                <Icon name="add_a_photo" className="text-secondary text-2xl group-hover:text-surface-tint transition-colors" />
              )}
            </button>
            {avatar && (
              <button
                type="button"
                onClick={() => setAvatar("")}
                className="text-xs text-secondary hover:text-error transition-colors"
              >
                Entfernen
              </button>
            )}
          </div>

          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Vor- und Nachname"
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/50 text-on-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1.5">
                  Position / Titel
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="z.B. Rechtsanwältin, Redakteur"
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/50 text-on-background"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">
                Kurzbiografie
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Ein paar Sätze über den Autor..."
                className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/50 text-on-background resize-none"
              />
            </div>

            <div className="pt-4 border-t border-outline-variant/10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-semibold text-on-surface">🇬🇧 English Profile</span>
                <span className="text-xs text-secondary">(für englische Artikel)</span>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1.5">
                    Job Title (EN)
                  </label>
                  <input
                    type="text"
                    value={jobTitleEn}
                    onChange={(e) => setJobTitleEn(e.target.value)}
                    placeholder="e.g. Attorney at Law, Editor"
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/50 text-on-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1.5">
                    Short Bio (EN)
                  </label>
                  <textarea
                    value={bioEn}
                    onChange={(e) => setBioEn(e.target.value)}
                    rows={3}
                    placeholder="A few sentences about the author..."
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/50 text-on-background resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-surface-tint text-white px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition-all disabled:opacity-50"
          >
            {saving ? "Wird gespeichert..." : "Profil speichern"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-lg border border-outline-variant/30 font-semibold hover:bg-surface-container-low transition-all"
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
}
