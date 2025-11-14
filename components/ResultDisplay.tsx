import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';
import { RefreshIcon } from './icons/RefreshIcon';

interface ResultDisplayProps {
  image: string;
  onReset: () => void;
  prompt: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ image, onReset, prompt }) => {
  return (
    <div className="w-full flex flex-col items-center animate-fade-in space-y-8">
      <div className="bg-gray-800 p-3 rounded-2xl shadow-lg shadow-purple-500/20 transform transition-transform hover:scale-105 border border-gray-700">
        <img 
            src={image} 
            alt="Generated creative asset" 
            className="rounded-xl w-full max-w-lg h-auto" 
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href={image}
          download={`ai-generated-${prompt.slice(0, 20).replace(/\s/g, '_')}.png`}
          className="inline-flex items-center gap-3 px-6 py-3 bg-green-600 text-white text-lg font-bold rounded-full shadow-lg hover:bg-green-500 transform hover:scale-105 transition-all"
        >
          <DownloadIcon className="w-6 h-6" />
          Download
        </a>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-3 px-6 py-3 bg-gray-600 text-white text-lg font-bold rounded-full shadow-lg hover:bg-gray-500 transform hover:scale-105 transition-all"
        >
          <RefreshIcon className="w-6 h-6" />
          Create Another
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;