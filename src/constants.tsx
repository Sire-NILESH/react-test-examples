import {
  StickyNote,
  LogIn,
  LogOut,
  TrafficCone,
  Timer,
  GalleryHorizontal,
  Pointer,
  Atom,
  ArrowDown01,
  FolderTree,
  Keyboard,
  ListTodo,
  Cog,
  NotepadText,
  Hand,
  ListCollapse,
} from "lucide-react";
import { cn } from "./utils/cn";

interface IconProps {
  className?: string;
}

export const sidebarItems = [
  {
    name: "Counter",
    href: "/counter",
    icon: ({ className }: IconProps) => (
      <ArrowDown01 className={cn(className)} />
    ),
  },
  {
    name: "Posts",
    href: "/posts",
    icon: ({ className }: IconProps) => (
      <StickyNote className={cn(className)} />
    ),
  },
  {
    name: "Todos",
    href: "/todos",
    icon: ({ className }: IconProps) => <ListTodo className={cn(className)} />,
  },
  {
    name: "Traffic Light",
    href: "/traffic-light",
    icon: ({ className }: IconProps) => (
      <TrafficCone className={cn(className)} />
    ),
  },
  {
    name: "Stop Watch",
    href: "/stop-watch",
    icon: ({ className }: IconProps) => <Timer className={cn(className)} />,
  },
  {
    name: "Slider",
    href: "/slider",
    icon: ({ className }: IconProps) => (
      <GalleryHorizontal className={cn(className)} />
    ),
  },
  {
    name: "File Tree",
    href: "/file-tree",
    icon: ({ className }: IconProps) => (
      <FolderTree className={cn(className)} />
    ),
  },
  {
    name: "Pointer",
    href: "/pointer",
    icon: ({ className }: IconProps) => <Pointer className={cn(className)} />,
  },
  {
    name: "Notes",
    href: "/notes",
    icon: ({ className }: IconProps) => (
      <NotepadText className={cn(className)} />
    ),
  },
  {
    name: "Drag-n-Drop",
    href: "/drag-n-drop",
    icon: ({ className }: IconProps) => <Hand className={cn(className)} />,
  },
  {
    name: "Compound Component",
    href: "/compound-component",
    icon: ({ className }: IconProps) => <Atom className={cn(className)} />,
  },
  {
    name: "Accordian",
    href: "/accordian-page",
    icon: ({ className }: IconProps) => (
      <ListCollapse className={cn(className)} />
    ),
  },
  {
    name: "Typist",
    href: "/typist",
    icon: ({ className }: IconProps) => <Keyboard className={cn(className)} />,
  },
  {
    name: "Admin Page",
    href: "/admin-page",
    icon: ({ className }: IconProps) => <Cog className={cn(className)} />,
  },
  {
    name: "Login",
    href: "/login",
    icon: ({ className }: IconProps) => <LogIn className={cn(className)} />,
  },
  {
    name: "Logout",
    href: "/logout",
    icon: ({ className }: IconProps) => <LogOut className={cn(className)} />,
  },
];
