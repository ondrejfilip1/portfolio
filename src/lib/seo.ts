export const SITE_URL = "https://ondrejfilip1.github.io/portfolio";

export interface PageMeta {
  path: string;
  title: string;
  description: string;
}

export const pages = {
  home: {
    path: "/",
    title: "Ondřej Filip – Web Developer & Programmer | Portfolio",
    description:
      "Portfolio of Ondřej Filip, a web developer and programmer building React, Next.js, React Native and MERN stack applications. Browse my projects and get in touch.",
  },
  experience: {
    path: "/experience/",
    title: "Experience & Skills | Ondřej Filip",
    description:
      "Technologies Ondřej Filip works with: React, Next.js, React Native, TypeScript, Node.js, Express, MongoDB, SQL and more.",
  },
  contact: {
    path: "/contact/",
    title: "Contact | Ondřej Filip",
    description:
      "Get in touch with Ondřej Filip – web developer and programmer. Reach out via email, GitHub or LinkedIn.",
  },
} satisfies Record<string, PageMeta>;

export const notFoundPage: PageMeta = {
  path: "/404.html",
  title: "Page not found | Ondřej Filip",
  description: "This page does not exist.",
};

export const pageUrl = (page: PageMeta) => SITE_URL + page.path;
