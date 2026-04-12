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
    <div className="mt-16 pt-8 border-t border-outline-variant/20">
      <div className="flex items-start gap-5">
        <div className="w-16 h-16 rounded-full bg-surface-tint/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {avatar ? (
            <img
              src={avatar}
              alt={displayName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="material-symbols-outlined text-surface-tint text-3xl">
              person
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-label uppercase tracking-widest text-secondary mb-1">
            Autor
          </p>
          <h3 className="font-headline text-lg font-bold text-on-background">
            {displayName}
          </h3>
          {jobTitle && (
            <p className="text-sm text-surface-tint font-medium mt-0.5">
              {jobTitle}
            </p>
          )}
          {bio && (
            <p className="text-secondary text-sm leading-relaxed mt-2">
              {bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
