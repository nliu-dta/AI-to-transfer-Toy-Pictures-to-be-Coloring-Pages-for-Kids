import React from 'react';
import { Palette, Wand2 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-sm border-b-4 border-crayon-blue py-4 px-6 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-crayon-yellow p-2 rounded-xl shadow-sm rotate-3">
            <Palette className="w-8 h-8 text-crayon-dark" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-crayon-dark tracking-tight fun-font">
              Toy<span className="text-crayon-red">To</span>Color
            </h1>
            <p className="text-sm text-gray-500 font-medium hidden sm:block">
              Turn toys into coloring pages instantly!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
             <Wand2 className="w-3 h-3" />
             AI Powered
           </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
