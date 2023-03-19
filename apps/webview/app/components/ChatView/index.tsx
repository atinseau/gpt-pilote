import React, { memo } from 'react';
import ChatMessages from './ChatMessages';

interface Props {
  conversations: Conversation[] | null;
}

const ChatView: React.FC<Props> = ({ conversations }) => (
  <div className="ChatView">
    <ChatMessages conversations={conversations} />
  </div>
);

export default memo(ChatView);
