import { Moon, Sun } from "lucide-react";
import { useAppSelector } from "../hooks/useAppSelector";
import { selectThemeMode, toggle } from "../store/themeSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";

const ThemeToggle = () => {
  const { mode } = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();

  function toggleThemeMode() {
    dispatch(toggle());
  }

  return (
    <button
      className="rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={toggleThemeMode}
    >
      {mode === "dark" ? <Sun /> : <Moon />}
    </button>
  );
};

export default ThemeToggle;
