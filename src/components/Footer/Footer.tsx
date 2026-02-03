import { FaGithub, FaLinkedin } from "react-icons/fa";
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

      <div className="flex items-center justify-center mb-6">
        <Link
          className="text-zinc-500 hover:text-zinc-600 transition-colors p-2"
          to={"https://github.com/ondrejfilip1/"}
          target="_blank"
        >
          <FaGithub size={30} />
        </Link>
        <Link
          className="text-zinc-500 hover:text-zinc-600 transition-colors p-2"
          to={"https://www.linkedin.com/in/ond%C5%99ej-filip-26518534b/"}
          target="_blank"
        >
          <FaLinkedin size={30} />
        </Link>
      </div>
    </>
  );
}
