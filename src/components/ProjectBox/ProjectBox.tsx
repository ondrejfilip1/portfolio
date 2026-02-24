import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "motion/react";
import {
  CursorFollow,
  CursorProvider,
} from "@/components/ui/shadcn-io/animated-cursor";
import { ArrowUpRight, Maximize2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";

export interface ProjectBoxItem {
  name: string;
  tech: string[];
  image: string[];
  url: string;
  githubLink?: boolean;
}

interface ProjectBoxProps extends ProjectBoxItem {
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

  // carousel - getting current slide index
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // dialog - custom open/close
  const [open, setOpen] = useState(false);

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
          setApi={setApi}
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
                {props.githubLink ? "GITHUB" : "WEB"}
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
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onMouseEnter={() => setShowCursor(false)}
                onMouseLeave={() => setShowCursor(true)}
                className="absolute top-4 right-4 rounded-none bg-zinc-800 text-zinc-100 hover:bg-zinc-100 hover:text-zinc-800 border-0 bigger-icon p-5 !px-[11px]"
              >
                <Maximize2
                  radius={0}
                  strokeLinejoin="miter"
                  strokeLinecap="butt"
                />
              </Button>
            </DialogTrigger>
            <DialogContent
              showCloseButton={false}
              className="!max-w-[calc(100%_-_3rem)] !max-h-[calc(100%_-_3rem)]"
            >
              <Button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 rounded-none bg-zinc-800 text-zinc-100 hover:bg-zinc-100 hover:text-zinc-800 border-0 bigger-icon p-5 !px-[11px]"
              >
                <X radius={0} strokeLinejoin="miter" strokeLinecap="butt" />
              </Button>
              <img
                className="w-full h-full object-center overflow-hidden object-contain"
                src={props.image[current]}
                alt={props.name}
              />
            </DialogContent>
          </Dialog>
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
