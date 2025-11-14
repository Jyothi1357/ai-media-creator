import React, { useState, useCallback, useEffect } from 'react';
import { Tool } from '../types';
import { generateCreativeAsset } from '../services/geminiService';
import { fileToGenerativePart } from '../utils/fileUtils';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';

import ImageUploader from './ImageUploader';
import ResultDisplay from './ResultDisplay';
import Loader from './Loader';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { MicIcon } from './icons/MicIcon';

interface GeneratorViewProps {
  tool: Tool;
  onBack: () => void;
}

type ViewState = 'initial' | 'loading' | 'result' | 'error';

const GeneratorView: React.FC<GeneratorViewProps> = ({ tool, onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [referenceImagePreview, setReferenceImagePreview] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewState, setViewState] = useState<ViewState>('initial');

  const { isListening, transcript, startListening, stopListening } = useVoiceRecognition();

  useEffect(() => {
    if (transcript) {
      setPrompt(transcript);
    }
  }, [transcript]);

  const handleImageUpload = (file: File) => {
    setReferenceImage(file);
    setReferenceImagePreview(URL.createObjectURL(file));
  };

  const handleGenerate = useCallback(async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      setViewState('error');
      return;
    }
    if (tool.requiresImage && !referenceImage) {
        setError('This tool requires a reference image.');
        setViewState('error');
        return;
    }

    setViewState('loading');
    setError(null);

    try {
      const imagePart = referenceImage ? await fileToGenerativePart(referenceImage) : undefined;
      const generatedImageBase64 = await generateCreativeAsset({
        toolId: tool.id,
        prompt: prompt,
        imagePart,
      });
      setGeneratedImage(`data:image/png;base64,${generatedImageBase64}`);
      setViewState('result');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Could not generate asset. Please try again.');
      setViewState('error');
    }
  }, [prompt, referenceImage, tool]);

  const handleReset = () => {
    setPrompt('');
    setReferenceImage(null);
    setReferenceImagePreview(null);
    setGeneratedImage(null);
    setError(null);
    setViewState('initial');
  };

  const renderContent = () => {
    switch (viewState) {
      case 'loading':
        return <Loader />;
      case 'result':
        return generatedImage && (
          <ResultDisplay image={generatedImage} onReset={handleReset} prompt={prompt} />
        );
      case 'error':
        return (
          <div className="text-center bg-red-900/50 border border-red-700 p-6 rounded-lg">
            <p className="text-red-300">{error}</p>
            <button
              onClick={() => setViewState('initial')}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition-colors"
            >
              Try Again
            </button>
          </div>
        );
      case 'initial':
      default:
        return (
          <div className="w-full max-w-3xl mx-auto flex flex-col items-center space-y-8">
            <div className="relative w-full">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={tool.promptPlaceholder}
                className="w-full h-32 p-4 pr-16 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition text-lg resize-none"
              />
              <button
                onClick={isListening ? stopListening : startListening}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
                aria-label={isListening ? 'Stop listening' : 'Start voice input'}
              >
                <MicIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="w-full">
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>

            {referenceImagePreview && (
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-400 mb-2">Reference Image:</h3>
                <img src={referenceImagePreview} alt="Reference preview" className="max-w-xs h-auto rounded-lg border-2 border-gray-700 shadow-md" />
              </div>
            )}
            
            <button
              onClick={handleGenerate}
              disabled={!prompt || (tool.requiresImage && !referenceImage)}
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold rounded-full shadow-lg hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-300 ease-in-out font-cartoon disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              <SparklesIcon className="w-7 h-7" />
              Generate
            </button>
          </div>
        );
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Tools
        </button>
      </div>
      <div className="text-center mb-8">
        <tool.icon className="w-12 h-12 mx-auto text-purple-400 mb-2" />
        <h2 className="text-4xl font-bold text-white">{tool.name}</h2>
        <p className="mt-2 text-lg text-gray-400">{tool.description}</p>
      </div>
      {renderContent()}
    </div>
  );
};

export default GeneratorView;
