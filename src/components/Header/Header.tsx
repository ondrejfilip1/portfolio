import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { scrollById } from "@/lib/others";

interface HeaderProps {
  shouldAnimate?: boolean;
}

export default function Header(props: HeaderProps) {
  return (
    <header
      className={`flex h-18 px-4 sm:px-12 text-sm sm:text-base mix-blend-difference text-[#d8d8d5] items-center md:justify-between justify-center font-light z-10 sticky w-full left-0 top-0 ${
        props.shouldAnimate ? "header-anim" : ""
      }`}
    >
      <nav aria-label="Main" className="flex gap-4 sm:gap-6 tracking-tight links">
        <Link className="link" to="/" onClick={() => scrollById("root")}>
          <span aria-hidden="true">HOME</span>HOME
        </Link>
        <Link
          className="link"
          to={"/#projects"}
          onClick={() => scrollById("projects")}
        >
          <span aria-hidden="true">PROJECTS</span>PROJECTS
        </Link>
        <Link className="link" to="/experience/">
          <span aria-hidden="true">EXPERIENCE</span>EXPERIENCE
        </Link>
        <Link className="link" to="/contact/">
          <span aria-hidden="true">CONTACT</span>CONTACT
        </Link>
      </nav>
      <div className="hover-github-link relative md:block hidden">
        <a
          className="flex gap-2 items-center justify-center"
          href="https://github.com/ondrejfilip1/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub aria-hidden="true" />
          ondrejfilip1
        </a>
        <div>WEB DEVELOPER / PROGRAMMER</div>
      </div>
    </header>
  );
}
