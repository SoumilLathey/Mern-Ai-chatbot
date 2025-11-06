
import React from 'react';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { useChat } from '../hooks/useChat';
import { AIProvider } from '../types';
import { MODELS } from '../constants';

export const ChatWindow: React.FC = () => {
  const initialProvider = AIProvider.GEMINI;
  const initialModel = MODELS.find(m => m.provider === initialProvider)?.id || '';
  
  const {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    summarizeChat,
    provider,
    setProvider,
    model,
    setModel,
  } = useChat(initialProvider, initialModel);

  return (
    <div className="flex flex-col h-full bg-surface">
      <ChatHeader
        provider={provider}
        setProvider={setProvider}
        model={model}
        setModel={setModel}
        onClear={clearChat}
        onSummarize={summarizeChat}
        isSummarizeDisabled={messages.length === 0 || isLoading}
      />
      <MessageList messages={messages} />
      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  );
};
