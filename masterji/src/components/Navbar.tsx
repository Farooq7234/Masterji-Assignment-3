'use client';

import React from 'react';
import { Button } from '@/components/ui/button'; // For the dark mode toggle
import { Sun, Moon } from 'lucide-react'; // Icon imports for toggle
import { useTheme } from 'next-themes'; // For dark/light mode toggle
// import Image from 'next/image';

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between p-4   shadow-md">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        {/* <Image
          src="" // Replace with your logo path
          alt="Weather News Logo"
          width={40}
          height={40}
        /> */}
        <h1 className="text-xl font-bold">Weather News</h1>
      </div>

      {/* Dark Mode Toggle */}
      <Button
        variant="ghost"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="flex items-center space-x-2"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
      </Button>
    </nav>
  );
};

export default Navbar;
