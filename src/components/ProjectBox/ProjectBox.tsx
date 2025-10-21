import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

export default function ProjectBox(props: {
  name: string;
  tech: string[];
  image: string[];
  url: string;
}) {
  return (
    <div>
      <Carousel>
        <CarouselContent>
          {props.image.map((value, index) => (
            <CarouselItem key={index}>
              <Link to={props.url} target="_blank">
                <img src={value} alt={props.name} className="h-full object-cover aspect-video" />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 rounded-none bg-zinc-800 text-zinc-100 border-0 disabled:hidden" />
        <CarouselNext className="right-4 rounded-none bg-zinc-800 text-zinc-100 border-0 disabled:hidden" />
      </Carousel>
      
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
  );
}
