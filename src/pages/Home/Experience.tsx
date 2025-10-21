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

export default function Experience() {
  return (
    <div className="h-dvh w-full px-4">
      <div className="flex sm:grid-cols-2 grid grid-cols-1 gap-4">
        <ProjectBox
          name="My first E-Shop project"
          tech={["react", "mern", "stripe", "shadcn/ui"]}
          image={[eshop]}
          url="https://github.com/ondrejfilip1/rocnikova-prace-e-shop"
        />
        <ProjectBox
          name="Mini E-Shop with an AI-powered story generator"
          tech={["react", "mern", "stripe", "shadcn/ui", "gen-ai"]}
          image={[ai, ai1, ai2, ai3, ai4, ai5]}
          url="https://github.com/ondrejfilip1/skupinovy-projekt-2025"
        />
        <ProjectBox
          name="Air traffic control training application"
          tech={["react native", "expo", "typescript"]}
          image={[pm, pm1, pm2]}
          url="https://github.com/ondrejfilip1/otazky-rlp"
        />
        <ProjectBox
          name="Password manager"
          tech={["react", "mern", "shadcn/ui"]}
          image={[pm, pm1, pm2]}
          url="https://github.com/ondrejfilip1/password-manager"
        />
      </div>
    </div>
  );
}
