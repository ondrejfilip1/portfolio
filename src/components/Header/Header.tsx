import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header-anim flex py-6 px-12 mix-blend-difference text-[#d8d8d5] items-center justify-between font-light z-10 sticky w-full left-0 top-0">
      <div className="flex gap-6 tracking-tight">
        <Link className="link" to={"/"}>
          <span>HOME</span>HOME
        </Link>
        <Link className="link" to={"/experience"}>
          <span>EXPERIENCE</span>EXPERIENCE
        </Link>
        <Link className="link" to={"/projects"}>
          <span>PROJECTS</span>PROJECTS
        </Link>
        <Link className="link" to={"/contact"}>
          <span>CONTACT</span>CONTACT
        </Link>
      </div>
      <div>WEB DEVELOPER / PROGRAMMER</div>
    </div>
  );
}
