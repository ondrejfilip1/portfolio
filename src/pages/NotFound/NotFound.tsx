import { usePageMeta } from "@/lib/others";
import { notFoundPage } from "@/lib/seo";

export default function NotFound() {
  usePageMeta(notFoundPage, true);

  return (
    <div className="flex justify-center flex-col items-center min-h-screen text-zinc-800">
      <h1 className="font-dirtyline text-[clamp(3.25rem,1.5rem+8.75vw,12rem)] leading-[1.15]">
        404
      </h1>
      <div className="text-xl">page not found</div>
    </div>
  );
}
