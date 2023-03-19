import React, { useCallback } from 'react';
import ChatInput from './ChatInput';
import ChatView from './ChatView';
import { useChat } from '../contexts/ChatContext';

const App: React.FC = () => {
  const chat = useChat();

  const handleSend = useCallback((e: string) => {
    chat.send(e);
  }, [chat]);

  return (
    <main>
      <ChatView conversations={chat.conversations} />
      <ChatInput onSend={handleSend} />
    </main>
  );
};

export default App;
