import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
  ChartBarIcon,
  PowerIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true); // Desktop
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Mobile

  const navItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
    { name: 'Orders', icon: ShoppingCartIcon, path: '/orders' },
    { name: 'Reports', icon: ChartBarIcon, path: '/reports' },
    { name: 'Profile', icon: UserIcon, path: '/profile' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('auth');
    window.location.href = '/login';
  };

  const isActive = (path) =>
    location.pathname === path
      ? 'bg-blue-700 scale-[1.05] text-white shadow-md'
      : 'hover:bg-blue-600 hover:scale-[1.05]';

  return (
    <>
      {/* ✅ Botão Hamburguer - MOBILE */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg bg-blue-800 text-white shadow"
        >
          {isMobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* ✅ Sidebar Desktop */}
      <div
        className={`${
          isOpen ? 'w-64' : 'w-20'
        } hidden md:flex flex-col justify-between bg-blue-800 text-white min-h-screen p-4 shadow-xl transition-all duration-300`}
      >
        <div>
          {/* 🔥 Logo + Botão Minimizar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
             
              {isOpen && <span className="text-2xl font-bold tracking-tight">Dashboard</span>}
            </div>

            {/* 🔥 Botão de minimizar Sidebar (Só Desktop) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 rounded-md hover:bg-blue-700"
            >
              {isOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* 🔥 Navegação */}
          <nav>
            <ul>
              {navItems.map((item) => (
                <li key={item.name} className="mb-2">
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 p-3 rounded-2xl transition-all duration-200 transform ${isActive(
                      item.path
                    )}`}
                  >
                    <item.icon className="h-6 w-6" />
                    {isOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* 🔥 Botão de Logout */}
        <div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 rounded-2xl w-full text-left text-red-300 hover:bg-blue-700 hover:text-white transition-all duration-200 transform hover:scale-[1.03]"
          >
            <PowerIcon className="h-6 w-6" />
            {isOpen && <span>Sair</span>}
          </button>
        </div>
      </div>

      {/* ✅ Sidebar Mobile */}
      {isMobileOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-blue-800 text-white p-4 z-40 shadow-xl transition-transform">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
            
              <span className="text-2xl font-bold tracking-tight">Dashboard</span>
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1 rounded-md hover:bg-blue-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <nav>
            <ul>
              {navItems.map((item) => (
                <li key={item.name} className="mb-2">
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center space-x-3 p-3 rounded-2xl transition-all duration-200 transform ${isActive(
                      item.path
                    )}`}
                  >
                    <item.icon className="h-6 w-6" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 p-3 rounded-2xl w-full text-left text-red-300 hover:bg-blue-700 hover:text-white transition-all duration-200 transform hover:scale-[1.03]"
            >
              <PowerIcon className="h-6 w-6" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
