import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex py-6 px-8 items-center justify-between mix-blend-difference text-[#85bfcd] font-light z-10 sticky w-full left-0 top-0">
      <div className="flex gap-6 tracking-tight">
        <Link to={"/"}>HOME</Link>
        <Link to={"/projects"}>PROJECTS</Link>
        <Link to={"/contacts"}>CONTACTS</Link>
      </div>
      <div></div>
    </div>
  );
}
