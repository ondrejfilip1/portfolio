import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "motion/react";
import {
  CursorFollow,
  CursorProvider,
} from "@/components/ui/shadcn-io/animated-cursor";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ProjectBoxProps {
  name: string;
  tech: string[];
  image: string[];
  url: string;
  leftSided: boolean;
}

export default function ProjectBox(props: ProjectBoxProps) {
  const [showCursor, setShowCursor] = useState(true);

  const techControls = useAnimation();
  const nameRef = useRef(null);
  const projectRef = useRef(null);

  const nameInView = useInView(nameRef);
  const projectInView = useInView(projectRef);

  useEffect(() => {
    if (nameInView) techControls.start("visible");
    else techControls.start("hidden");
  }, [nameInView]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        ref={projectRef}
        initial={{ opacity: 0, translateY: 100 }}
        animate={projectInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, translateY: 100 },
          visible: { opacity: 1, translateY: 0 },
        }}
        transition={{ duration: 0.6 }}
        className="flex gap-12 items-center justify-center group my-10 xl:flex-row flex-col xl:mx-8"
      >
        <Carousel
          className={
            "xl:flex-[1_0_66%] max-w-full w-full order-1" +
            (props.leftSided ? " xl:order-0" : "")
          }
        >
          <CursorProvider>
            <CursorFollow
              className={
                "transition-opacity " +
                (showCursor ? "!opacity-100" : "!opacity-0")
              }
            >
              <div className="pl-3 pr-2 py-2 text-white bg-black/20 backdrop-blur-lg flex gap-1 items-center">
                GITHUB
                <ArrowUpRight />
              </div>
            </CursorFollow>
          </CursorProvider>
          <CarouselContent>
            {props.image.map((value, index) => (
              <CarouselItem key={index}>
                <Link to={props.url} target="_blank">
                  <img
                    src={value}
                    alt={props.name}
                    className="h-full object-cover aspect-video"
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            onMouseEnter={() => setShowCursor(false)}
            onMouseLeave={() => setShowCursor(true)}
            className="left-4 rounded-none bg-zinc-800 text-zinc-100 border-0 disabled:hidden bigger-icon p-5"
          />
          <CarouselNext
            onMouseEnter={() => setShowCursor(false)}
            onMouseLeave={() => setShowCursor(true)}
            className="right-4 rounded-none bg-zinc-800 text-zinc-100 border-0 disabled:hidden bigger-icon p-5"
          />
        </Carousel>

        <div className="xl:flex-[1_0_33%] max-w-full w-full text-center xl:text-left">
          <div className="text-3xl mb-4 mt-2 text-zinc-800" ref={nameRef}>
            {props.name}
          </div>

          <motion.div
            className="flex gap-4 flex-wrap justify-center xl:justify-normal"
            initial="hidden"
            animate={techControls}
            variants={{
              visible: {
                transition: { staggerChildren: 0.07 },
              },
            }}
          >
            {props.tech.map((value, index) => (
              <motion.div
                key={index}
                className="py-2 px-4 text-base bg-zinc-800 text-zinc-100"
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 40,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", bounce: 0 },
                  },
                }}
              >
                {value}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
