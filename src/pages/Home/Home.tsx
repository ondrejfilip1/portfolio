import Header from "@/components/Header/Header";
import Background from "@/components/Background/Background";
import { useEffect, useRef } from "react";
import Projects from "./Projects";
import Footer from "@/components/Footer/Footer";
import { useLocation } from "react-router-dom";
import {
  scrollById,
  scrollToId,
  scrollToTarget,
  usePageMeta,
} from "@/lib/others";
import { pages } from "@/lib/seo";
import { ChevronDown } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const ROTATION = 5;
const BOX_SCALE = 1;

export default function Home() {
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  usePageMeta(pages.home);

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
      const nextX = lerp(currentX, targetX, 0.08);
      if (Math.abs(nextX - currentX) > 0.01) {
        currentX = nextX;
        if (firstNameRef.current)
          firstNameRef.current.style.left = `${currentX}px`;
        if (lastNameRef.current)
          lastNameRef.current.style.left = `${-currentX}px`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useGSAP(
    () => {
      const box = boxRef.current!;
      const layer = layerRef.current!;
      const articles = gsap.utils.toArray<HTMLElement>("[data-project]");
      const media = articles.map(
        (a) => a.querySelector<HTMLElement>("[data-project-media]")!,
      );

      // media center within its article, ignoring motion's entrance translateY
      const centerOffset = (article: HTMLElement, el: HTMLElement) => {
        const t = getComputedStyle(el.parentElement!).transform;
        const shift = t === "none" ? 0 : new DOMMatrix(t).m42;
        const a = article.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        return r.top - a.top - shift + r.height / 2;
      };

      const pins = articles.map((article, i) =>
        ScrollTrigger.create({
          id: `project-${i}`,
          trigger: article,
          pin: true,
          start: () => `top+=${centerOffset(article, media[i])} center`,
          end: "+=30%",
        }),
      );

      let tl: gsap.core.Timeline | undefined;

      // timeline measured in scroll pixels, rebuilt on every refresh
      const build = () => {
        tl?.kill();
        gsap.set(box, { clearProps: "width,height" });
        const vw = layer.clientWidth;
        const vh = window.innerHeight;
        const hero = box.offsetWidth;
        const rad = (ROTATION * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        // smallest rotated box that still contains the image, then scaled
        const targets = media.map((el) => {
          const r = el.getBoundingClientRect();
          return {
            x: r.left + r.width / 2,
            w: (r.width * cos + r.height * sin) * BOX_SCALE,
            h: (r.width * sin + r.height * cos) * BOX_SCALE,
          };
        });
        gsap.set(layer, {
          "--box-max-w": `${Math.max(...targets.map((t) => t.w), 0)}px`,
          "--box-max-h": `${Math.max(...targets.map((t) => t.h), 0)}px`,
        });

        const start = vh * 0.5;
        gsap.set(box, {
          xPercent: -50,
          yPercent: -50,
          x: vw / 2,
          y: vh / 2,
          width: hero,
          height: hero,
          rotation: 0,
          "--shape": 1,
        });
        tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
        tl.to(box, { y: vh / 2 - start, duration: start }, 0);

        let prevEnd = start;
        pins.forEach((pin, i) => {
          const t = targets[i];
          let from = prevEnd;
          let duration = Math.max(pin.start - prevEnd, 1);
          if (i > 0) {
            // back to the hero square halfway between projects
            duration /= 2;
            tl!.to(
              box,
              {
                x: (targets[i - 1].x + t.x) / 2,
                width: hero,
                height: hero,
                rotation: 0,
                "--shape": 1,
                ease: "power2.inOut",
                duration,
              },
              from,
            );
            from += duration;
          }
          tl!.to(
            box,
            {
              x: t.x,
              y: vh / 2,
              width: t.w,
              height: t.h,
              rotation: i % 2 ? -ROTATION : ROTATION,
              "--shape": 0,
              ease: "power2.inOut",
              duration,
            },
            from,
          );
          prevEnd = pin.end;
        });

        const last = targets[targets.length - 1];
        const exit = vh / 2 + (last?.h ?? hero);
        tl.to(box, { y: `-=${exit}`, duration: exit }, prevEnd);
        tl.time(window.scrollY);
      };

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onRefresh: build,
        onUpdate: (self) => tl?.time(self.scroll()),
      });
      build();

      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        tl?.kill();
        gsap.set(box, { clearProps: "transform,width,height,--shape" });
      };
    },
    { scope: mainRef },
  );

  return (
    <>
      <Header shouldAnimate={true} />
      <main
        ref={mainRef}
        className="[--hero-box:max(40dvw,min(80vw,60svh))] lg:[--hero-box:40dvw]"
      >
        <section className="relative -mt-18 grid h-svh w-full place-items-center overflow-hidden">
          <div
            ref={layerRef}
            className="pointer-events-none fixed inset-0 overflow-hidden"
          >
            <Background ref={boxRef} />
          </div>
          <h1 className="pointer-events-none relative col-start-1 row-start-1 mix-blend-difference text-[#8e8e84] text-[calc(var(--hero-box)/4)] leading-[1.15] tracking-tighter">
            <span className="relative block" ref={firstNameRef}>
              Ondřej
            </span>{" "}
            <span
              className="ml-[1.6em] font-ppeiko tracking-tighter relative block"
              ref={lastNameRef}
            >
              Filip
            </span>
          </h1>
          <button
            type="button"
            aria-label="Scroll to projects"
            onClick={() => {
              const pin = ScrollTrigger.getById("project-0");
              if (pin) scrollToTarget(pin.start, 800);
              else scrollToId("projects", 800);
            }}
            className="absolute w-10 h-10 p-1 z-10 appear-anim cursor-pointer bottom-12 left-1/2 transform -translate-x-1/2 text-zinc-600 hover:text-zinc-800 transition-colors"
          >
            <ChevronDown
              className="size-full"
              radius={0}
              strokeLinejoin="miter"
              strokeLinecap="butt"
            />
          </button>
        </section>
        <Projects />
      </main>
      <Footer />
    </>
  );
}
