import { createContext } from 'react';

interface IChatContext {
  send: (message: string) => void
  messages: Message[]
}

const ChatContext = createContext({} as IChatContext);

export type {
  IChatContext,
};

export default ChatContext;
