
export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
}

export enum AIProvider {
  OPENAI = 'OpenAI',
  DIALOGFLOW = 'Dialogflow',
  GEMINI = 'Gemini',
}

export interface Model {
  id: string;
  name: string;
  provider: AIProvider;
}
