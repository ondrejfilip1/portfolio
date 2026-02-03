import Header from "@/components/Header/Header";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container m-auto px-4 h-full relative flex items-center justify-center flex-col gap-14 pb-10">
          <Link
            className="text-zinc-500 hover:text-zinc-600 transition-colors p-2 group relative"
            to={"https://github.com/ondrejfilip1/"}
            target="_blank"
          >
            <h1 className="text-5xl tracking-tight text-zinc-800 group-hover:blur-[4px] group-hover:text-zinc-500 transition-all duration-250">
              GitHub
            </h1>
            <ArrowUpRight
              radius={0}
              strokeLinejoin="miter"
              strokeLinecap="butt"
              className="w-12 h-12 text-zinc-800 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-all duration-400 opacity-0 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </Link>
          <Link
            className="text-zinc-500 hover:text-zinc-600 transition-colors p-2 group relative"
            to={"https://www.linkedin.com/in/ond%C5%99ej-filip-26518534b/"}
            target="_blank"
          >
            <h1 className="text-5xl tracking-tight text-zinc-800 group-hover:blur-[4px] group-hover:text-zinc-500 transition-all duration-250">
              LinkedIn
            </h1>
            <ArrowUpRight
              radius={0}
              strokeLinejoin="miter"
              strokeLinecap="butt"
              className="w-12 h-12 text-zinc-800 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-all duration-400 opacity-0 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
