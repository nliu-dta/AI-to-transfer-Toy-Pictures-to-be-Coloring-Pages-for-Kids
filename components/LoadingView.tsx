import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingView: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center py-20 text-center animate-pulse">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-crayon-yellow rounded-full blur-xl opacity-50"></div>
        <div className="relative bg-white p-6 rounded-full shadow-lg border-4 border-crayon-blue">
          <Loader2 className="w-16 h-16 text-crayon-blue animate-spin" />
        </div>
      </div>
      
      <h3 className="text-3xl font-bold text-gray-800 mb-4 fun-font">
        Making Magic...
      </h3>
      <p className="text-lg text-gray-600 max-w-xs mx-auto">
        Our digital artists are drawing the outlines for your coloring page!
      </p>
      
      <div className="mt-8 flex gap-2 justify-center">
        <div className="w-3 h-3 rounded-full bg-crayon-red animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-3 h-3 rounded-full bg-crayon-yellow animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 rounded-full bg-crayon-blue animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default LoadingView;
