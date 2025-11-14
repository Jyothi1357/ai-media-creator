import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import GeneratorView from './components/GeneratorView';
import { Tool } from './types';

export default function App() {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 selection:bg-purple-500 selection:text-white">
      <Header onLogoClick={() => setActiveTool(null)} />
      <main className="container mx-auto px-4 py-8">
        {!activeTool ? (
          <Dashboard onSelectTool={setActiveTool} />
        ) : (
          <GeneratorView tool={activeTool} onBack={() => setActiveTool(null)} />
        )}
      </main>
    </div>
  );
}