import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
}

export const Header = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor
}: HeadingProps ) => {
  return (
      <div className="lg:px-8 flex px-4 items-center mb-8 gap-x-3">
        <div className={cn("p-2 rounded-md w-fit", bgColor)}>
          <Icon className={cn("w-12 h-12", iconColor)}/>
        </div>
        <div>
          <h2 className="font-bold text-3xl">{title}</h2>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
  )
}
