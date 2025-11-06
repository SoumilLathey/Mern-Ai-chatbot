
import { AIProvider, Message } from '../types';

interface StreamHandlers {
  onChunk: (chunk: string) => void;
  onEnd: () => void;
  onError: (error: Error) => void;
}

const MOCK_RESPONSES: Record<AIProvider, string[]> = {
  [AIProvider.OPENAI]: [
    "As an OpenAI model, I can leverage vast datasets to provide comprehensive and nuanced answers. ",
    "My architecture is designed for complex reasoning, allowing me to understand context, generate human-like text, and even write code. ",
    "What specific task would you like to accomplish today?"
  ],
  [AIProvider.DIALOGFLOW]: [
    "Dialogflow speaking! I am optimized for creating conversational interfaces for websites, mobile apps, and IoT devices. ",
    "My strength lies in understanding user intent and providing structured, predictable responses based on predefined conversation flows. ",
    "How may I direct your query?"
  ],
  [AIProvider.GEMINI]: [
    "Hello from Gemini, Google's next-generation multimodal model. ",
    "I can understand and process information from text, code, images, and more simultaneously. ",
    "This allows me to tackle complex problems that require cross-modal reasoning. ",
    "Let's explore something creative together!"
  ],
};

const getMockResponse = (provider: AIProvider, prompt: string): string[] => {
    if (prompt.toLowerCase().includes('summarize')) {
        return ["This is a summary of our conversation. We discussed various AI models, their capabilities, and how a mock streaming interface provides a great user experience. The key takeaway is the power of real-time feedback in modern web applications."];
    }
    return MOCK_RESPONSES[provider] || MOCK_RESPONSES[AIProvider.GEMINI];
}


export const streamChatResponse = (
  messages: Message[],
  provider: AIProvider,
  model: string,
  handlers: StreamHandlers
) => {
  const lastUserMessage = messages[messages.length - 1];
  const responseChunks = getMockResponse(provider, lastUserMessage.content);
  
  let chunkIndex = 0;
  let intervalId: number;

  const stream = () => {
    if (chunkIndex < responseChunks.length) {
      handlers.onChunk(responseChunks[chunkIndex]);
      chunkIndex++;
    } else {
      clearInterval(intervalId);
      handlers.onEnd();
    }
  };

  intervalId = window.setInterval(stream, 200);

  // Return a cleanup function to stop the stream
  return () => {
    clearInterval(intervalId);
  };
};
