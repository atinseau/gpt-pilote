import { useContext } from 'react';
import chatContext from '../Context';

const useChat = () => {
  const useChatContext = useContext(chatContext);
  return useChatContext;
};

export default useChat;
