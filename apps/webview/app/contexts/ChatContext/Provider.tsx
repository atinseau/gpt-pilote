import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import ChatContext, { IChatContext } from './Context';

interface Props {
  children: React.ReactNode;
}

interface ConversationWithTheme extends Conversation {
  themeId: number;
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

const createConversation = (initalMessage: string): Conversation => ({
  date: new Date(),
  messages: [createMessage(initalMessage, true)],
});

const createTheme = (name: string, initialMessage: string): Theme => ({
  name,
  conversations: [createConversation(initialMessage)],
});

const getLastConversation = (theme: Theme): Conversation => {
  const lastConversation = theme.conversations[theme.conversations.length - 1];
  return lastConversation;
};

const isToday = (date: Date) => {
  const today = new Date();
  return date.getDate() === today.getDate()
    && date.getMonth() === today.getMonth()
    && date.getFullYear() === today.getFullYear();
};

const ChatProvider: React.FC<Props> = ({ children }) => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [themeId, setThemeId] = useState(-1);
  const [conversations] = useState<ConversationWithTheme[] | null>(null);

  const send = useCallback((message: string) => {
    if (themeId === -1) {
      const newTheme = createTheme('Nouvelle thématique', message);
      setThemes((prev) => {
        const nextThemes = [...prev, newTheme];
        setThemeId(nextThemes.length - 1);
        return nextThemes;
      });
      return;
    }
    const nextThemes = structuredClone([...themes]) as Theme[];
    const lastConversation = getLastConversation(nextThemes[themeId]);
    if (isToday(lastConversation.date)) {
      lastConversation.messages.push(createMessage(message, true));
    } else {
      nextThemes[themeId].conversations.push(createConversation(message));
    }
    setThemes(nextThemes);
  }, [themeId, themes]);

  const defaultContext = useMemo(() => ({
    send,
    conversations,
  } as IChatContext), [send, conversations]);

  return (
    <ChatContext.Provider value={defaultContext}>
      {children}
    </ChatContext.Provider>
  );
};

ChatProvider.displayName = 'ChatProvider';

export default ChatProvider;
