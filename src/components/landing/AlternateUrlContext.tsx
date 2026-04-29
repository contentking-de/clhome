"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface AlternateUrl {
  locale: string;
  path: string;
}

interface AlternateUrlContextValue {
  alternate: AlternateUrl | null;
  setAlternate: (alt: AlternateUrl | null) => void;
}

const AlternateUrlContext = createContext<AlternateUrlContextValue>({
  alternate: null,
  setAlternate: () => {},
});

export function AlternateUrlProvider({ children }: { children: ReactNode }) {
  const [alternate, setAlternateState] = useState<AlternateUrl | null>(null);
  const setAlternate = useCallback((alt: AlternateUrl | null) => setAlternateState(alt), []);
  return (
    <AlternateUrlContext.Provider value={{ alternate, setAlternate }}>
      {children}
    </AlternateUrlContext.Provider>
  );
}

export function useAlternateUrl() {
  return useContext(AlternateUrlContext);
}
