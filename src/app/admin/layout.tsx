import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#faf8ff",
        color: "#131b2e",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}
