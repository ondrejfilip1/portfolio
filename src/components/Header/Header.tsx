import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { scrollById } from "@/lib/others";

interface HeaderProps {
  shouldAnimate?: boolean;
}

export default function Header(props: HeaderProps) {
  return (
    <div
      className={`flex py-6 px-12 mix-blend-difference text-[#d8d8d5] items-center md:justify-between justify-center font-light z-10 sticky w-full left-0 top-0 ${
        props.shouldAnimate ? "header-anim" : ""
      }`}
    >
      <div className="flex gap-6 tracking-tight links">
        <Link className="link" to="/" onClick={() => scrollById("root")}>
          <span>HOME</span>HOME
        </Link>
        <Link
          className="link"
          to={"/#projects"}
          onClick={() => scrollById("projects")}
        >
          <span>PROJECTS</span>PROJECTS
        </Link>
        <Link className="link" to="/experience">
          <span>EXPERIENCE</span>EXPERIENCE
        </Link>
        <Link className="link" to="/contact">
          <span>CONTACT</span>CONTACT
        </Link>
      </div>
      <div className="hover-github-link relative md:block hidden">
        <Link
          className="flex gap-2 items-center justify-center"
          to={"https://github.com/ondrejfilip1/"}
          target="_blank"
        >
          <FaGithub />
          ondrejfilip1
        </Link>
        <div>WEB DEVELOPER / PROGRAMMER</div>
      </div>
    </div>
  );
}
