import useDarkMode from '../hooks/useDarkMode';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const Topbar = () => {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <header className="bg-white dark:bg-gray-800 shadow px-6 py-4 flex items-center justify-between">
      {/* Logo ou título */}
      <div className="flex items-center space-x-2">
        
      </div>

      {/* Usuário e tema */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? (
            <SunIcon className="h-5 w-5 text-yellow-400" />
          ) : (
            <MoonIcon className="h-5 w-5 text-gray-800" />
          )}
        </button>

        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Avatar"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
            admin@example.com
          </span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
