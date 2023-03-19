import { createContext } from 'react';

interface IChatContext {
  send: (message: string) => void
  conversations: Conversation[] | null
}

const ChatContext = createContext({} as IChatContext);

export type {
  IChatContext,
};

export default ChatContext;
