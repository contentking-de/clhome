import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="font-headline text-2xl font-bold mb-1">
          Neuer Beitrag
        </h1>
        <p className="text-secondary text-sm">
          Erstellen Sie einen neuen Blogbeitrag.
        </p>
      </div>
      <PostForm />
    </div>
  );
}
