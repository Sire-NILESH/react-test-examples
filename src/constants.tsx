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
    name: "Compound Component",
    href: "/compound-component",
    icon: ({ className }: IconProps) => <Atom className={cn(className)} />,
  },
  {
    name: "Typist",
    href: "/typist",
    icon: ({ className }: IconProps) => <Keyboard className={cn(className)} />,
  },
  {
    name: "Sign in",
    href: "/sign-in",
    icon: ({ className }: IconProps) => <LogIn className={cn(className)} />,
  },
  {
    name: "Sign out",
    href: "/sign-out",
    icon: ({ className }: IconProps) => <LogOut className={cn(className)} />,
  },
];
