
import React from 'react';
import { ChatWindow } from './components/ChatWindow';

function App() {
  return (
    <div className="h-screen w-screen bg-brand-bg text-text-primary font-sans flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6">
        <div className="w-full max-w-4xl h-full bg-surface rounded-xl shadow-2xl flex flex-col border border-border-color overflow-hidden">
          <ChatWindow />
        </div>
      </main>
    </div>
  );
}

export default App;
