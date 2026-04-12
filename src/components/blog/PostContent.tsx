interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <div
      className="prose-blog max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
