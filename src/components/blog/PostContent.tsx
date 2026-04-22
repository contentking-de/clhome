import BlogCTA from "./BlogCTA";

interface PostContentProps {
  content: string;
}

function splitContentAtMiddle(html: string): [string, string] {
  const splitCandidates: number[] = [];
  let tableDepth = 0;
  let listDepth = 0;
  const tagPattern = /<\/?(?:p|h[1-6]|ul|ol|table|blockquote|div)\b[^>]*>/gi;

  let match;
  while ((match = tagPattern.exec(html)) !== null) {
    const tag = match[0];
    const isClosing = tag[1] === "/";
    const tagName = (
      isClosing ? tag.match(/<\/(\w+)/)?.[1] : tag.match(/<(\w+)/)?.[1]
    )?.toLowerCase();

    if (tagName === "table") {
      if (isClosing) {
        tableDepth = Math.max(0, tableDepth - 1);
        if (tableDepth === 0 && listDepth === 0) {
          splitCandidates.push(match.index + tag.length);
        }
      } else {
        tableDepth++;
      }
      continue;
    }

    if (tagName === "ul" || tagName === "ol") {
      if (isClosing) {
        listDepth = Math.max(0, listDepth - 1);
        if (listDepth === 0 && tableDepth === 0) {
          splitCandidates.push(match.index + tag.length);
        }
      } else {
        listDepth++;
      }
      continue;
    }

    if (tableDepth > 0 || listDepth > 0) continue;

    if (isClosing) {
      splitCandidates.push(match.index + tag.length);
    }
  }

  if (splitCandidates.length < 6) {
    return [html, ""];
  }

  const midIndex = Math.floor(splitCandidates.length / 2);
  const splitPoint = splitCandidates[midIndex];

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
      <BlogCTA variant="end" />
      <div
        className="prose-blog max-w-none"
        dangerouslySetInnerHTML={{ __html: secondHalf }}
      />
      <BlogCTA variant="end" />
    </>
  );
}
