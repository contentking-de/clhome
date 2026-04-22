import SubpageHeader from "./SubpageHeader";
import Footer from "./Footer";

export default function SubpageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SubpageHeader />
      <main id="main-content" tabIndex={-1} style={{ paddingTop: 0, outline: "none" }}>{children}</main>
      <Footer />
    </>
  );
}
