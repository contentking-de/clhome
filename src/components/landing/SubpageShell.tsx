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
      <main style={{ paddingTop: 0 }}>{children}</main>
      <Footer />
    </>
  );
}
