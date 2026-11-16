import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export let lenis: Lenis | null = null;

export const initSmoothScroll = () => {
  if (lenis) return;
  lenis = new Lenis({ autoRaf: false, respectReducedMotion: false });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
};

export { gsap, ScrollTrigger, useGSAP };
