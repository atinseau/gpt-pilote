import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import ChatContext, { IChatContext } from './Context';

interface Props {
  children: React.ReactNode;
}

function getCurrentTime(): string {
  const currentTime = new Date().toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return currentTime;
}

const createMessage = (content: string, isLocal: boolean): Message => ({
  content,
  isLocal,
  timestamp: getCurrentTime(),
});

// const createConversation = (initalMessage: string): Conversation => ({
//   date: new Date(),
//   messages: [createMessage(initalMessage, true)],
// });

// const isToday = (date: Date) => {
//   const today = new Date();
//   return date.getDate() === today.getDate()
//     && date.getMonth() === today.getMonth()
//     && date.getFullYear() === today.getFullYear();
// };

const ChatProvider: React.FC<Props> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const send = useCallback((message: string) => {
    setMessages([...messages, createMessage(message, true)]);
  }, [messages]);

  const defaultContext = useMemo(() => ({
    send,
    messages,
  } as IChatContext), [send, messages]);

  return (
    <ChatContext.Provider value={defaultContext}>
      {children}
    </ChatContext.Provider>
  );
};

ChatProvider.displayName = 'ChatProvider';

export default ChatProvider;
