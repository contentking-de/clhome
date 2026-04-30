import "./admin.css";

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
