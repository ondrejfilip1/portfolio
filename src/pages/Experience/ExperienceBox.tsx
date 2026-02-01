import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ExperienceBoxProps {
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
      <TooltipContent>
        <p>{props.tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
