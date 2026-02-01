import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="flex justify-center items-end min-h-screen">
        <div className="flex justify-center items-end select-none w-full bg-gradient-to-b from-zinc-800 to-zinc-400 bg-clip-text text-transparent tracking-tight text-[20.3vw] relative right-[0.5vw]">
          On<span className="font-dirtyline leading-[1.08]">D</span>ře
          <span className="font-dirtyline leading-[1.08]">J</span> Fili
          <span className="font-dirtyline leading-[1.08]">P</span>
        </div>
      </div>
      <Link
        className="flex gap-2 items-center justify-center text-xl text-zinc-600"
        to={"https://github.com/ondrejfilip1/"}
        target="_blank"
      >
        <FaGithub />
        ondrejfilip1
      </Link>
    </>
  );
}
