import { useEffect } from "react";
import { pageUrl, type PageMeta } from "./seo";
import { lenis } from "./gsap";

export const scrollToTarget = (
  target: HTMLElement | number,
  duration?: number,
) => {
  if (lenis)
    lenis.scrollTo(target, {
      duration: duration !== undefined ? duration / 1000 : undefined,
    });
  else if (typeof target === "number")
    window.scrollTo({ top: target, behavior: "smooth" });
  else target.scrollIntoView({ behavior: "smooth" });
};

export const scrollToId = (id: string, duration?: number) => {
  const element = document.getElementById(id);
  if (element) scrollToTarget(element, duration);
};

export const scrollById = (id: string, location?: string, hash?: string) => {
  if ((location || hash) && hash !== `#${location}`) return;
  scrollToId(id);
};

const setMeta = (name: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[name="${name}"]`,
  );
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = content;
};

const setMetaProperty = (property: string, content: string) => {
  const tag = document.head.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`,
  );
  if (tag) tag.content = content;
};

export const usePageMeta = (page: PageMeta, noIndex = false) => {
  useEffect(() => {
    document.title = page.title;
    setMeta("description", page.description);
    setMeta("robots", noIndex ? "noindex, follow" : "index, follow");
    setMeta("twitter:title", page.title);
    setMeta("twitter:description", page.description);
    setMetaProperty("og:title", page.title);
    setMetaProperty("og:description", page.description);
    setMetaProperty("og:url", pageUrl(page));

    const canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (canonical && !noIndex) canonical.href = pageUrl(page);
  }, [page, noIndex]);
};
