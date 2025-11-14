import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface HeaderProps {
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm shadow-md shadow-purple-500/10 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <button onClick={onLogoClick} className="flex items-center gap-3 group">
          <SparklesIcon className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 group-hover:from-purple-300 group-hover:to-pink-400 transition-all font-cartoon">
            AI Creative Suite
          </h1>
        </button>
      </div>
    </header>
  );
};

export default Header;