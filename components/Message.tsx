
import React from 'react';
import { Message as MessageType, MessageRole } from '../types';

interface MessageProps {
  message: MessageType;
}

const UserIcon: React.FC = () => (
  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
    You
  </div>
);

const AssistantIcon: React.FC = () => (
  <div className="w-8 h-8 rounded-full bg-assistant-bubble flex items-center justify-center flex-shrink-0 border border-border-color">
    <svg className="w-5 h-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
       <path d="M12 2C9.25 2 7 4.25 7 7C7 8.67 7.84 10.13 9 11V12H5V14H9V15C7.34 15 6 16.34 6 18C6 19.66 7.34 21 9 21H15C16.66 21 18 19.66 18 18C18 16.34 16.66 15 15 15V14H19V12H15V11C16.16 10.13 17 8.67 17 7C17 4.25 14.75 2 12 2Z" />
    </svg>
  </div>
);


export const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === MessageRole.USER;

  const bubbleClasses = isUser
    ? 'bg-user-bubble'
    : 'bg-assistant-bubble';

  const layoutClasses = isUser
    ? 'flex-row-reverse'
    : 'flex-row';

  return (
    <div className={`flex items-start gap-4 ${layoutClasses}`}>
      {isUser ? <UserIcon /> : <AssistantIcon />}
      <div className={`max-w-prose p-4 rounded-xl ${bubbleClasses}`}>
        <p className="text-text-primary whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};
