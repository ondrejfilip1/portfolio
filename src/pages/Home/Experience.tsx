import ProjectBox from "@/components/ProjectBox/ProjectBox";
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

import rlp from "@/assets/images/projects/rlp.jpeg";
import rlp1 from "@/assets/images/projects/rlp1.jpeg";
import rlp2 from "@/assets/images/projects/rlp2.jpeg";
import rlp3 from "@/assets/images/projects/rlp3.jpeg";

export default function Experience() {
  const projectsData = [
    {
      name: "My first E-Shop project",
      tech: ["react", "mern", "stripe", "shadcn/ui"],
      image: [eshop],
      url: "https://github.com/ondrejfilip1/rocnikova-prace-e-shop",
    },
    {
      name: "Mini E-Shop with an AI-powered story generator",
      tech: ["react", "mern", "stripe", "shadcn/ui", "gen-ai"],
      image: [ai, ai1, ai2, ai3, ai4, ai5],
      url: "https://github.com/ondrejfilip1/skupinovy-projekt-2025",
    },
    {
      name: "Air traffic control training application",
      tech: ["react native", "expo", "typescript"],
      image: [rlp, rlp1, rlp2, rlp3],
      url: "https://github.com/ondrejfilip1/otazky-rlp",
    },
    {
      name: "Password manager",
      tech: ["react", "mern", "shadcn/ui"],
      image: [pm, pm1, pm2],
      url: "https://github.com/ondrejfilip1/password-manager",
    },
  ];

  return (
    <div className="h-dvh w-full px-8">
      {projectsData.map((value, index) => (
        <ProjectBox key={index} {...value} leftSided={index % 2 == 1} />
      ))}
    </div>
  );
}
