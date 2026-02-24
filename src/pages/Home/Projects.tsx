import ProjectBox, {
  type ProjectBoxItem,
} from "@/components/ProjectBox/ProjectBox";

import pm from "@/assets/images/projects/pm.jpeg";
import pm1 from "@/assets/images/projects/pm1.jpeg";
import pm2 from "@/assets/images/projects/pm2.jpeg";

import ai from "@/assets/images/projects/ai.jpeg";
import ai1 from "@/assets/images/projects/ai1.png";
import ai2 from "@/assets/images/projects/ai2.jpeg";
import ai3 from "@/assets/images/projects/ai3.png";
import ai4 from "@/assets/images/projects/ai4.png";
import ai5 from "@/assets/images/projects/ai5.jpeg";

import eshop from "@/assets/images/projects/eshop.jpeg";
import eshop1 from "@/assets/images/projects/eshop1.png";
import eshop2 from "@/assets/images/projects/eshop2.png";
import eshop3 from "@/assets/images/projects/eshop3.png";
import eshop4 from "@/assets/images/projects/eshop4.png";
import eshop5 from "@/assets/images/projects/eshop5.png";
import eshop6 from "@/assets/images/projects/eshop6.png";

import rlp from "@/assets/images/projects/rlp.jpeg";
import rlp1 from "@/assets/images/projects/rlp1.jpeg";
import rlp2 from "@/assets/images/projects/rlp2.jpeg";
import rlp3 from "@/assets/images/projects/rlp3.jpeg";

import timlee from "@/assets/images/projects/timlee.png";
import timlee1 from "@/assets/images/projects/timlee1.png";
import timlee2 from "@/assets/images/projects/timlee2.png";
import timlee3 from "@/assets/images/projects/timlee3.png";

import orbita from "@/assets/images/projects/orbita.png";
import orbita1 from "@/assets/images/projects/orbita1.png";
import orbita2 from "@/assets/images/projects/orbita2.png";

export default function Projects() {
  const projectsData: ProjectBoxItem[] = [
    {
      name: "My first E-Shop project",
      tech: ["react", "mern", "stripe", "shadcn/ui"],
      image: [eshop, eshop1, eshop2, eshop3, eshop4, eshop5, eshop6],
      url: "https://github.com/ondrejfilip1/rocnikova-prace-e-shop",
      githubLink: true,
    },
    {
      name: "Mini E-Shop with an AI-powered story generator",
      tech: ["react", "mern", "stripe", "shadcn/ui", "generative ai"],
      image: [ai, ai1, ai2, ai3, ai4, ai5],
      url: "https://github.com/ondrejfilip1/skupinovy-projekt-2025",
      githubLink: true,
    },
    {
      name: "Paintings by Tim Lee",
      tech: ["html", "css", "bootstrap", "js"],
      image: [timlee, timlee1, timlee2, timlee3],
      url: "https://www.paintingsbytimlee.co.uk/",
    },
    {
      name: "Air traffic control training application",
      tech: ["react native", "expo", "typescript"],
      image: [rlp, rlp1, rlp2, rlp3],
      url: "https://github.com/ondrejfilip1/otazky-rlp",
      githubLink: true,
    },
    {
      name: "Password manager",
      tech: ["react", "mern", "shadcn/ui"],
      image: [pm, pm1, pm2],
      url: "https://github.com/ondrejfilip1/password-manager",
      githubLink: true,
    },
    {
      name: "ORBITA",
      tech: ["html", "css", "bootstrap", "js", "threejs"],
      image: [orbita, orbita1, orbita2],
      url: "https://github.com/ondrejfilip1/orbita-website",
      githubLink: true,
    },
  ];

  return (
    <div className="min-h-screen w-full px-8" id="projects">
      {projectsData.map((value, index) => (
        <ProjectBox key={index} {...value} leftSided={index % 2 == 1} />
      ))}
    </div>
  );
}
