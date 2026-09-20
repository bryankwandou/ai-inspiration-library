import { createFileRoute } from "@tanstack/react-router";
import { LibraryHome } from "@/components/library-home";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <LibraryHome />;
}
