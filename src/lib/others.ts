export const scrollById = (id: string, location?: string, hash?: string) => {
  if ((location || hash) && hash !== `#${location}`) return;
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: "smooth" });
};
