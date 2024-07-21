import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarItems } from "../constants";
import { useAppSelector } from "../hooks/useAppSelector";
import { selectMobileNav } from "../store/mobileNavSlice";
import { cn } from "../utils/cn";

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
  className?: string;
  to: string;
}

const NavItemLink = ({ className, to, children }: NavItemLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
        className
      )}
    >
      {children}
    </Link>
  );
};

const NavContents = () => {
  const location = useLocation();
  return (
    <div className="h-full px-3 pb-4 overflow-y-auto">
      <ul className="space-y-2 font-medium">
        {sidebarItems.map((item) => {
          return (
            <li key={item.name}>
              <NavItemLink
                to={item.href}
                className={cn(
                  location.pathname === item.href
                    ? "bg-gray-200 dark:bg-gray-600"
                    : ""
                )}
              >
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
