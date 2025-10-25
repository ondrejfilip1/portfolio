import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  CursorFollow,
  CursorProvider,
} from "@/components/ui/shadcn-io/animated-cursor";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

interface ProjectBoxProps {
  name: string;
  tech: string[];
  image: string[];
  url: string;
  leftSided: boolean;
}

export default function ProjectBox(props: ProjectBoxProps) {
  const [showCursor, setShowCursor] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, translateY: "100px" }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{
          x: { type: "spring", bounce: 0 },
        }}
        className="flex gap-12 items-center justify-center group my-10"
      >
        <Carousel
          className={
            "max-w-[66.666vw] w-full" + (props.leftSided ? " order-2" : "")
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

        <div className="max-w-[33.333vw] w-full">
          <div className="text-3xl mb-4 mt-2 text-zinc-800">{props.name}</div>
          <div className="flex gap-4">
            {props.tech.map((value, index) => (
              <div
                className="py-2 px-4 text-base bg-zinc-800 text-zinc-100"
                key={index}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
