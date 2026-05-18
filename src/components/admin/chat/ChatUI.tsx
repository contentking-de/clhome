"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "@/components/ui/Icon";

type User = { id: string; name: string | null; email: string; avatar: string | null };
type Sender = User;
type Participant = { id: string; conversationId: string; userId: string; joinedAt: Date | string; lastReadAt: Date | string; user: User };
type Message = {
  id: string;
  content: string;
  conversationId: string;
  senderId: string;
  createdAt: string | Date;
  sender: Sender;
};
type Conversation = {
  id: string;
  title: string | null;
  isGroup: boolean;
  updatedAt: string | Date;
  participants: Participant[];
  messages: Message[];
};

function displayName(u: User) {
  return u.name || u.email;
}

function conversationLabel(conv: Conversation, currentUserId: string) {
  if (conv.title) return conv.title;
  const others = conv.participants
    .filter((p) => p.userId !== currentUserId)
    .map((p) => displayName(p.user));
  return others.length ? others.join(", ") : "Neuer Chat";
}

export default function ChatUI({
  initialConversations,
  users,
  currentUserId,
}: {
  initialConversations: Conversation[];
  users: User[];
  currentUserId: string;
}) {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [groupTitle, setGroupTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const selected = conversations.find((c) => c.id === selectedId);

  const fetchMessages = useCallback(async (convId: string) => {
    const res = await fetch(`/api/chat/conversations/${convId}`);
    if (!res.ok) return;
    const data = await res.json();
    setMessages(data.messages ?? []);
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    setLoading(true);
    fetchMessages(selectedId).finally(() => setLoading(false));
  }, [selectedId, fetchMessages]);

  useEffect(() => {
    if (!selectedId) return;
    pollRef.current = setInterval(() => fetchMessages(selectedId), 5000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [selectedId, fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !selectedId) return;
    setSending(true);
    const res = await fetch(`/api/chat/conversations/${selectedId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: input.trim() }),
    });
    if (res.ok) {
      const msg = await res.json();
      setMessages((prev) => [...prev, msg]);
      setInput("");
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedId
            ? { ...c, messages: [msg], updatedAt: new Date().toISOString() }
            : c
        ).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      );
    }
    setSending(false);
  }

  async function createConversation() {
    if (!selectedParticipants.length) return;
    const res = await fetch("/api/chat/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: groupTitle || undefined,
        participantIds: selectedParticipants,
        isGroup: selectedParticipants.length > 1 || !!groupTitle,
      }),
    });
    if (res.ok) {
      const conv = await res.json();
      const withMessages = { ...conv, messages: [], updatedAt: conv.createdAt ?? new Date().toISOString() };
      setConversations((prev) => [withMessages, ...prev]);
      setSelectedId(conv.id);
      setShowNewDialog(false);
      setSelectedParticipants([]);
      setGroupTitle("");
    }
  }

  function toggleParticipant(userId: string) {
    setSelectedParticipants((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  }

  const otherUsers = users.filter((u) => u.id !== currentUserId);

  return (
    <div className="flex h-[calc(100vh-10rem)] rounded-xl border border-outline-variant/10 overflow-hidden bg-surface-container-low">
      <div className="w-80 border-r border-outline-variant/10 flex flex-col">
        <div className="p-4 border-b border-outline-variant/10 flex items-center justify-between">
          <span className="text-sm font-medium text-on-background">Konversationen</span>
          <button
            onClick={() => setShowNewDialog(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-tint/10 text-surface-tint text-xs font-medium hover:bg-surface-tint/20 transition-colors"
          >
            <Icon name="add" className="text-xs" />
            Neuer Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => {
            const lastMsg = conv.messages[0];
            return (
              <button
                key={conv.id}
                onClick={() => setSelectedId(conv.id)}
                className={`w-full text-left px-4 py-3 border-b border-outline-variant/10 transition-colors ${
                  selectedId === conv.id
                    ? "bg-surface-tint/10"
                    : "hover:bg-surface-container-highest/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon name={conv.isGroup ? "group" : "chat"} className="text-sm text-secondary" />
                  <span className="text-sm font-medium text-on-background truncate">
                    {conversationLabel(conv, currentUserId)}
                  </span>
                </div>
                {lastMsg && (
                  <p className="text-xs text-secondary truncate pl-6">
                    {displayName(lastMsg.sender)}: {lastMsg.content}
                  </p>
                )}
              </button>
            );
          })}
          {!conversations.length && (
            <div className="p-6 text-center text-secondary text-sm">
              Noch keine Konversationen.
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selected ? (
          <>
            <div className="px-6 py-4 border-b border-outline-variant/10 flex items-center gap-3">
              <Icon name={selected.isGroup ? "group" : "chat"} className="text-lg text-surface-tint" />
              <div>
                <h2 className="text-sm font-medium text-on-background">
                  {conversationLabel(selected, currentUserId)}
                </h2>
                <p className="text-xs text-secondary">
                  {selected.participants.map((p) => displayName(p.user)).join(", ")}
                </p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <Icon name="progress_activity" className="text-2xl text-secondary animate-spin" />
                </div>
              ) : (
                messages.map((msg) => {
                  const isOwn = msg.senderId === currentUserId;
                  return (
                    <div key={msg.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-md rounded-xl px-4 py-2.5 ${
                          isOwn
                            ? "bg-surface-tint/10 text-on-background"
                            : "bg-surface-container-highest/50 text-on-background"
                        }`}
                      >
                        {!isOwn && (
                          <p className="text-xs font-medium text-surface-tint mb-1">
                            {displayName(msg.sender)}
                          </p>
                        )}
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        <p className="text-[10px] text-secondary mt-1 text-right">
                          {new Date(msg.createdAt).toLocaleTimeString("de-DE", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="p-4 border-t border-outline-variant/10 flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nachricht schreiben..."
                className="flex-1 px-4 py-2.5 rounded-lg bg-surface-container-highest/50 text-on-background text-sm placeholder:text-secondary border border-outline-variant/10 focus:outline-none focus:border-surface-tint"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                className="px-4 py-2.5 rounded-lg bg-surface-tint text-white text-sm font-medium disabled:opacity-50 transition-colors hover:opacity-90"
              >
                Senden
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Icon name="chat" className="text-4xl text-secondary mb-3" />
              <p className="text-secondary text-sm">
                Wähle eine Konversation oder starte einen neuen Chat.
              </p>
            </div>
          </div>
        )}
      </div>

      {showNewDialog && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 w-full max-w-md p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-on-background">Neuer Chat</h3>
              <button
                onClick={() => {
                  setShowNewDialog(false);
                  setSelectedParticipants([]);
                  setGroupTitle("");
                }}
                className="text-secondary hover:text-on-background transition-colors"
              >
                <Icon name="close" className="text-lg" />
              </button>
            </div>
            <div className="mb-4">
              <label className="text-sm text-secondary mb-1 block">Gruppenname (optional)</label>
              <input
                type="text"
                value={groupTitle}
                onChange={(e) => setGroupTitle(e.target.value)}
                placeholder="z.B. Projekt Alpha"
                className="w-full px-3 py-2 rounded-lg bg-surface-container-highest/50 text-on-background text-sm border border-outline-variant/10 focus:outline-none focus:border-surface-tint"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm text-secondary mb-2 block">Teilnehmer</label>
              <div className="max-h-48 overflow-y-auto space-y-1">
                {otherUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => toggleParticipant(u.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                      selectedParticipants.includes(u.id)
                        ? "bg-surface-tint/10 text-surface-tint"
                        : "hover:bg-surface-container-highest/50 text-on-background"
                    }`}
                  >
                    <Icon
                      name={selectedParticipants.includes(u.id) ? "check_circle" : "person"}
                      className="text-sm"
                    />
                    {displayName(u)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowNewDialog(false);
                  setSelectedParticipants([]);
                  setGroupTitle("");
                }}
                className="px-4 py-2 rounded-lg text-sm text-secondary hover:text-on-background transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={createConversation}
                disabled={!selectedParticipants.length}
                className="px-4 py-2 rounded-lg bg-surface-tint text-white text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-colors"
              >
                Erstellen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
