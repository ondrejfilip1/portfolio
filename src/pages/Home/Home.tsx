import Header from "@/components/Header/Header";
import Background from "@/components/Background/Background";
import { useEffect, useState } from "react";
import Projects from "./Projects";
import Footer from "@/components/Footer/Footer";
import { useLocation } from "react-router-dom";
import { scrollById } from "@/lib/others";

export default function Home() {
  const [offset, setOffset] = useState<number>(0);
  const location = useLocation();

  useEffect(() => {
    scrollById("projects", "projects", location.hash);
    let targetX = 0;
    let currentX = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetX = x * 10;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.08);
      setOffset(currentX);
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <Header shouldAnimate={true} />
      <Background />
      <div className="h-dvh w-full">
        <div className="pointer-events-none relative grid size-full grid-rows-[1fr_auto_1fr] p-8">
          <h1 className="relative bottom-18 mix-blend-difference text-[#8e8e84] row-start-2 justify-self-center text-[10vw] leading-[1.15] tracking-tighter">
            <div className="relative" style={{ left: `${offset}px` }}>
              Ondřej
            </div>{" "}
            <div
              className="ml-[1.6em] font-ppeiko tracking-tighter relative"
              style={{ left: `${-offset}px` }}
            >
              Filip
            </div>
          </h1>
        </div>
      </div>
      <Projects />
      <Footer />
    </>
  );
}
