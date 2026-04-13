import BlogCTA from "./BlogCTA";

interface PostContentProps {
  content: string;
}

function splitContentAtMiddle(html: string): [string, string] {
  const blockTagPattern =
    /<\/(?:p|h[1-6]|ul|ol|table|blockquote|div)>/gi;
  const closingTags: number[] = [];

  let match;
  while ((match = blockTagPattern.exec(html)) !== null) {
    closingTags.push(match.index + match[0].length);
  }

  if (closingTags.length < 4) {
    return [html, ""];
  }

  const midIndex = Math.floor(closingTags.length / 2);
  const splitPoint = closingTags[midIndex];

  return [html.slice(0, splitPoint), html.slice(splitPoint)];
}

export default function PostContent({ content }: PostContentProps) {
  const [firstHalf, secondHalf] = splitContentAtMiddle(content);

  if (!secondHalf) {
    return (
      <>
        <div
          className="prose-blog max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <BlogCTA variant="end" />
      </>
    );
  }

  return (
    <>
      <div
        className="prose-blog max-w-none"
        dangerouslySetInnerHTML={{ __html: firstHalf }}
      />
      <BlogCTA variant="inline" />
      <div
        className="prose-blog max-w-none"
        dangerouslySetInnerHTML={{ __html: secondHalf }}
      />
      <BlogCTA variant="end" />
    </>
  );
}
