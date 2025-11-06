
import { useState, useCallback, useRef } from 'react';
import { Message, MessageRole, AIProvider } from '../types';
import { streamChatResponse } from '../services/chatService';

export const useChat = (initialProvider: AIProvider, initialModel: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState<AIProvider>(initialProvider);
  const [model, setModel] = useState<string>(initialModel);

  const stopStreamingRef = useRef<(() => void) | null>(null);

  const sendMessage = useCallback((content: string, isSystemPrompt = false) => {
    if (isLoading) {
      // Don't send a new message while one is already processing
      // but stop the current one.
      if (stopStreamingRef.current) {
        stopStreamingRef.current();
        setIsLoading(false);
      }
      return;
    }

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: isSystemPrompt ? MessageRole.SYSTEM : MessageRole.USER,
      content,
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    const assistantMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantMessageId, role: MessageRole.ASSISTANT, content: '' }]);

    const stopStream = streamChatResponse(
      updatedMessages,
      provider,
      model,
      {
        onChunk: (chunk) => {
          setMessages(prev =>
            prev.map(msg =>
              msg.id === assistantMessageId
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          );
        },
        onEnd: () => {
          setIsLoading(false);
          stopStreamingRef.current = null;
        },
        onError: (error) => {
          console.error("Streaming error:", error);
          setMessages(prev =>
            prev.map(msg =>
              msg.id === assistantMessageId
                ? { ...msg, content: msg.content + `\n\n**Error:** ${error.message}` }
                : msg
            )
          );
          setIsLoading(false);
          stopStreamingRef.current = null;
        },
      }
    );
    stopStreamingRef.current = stopStream;

  }, [messages, isLoading, provider, model]);

  const clearChat = useCallback(() => {
    if (stopStreamingRef.current) {
      stopStreamingRef.current();
    }
    setMessages([]);
    setIsLoading(false);
  }, []);

  const summarizeChat = useCallback(() => {
    sendMessage("Summarize our conversation so far.", true);
  }, [sendMessage]);

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    summarizeChat,
    provider,
    setProvider,
    model,
    setModel,
  };
};
