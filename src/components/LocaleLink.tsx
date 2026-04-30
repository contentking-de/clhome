"use client";

import type { ComponentProps } from "react";

interface Props extends Omit<ComponentProps<"a">, "href"> {
  href: string;
  locale: string;
}

export default function LocaleLink({ href, locale, children, ...props }: Props) {
  function handleClick() {
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000;SameSite=Lax`;
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
