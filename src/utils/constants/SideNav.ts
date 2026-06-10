import { Exclamation, File, List, Person, Tree } from "@/assets/svg";

export type NavLink = { text: string; path: string; icon: string };
export const NavLinks: NavLink[] = [
  {
    text: "Projects",
    path: "/project",
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
    text: "Project Details",
    path: "/project-details",
    icon: Exclamation,
  },
];
export const NavLinksMobil: NavLink[] = [
  {
    text: "Projects",
    path: "/project",
    icon: File,
  },
  {
    text: "Epics",
    path: "/project-epic",
    icon: Tree,
  },
  {
    text: "Tasks",
    path: "/project-tasks",
    icon: List,
  },
  {
    text: "Members",
    path: "/project-memebers",
    icon: Person,
  },
  {
    text: "Details",
    path: "/project-details",
    icon: Exclamation,
  },
];
