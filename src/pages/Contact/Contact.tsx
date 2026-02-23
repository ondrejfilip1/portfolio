import Header from "@/components/Header/Header";
import ContactLink from "@/components/ContactLink/ContactLink";

export default function Contact() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container m-auto px-4 h-full relative flex items-center justify-center flex-col gap-14 pb-10">
          <ContactLink title="GitHub" link="https://github.com/ondrejfilip1/" />
          <ContactLink
            title="LinkedIn"
            link="https://www.linkedin.com/in/ond%C5%99ej-filip-26518534b/"
          />
        </div>
      </div>
    </>
  );
}
