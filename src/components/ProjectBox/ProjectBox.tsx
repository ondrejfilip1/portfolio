import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function ProjectBox(props: {
  name: string;
  tech: string[];
  image: string[];
  url: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: "100px" }}
      whileInView={{ opacity: 1, translateY: 0 }}
      transition={{
        x: { type: "spring", bounce: 0 },
      }}
      className="group"
    >
      <Carousel>
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
        <CarouselPrevious className="left-4 rounded-none bg-zinc-800 text-zinc-100 border-0 disabled:hidden" />
        <CarouselNext className="right-4 rounded-none bg-zinc-800 text-zinc-100 border-0 disabled:hidden" />
      </Carousel>

      <div className="flex justify-between items-center">
        <div>
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
        <ArrowUpRight
          size={30}
          className="opacity-0 group-hover:opacity-100 group-hover:translate-0 transition-all -translate-x-1 translate-y-1 mr-2 duration-200"
        />
      </div>
    </motion.div>
  );
}
