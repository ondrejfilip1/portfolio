import Header from "@/components/Header/Header";
import Background from "@/components/Background/Background";
import { useEffect, useState } from "react";

export default function Home() {
  const [offset, setOffset] = useState<number>(0);
  useEffect(() => {
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
      <Header />
      <Background />
      <div className="absolute top-0 left-0 h-dvh w-full">
        <div className="pointer-events-none relative grid size-full grid-rows-[1fr_auto_1fr] p-8">
          <h1 className="mix-blend-difference text-[#69ffcf] row-start-2 justify-self-center text-[clamp(3.25rem,1.5rem+8.75vw,12rem)] leading-[1.15] tracking-tighter">
            <div className="relative" style={{left: `${offset}px`}} >Ondřej</div>{" "}
            <div className="ml-[1em] font-dirtyline tracking-normal relative" style={{left: `${-offset}px`}}>FILIP</div>
          </h1>
        </div>
      </div>
    </>
  );
}
