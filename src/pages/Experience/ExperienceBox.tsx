import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface ExperienceBoxProps {
  image: string;
  tooltip: string;
}

export default function ExperienceBox(props: ExperienceBoxProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <img
          className="min-w-16 max-w-16 w-16"
          src={props.image}
          draggable={false}
        />
      </TooltipTrigger>
      <TooltipContent className="!bg-[#f4f4f5] text-zinc-800 [&_svg]:hidden!" sideOffset={8}>
        <p>{props.tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
