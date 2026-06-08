import { Exclamation, File, List, Person, Tree } from "@/assets/svg";

export type NavLink = { text: string; path: string; icon: string };
export const NavLinkk: NavLink[] = [
  {
    text: "Projects",
    path: "/",
    icon: File,
  },
  {
    text: "Project Epics",
    path: "/project-epic",
    icon: Tree,
  },
  {
    text: "Project Tasks",
    path: "/project-tasks",
    icon: List,
  },
  {
    text: "Project Members",
    path: "/project-memebers",
    icon: Person,
  },
  {
    text: "Project details",
    path: "/project-details",
    icon: Exclamation,
  },
];
