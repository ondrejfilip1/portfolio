import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer>
      <div className="flex justify-center items-end min-h-screen">
        <div
          aria-hidden="true"
          className="flex justify-center items-end select-none w-full bg-gradient-to-b from-zinc-800 to-zinc-400 bg-clip-text text-transparent tracking-tight text-[20.3vw] relative right-[0.5vw]"
        >
          On<span className="font-dirtyline leading-[1.08]">D</span>ře
          <span className="font-dirtyline leading-[1.08]">J</span> Fili
          <span className="font-dirtyline leading-[1.08]">P</span>
        </div>
      </div>

      <div className="flex items-center justify-center mb-6">
        <a
          className="text-zinc-500 hover:text-zinc-600 transition-colors p-2"
          href="https://github.com/ondrejfilip1/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub size={30} />
        </a>
        <a
          className="text-zinc-500 hover:text-zinc-600 transition-colors p-2"
          href="mailto:ondrejfilipstranky@gmail.com"
          aria-label="Email"
        >
          <Mail size={30} />
        </a>
        <a
          className="text-zinc-500 hover:text-zinc-600 transition-colors p-2"
          href="https://www.linkedin.com/in/ond%C5%99ej-filip-26518534b/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={30} />
        </a>
      </div>
    </footer>
  );
}
