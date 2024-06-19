import { Atom } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex ms-2 md:me-24">
      <Atom className="h-8 me-3" />
      <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
        React
      </span>
    </Link>
  );
};

export default Logo;
