import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-purple-500"></div>
      <h2 className="text-2xl font-bold text-purple-400 font-cartoon">Summoning AI Creativity...</h2>
      <p className="text-gray-400">The digital canvas is being prepared!</p>
    </div>
  );
};

export default Loader;