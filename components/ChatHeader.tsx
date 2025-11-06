
import React from 'react';
import { AIProvider, Model } from '../types';
import { MODELS } from '../constants';

interface ChatHeaderProps {
  provider: AIProvider;
  setProvider: (provider: AIProvider) => void;
  model: string;
  setModel: (modelId: string) => void;
  onClear: () => void;
  onSummarize: () => void;
  isSummarizeDisabled: boolean;
}

const BrainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C9.25 2 7 4.25 7 7C7 8.67 7.84 10.13 9 11V12H5V14H9V15C7.34 15 6 16.34 6 18C6 19.66 7.34 21 9 21H15C16.66 21 18 19.66 18 18C18 16.34 16.66 15 15 15V14H19V12H15V11C16.16 10.13 17 8.67 17 7C17 4.25 14.75 2 12 2Z" />
  </svg>
);


export const ChatHeader: React.FC<ChatHeaderProps> = ({
  provider,
  setProvider,
  model,
  setModel,
  onClear,
  onSummarize,
  isSummarizeDisabled,
}) => {
  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProvider = e.target.value as AIProvider;
    setProvider(newProvider);
    // Set to the first model of the new provider
    const firstModel = MODELS.find(m => m.provider === newProvider);
    if (firstModel) {
      setModel(firstModel.id);
    }
  };

  const availableModels = MODELS.filter(m => m.provider === provider);

  return (
    <header className="p-4 border-b border-border-color flex-shrink-0 flex items-center justify-between bg-surface z-10 shadow-sm">
      <div className="flex items-center gap-3">
        <BrainIcon className="h-6 w-6 text-primary"/>
        <h1 className="text-lg font-bold text-text-primary hidden sm:block">AI Chat</h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2">
          <select
            value={provider}
            onChange={handleProviderChange}
            className="bg-user-bubble border border-border-color rounded-md px-2 py-1 text-sm text-text-secondary focus:ring-2 focus:ring-primary focus:outline-none"
          >
            {Object.values(AIProvider).map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="bg-user-bubble border border-border-color rounded-md px-2 py-1 text-sm text-text-secondary focus:ring-2 focus:ring-primary focus:outline-none"
          >
            {availableModels.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={onSummarize} disabled={isSummarizeDisabled} className="px-3 py-1 text-sm bg-user-bubble rounded-md hover:bg-border-color disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Summarize</button>
            <button onClick={onClear} className="px-3 py-1 text-sm bg-user-bubble rounded-md hover:bg-border-color transition-colors">Clear</button>
        </div>
      </div>
    </header>
  );
};
