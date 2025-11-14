
import React from 'react';
import { Tool } from '../types';
import { YouTubeIcon } from './icons/YouTubeIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { PosterIcon } from './icons/PosterIcon';
import { CartoonIcon } from './icons/CartoonIcon';
import { AiImageIcon } from './icons/AiImageIcon';
import { LogoIcon } from './icons/LogoIcon';
import { GodIcon } from './icons/GodIcon';

const tools: Tool[] = [
  { id: 'youtube-thumbnail', name: 'YouTube Thumbnail', description: 'Create click-worthy 16:9 thumbnails.', icon: YouTubeIcon, promptPlaceholder: 'e.g., A robot exploring Mars' },
  { id: 'instagram-reel', name: 'Instagram Reel Cover', description: 'Design engaging 9:16 vertical covers.', icon: InstagramIcon, promptPlaceholder: 'e.g., Summer vacation highlights' },
  { id: 'poster', name: 'Poster Generator', description: 'Design stunning posters for any event.', icon: PosterIcon, promptPlaceholder: 'e.g., Indie music festival, retro vibe' },
  { id: 'photo-to-cartoon', name: 'Photo to Oil Painting', description: 'Turn your photos into classic oil paintings.', icon: CartoonIcon, promptPlaceholder: 'e.g., Make the background a fantasy forest', requiresImage: true },
  { id: 'photo-to-god', name: 'Photo to Hindu God', description: 'Transform people into Hindu deities.', icon: GodIcon, promptPlaceholder: 'e.g., As Lakshmi and Vishnu', requiresImage: true },
  { id: 'photo-to-ai', name: 'Photo to AI Image', description: 'Reimagine your photos with AI.', icon: AiImageIcon, promptPlaceholder: 'e.g., Turn this into a cyberpunk character', requiresImage: true },
  { id: 'logo', name: 'Logo Generator', description: 'Generate clean, modern logos.', icon: LogoIcon, promptPlaceholder: 'e.g., A coffee shop named "The Grind"' },
];

interface DashboardProps {
  onSelectTool: (tool: Tool) => void;
}

const ToolCard: React.FC<{ tool: Tool; onClick: () => void }> = ({ tool, onClick }) => (
  <button
    onClick={onClick}
    className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-left flex flex-col items-start gap-4 hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 group"
  >
    <div className="bg-gray-900 p-3 rounded-lg border border-gray-600">
      <tool.icon className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
    </div>
    <div className="flex-1">
      <h3 className="text-xl font-bold text-white">{tool.name}</h3>
      <p className="text-gray-400 mt-1">{tool.description}</p>
    </div>
  </button>
);


const Dashboard: React.FC<DashboardProps> = ({ onSelectTool }) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white">Choose Your Creative Tool</h2>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Select a tool to start generating stunning visuals with the power of AI.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(tool => (
          <ToolCard key={tool.id} tool={tool} onClick={() => onSelectTool(tool)} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;