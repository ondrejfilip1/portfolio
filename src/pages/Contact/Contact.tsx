import Header from "@/components/Header/Header";
import ContactLink from "@/components/ContactLink/ContactLink";
import { usePageMeta } from "@/lib/others";
import { pages } from "@/lib/seo";

export default function Contact() {
  usePageMeta(pages.contact);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container m-auto px-4 h-full relative flex items-center justify-center flex-col gap-14 pb-10">
          <h1 className="sr-only">Contact Ondřej Filip</h1>
          <ContactLink title="GitHub" link="https://github.com/ondrejfilip1/" />
          <ContactLink
            title="Email"
            link="mailto:ondrejfilipstranky@gmail.com"
          />
          <ContactLink
            title="LinkedIn"
            link="https://www.linkedin.com/in/ond%C5%99ej-filip-26518534b/"
          />
        </main>
      </div>
    </>
  );
}
