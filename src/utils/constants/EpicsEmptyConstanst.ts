import LinkedListIcon from "@/assets/svgs/LinkedListIcon";
import RectLine from "@/assets/svgs/RectLine";
import StarsIcon from "@/assets/svgs/StarsIcon";
import type { ElementType } from "react";
export interface BoxProps {
  name: string;
  description: string;
  Icon: ElementType;
}
export const boxInfo: BoxProps[] = [
  {
    name: "High-Level Goals",
    Icon: StarsIcon,
    description:
      "Define the broad objectives that span across multiple cycles.",
  },
  {
    name: "Hierarchy Design",
    Icon: LinkedListIcon,
    description:
      "Link individual tasks to parent epics for a consolidated view.",
  },
  {
    name: "Track Velocity",
    Icon: RectLine,
    description: "Visualize percentage completion at a macro project level.",
  },
];
