import { Exclamation, File, List, Person, Tree } from "@/assets/svg";
import { useParams } from "react-router-dom";

export type NavLink = {
  text: string;
  path: string;
  icon: string;
  isShow: boolean;
};
export const useNavlist = () => {
  const { id } = useParams();
  return [
    {
      text: "Projects",
      path: `/project`,
      icon: File,
      isShow: true,
    },
    {
      text: "Project Epics",
      path: `/project/${id}/epics`,
      icon: Tree,
      isShow: id ? true : false,
    },
    {
      text: "Project Tasks",
      path: `/project/${id}/tasks`,
      icon: List,
      isShow: id ? true : false,
    },
    {
      text: "Project Members",
      path: `/project/${id}/memebers`,
      icon: Person,
      isShow: id ? true : false,
    },
    {
      text: "Project Details",
      path: `/project/${id}/details`,
      icon: Exclamation,
      isShow: id ? true : false,
    },
  ];
};
