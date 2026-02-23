import Header from "@/components/Header/Header";
// backend
import expressjs from "@/assets/images/experience/backend/expressjs.svg";
import jwt from "@/assets/images/experience/backend/jwt.svg";
import mongodb from "@/assets/images/experience/backend/mongodb.svg";
import nodejs from "@/assets/images/experience/backend/nodejs.svg";
import sql from "@/assets/images/experience/backend/sql.svg";
import stripe from "@/assets/images/experience/backend/stripe.svg";

// frontend
import bootstrap from "@/assets/images/experience/frontend/bootstrap.svg";
import css from "@/assets/images/experience/frontend/css.svg";
import expo from "@/assets/images/experience/frontend/expo.svg";
import html from "@/assets/images/experience/frontend/html.svg";
import react from "@/assets/images/experience/frontend/react.svg";
import reactnative from "@/assets/images/experience/frontend/reactnative.svg";
import shadcnui from "@/assets/images/experience/frontend/shadcnui.svg";
import tailwindcss from "@/assets/images/experience/frontend/tailwindcss.svg";
import vite from "@/assets/images/experience/frontend/vite.svg";
import electron from "@/assets/images/experience/frontend/electron.svg";

// programming_languages
import java from "@/assets/images/experience/programming_languages/java.svg";
import javascript from "@/assets/images/experience/programming_languages/javascript.svg";
import typescript from "@/assets/images/experience/programming_languages/typescript.svg";

import ExperienceBox, { type ExperienceBoxProps } from "@/components/ExperienceBox/ExperienceBox";

import NumberFlow, { continuous } from "@number-flow/react"

import { useState, useEffect } from "react";

export default function Experience() {
  const frontendIcons: ExperienceBoxProps[] = [
    { image: html, tooltip: "HTML" },
    { image: css, tooltip: "CSS" },
    { image: tailwindcss, tooltip: "TailwindCSS" },
    { image: bootstrap, tooltip: "Bootstrap" },
    { image: react, tooltip: "React" },
    { image: reactnative, tooltip: "React Native" },
    { image: vite, tooltip: "Vite" },
    { image: shadcnui, tooltip: "shadcn/ui" },
    { image: expo, tooltip: "Expo" },
    { image: electron, tooltip: "Electron" },
  ];

  const backendIcons: ExperienceBoxProps[] = [
    { image: nodejs, tooltip: "Node.js" },
    { image: expressjs, tooltip: "Express.js" },
    { image: mongodb, tooltip: "MongoDB" },
    { image: sql, tooltip: "SQL" },
    { image: jwt, tooltip: "JWT" },
    { image: stripe, tooltip: "Stripe" },
  ];

  const programmingLanguagesIcons: ExperienceBoxProps[] = [
    { image: javascript, tooltip: "JavaScript" },
    { image: typescript, tooltip: "TypeScript" },
    { image: java, tooltip: "Java" },
  ];

  const [years, setYears] = useState(0);
  const [projects, setProjects] = useState(0);

  useEffect(() => {
    setYears(3);
    setProjects(9);
    // fix for weird number counting
    setTimeout(() => {
      setProjects(10);
    }, 500);
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container m-auto px-4 h-full relative flex flex-col gap-14 lg:gap-4 lg:flex-row my-14 lg:my-auto">
          <div className="w-full">
            <h1 className="text-5xl tracking-tight mb-14 text-zinc-800">
              Frontend
            </h1>
            <div className="flex flex-wrap gap-2">
              {frontendIcons.map((item, index) => (
                <ExperienceBox {...item} key={index} />
              ))}
            </div>

            <h1 className="text-5xl tracking-tight my-14 text-zinc-800">
              Backend
            </h1>
            <div className="flex flex-wrap gap-2">
              {backendIcons.map((item, index) => (
                <ExperienceBox {...item} key={index} />
              ))}
            </div>

            <h1 className="text-5xl tracking-tight my-14 text-zinc-800">
              Languages
            </h1>
            <div className="flex flex-wrap gap-2">
              {programmingLanguagesIcons.map((item, index) => (
                <ExperienceBox {...item} key={index} />
              ))}
            </div>
          </div>
          <div className="w-full tracking-tight lg:flex flex-col justify-center items-center">
            <div>
              <div className="mb-20">
                <p className="text-zinc-800 text-5xl mb-1">
                  <NumberFlow
                    animated={true}
                    respectMotionPreference={false}
                    plugins={[continuous]}
                    spinTiming={{ duration: 1500, easing: "ease" }}
                    value={years}
                    suffix="+"
                  />
                </p>
                <p className="text-zinc-400 text-5xl my-1">
                  Years of Experience
                </p>
              </div>
              <div>
                <p className="text-zinc-800 text-5xl my-1">
                  <NumberFlow
                    animated={true}
                    respectMotionPreference={false}
                    plugins={[continuous]}
                    spinTiming={{ duration: 1500, easing: "ease" }}
                    value={projects}
                    suffix="+"
                  />
                </p>
                <p className="text-zinc-400 text-5xl my-1">Projects Built</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
