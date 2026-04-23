import Header from "./Header";
import Footer from "./Footer";

export default function SubpageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} style={{ paddingTop: 0, outline: "none" }}>{children}</main>
      <Footer />
    </>
  );
}
