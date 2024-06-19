import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { selectMobileNav } from "../store/mobileNavSlice";
import { cn } from "../utils/cn";
import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { LogIn, LogOut, StickyNote, Users } from "lucide-react";

interface IconProps {
  className?: string;
}

const sidebarItems = [
  {
    name: "Posts",
    href: "/",
    icon: ({ className }: IconProps) => (
      <StickyNote className={cn(className)} />
    ),
  },
  {
    name: "Users",
    href: "/",
    icon: ({ className }: IconProps) => <Users className={cn(className)} />,
  },
  {
    name: "Sign in",
    href: "/",
    icon: ({ className }: IconProps) => <LogIn className={cn(className)} />,
  },
  {
    name: "Sign out",
    href: "/",
    icon: ({ className }: IconProps) => <LogOut className={cn(className)} />,
  },
];

const Sidebar = ({ className }: ComponentPropsWithoutRef<"aside">) => {
  const { status } = useAppSelector(selectMobileNav);
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-card border-r sm:translate-x-0 dark:border-gray-700",
        className,
        !status ? "-translate-x-full" : ""
      )}
      aria-label="Sidebar"
    >
      <NavContents />
    </aside>
  );
};

interface NavItemLinkProps extends PropsWithChildren {
  to: string;
}

const NavItemLink = ({ to, children }: NavItemLinkProps) => {
  return (
    <Link
      to={to}
      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
    >
      {children}
    </Link>
  );
};

const NavContents = () => {
  return (
    <div className="h-full px-3 pb-4 overflow-y-auto">
      <ul className="space-y-2 font-medium">
        {sidebarItems.map((item) => {
          return (
            <li key={item.name}>
              <NavItemLink to={item.href}>
                <item.icon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">{item.name}</span>
              </NavItemLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
