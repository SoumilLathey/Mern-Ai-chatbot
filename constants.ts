
import { Model, AIProvider } from './types';

export const MODELS: Model[] = [
  { id: 'gpt-4o', name: 'GPT-4o', provider: AIProvider.OPENAI },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: AIProvider.OPENAI },
  { id: 'dialogflow-cx', name: 'Dialogflow CX', provider: AIProvider.DIALOGFLOW },
  { id: 'dialogflow-es', name: 'Dialogflow ES', provider: AIProvider.DIALOGFLOW },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: AIProvider.GEMINI },
  { id: 'gemini-flash-latest', name: 'Gemini Flash', provider: AIProvider.GEMINI },
];
