interface AuthorBoxProps {
  name: string | null;
  email: string;
  jobTitle: string | null;
  bio: string | null;
  avatar: string | null;
}

export default function AuthorBox({
  name,
  email,
  jobTitle,
  bio,
  avatar,
}: AuthorBoxProps) {
  const displayName = name || email;

  return (
    <div
      style={{
        marginTop: 64,
        paddingTop: 32,
        borderTop: "1px solid var(--line-2)",
      }}
    >
      <div style={{ display: "flex", alignItems: "start", gap: 20 }}>
        <div
          style={{
            width: 128,
            height: 128,
            flexShrink: 0,
            overflow: "hidden",
            background: "var(--bg-3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {avatar ? (
            <img
              src={avatar}
              alt={displayName}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span
              className="display"
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: "var(--ink-3)",
              }}
            >
              {displayName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
              marginBottom: 4,
            }}
          >
            Autor
          </p>
          <h3
            className="display"
            style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)" }}
          >
            {displayName}
          </h3>
          {jobTitle && (
            <p
              className="mono"
              style={{
                fontSize: 12,
                color: "var(--accent)",
                marginTop: 4,
                letterSpacing: "0.1em",
              }}
            >
              {jobTitle}
            </p>
          )}
          {bio && (
            <p
              style={{
                color: "var(--ink-2)",
                fontSize: 14,
                lineHeight: 1.55,
                marginTop: 8,
              }}
            >
              {bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
