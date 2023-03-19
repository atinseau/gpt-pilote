import React, { memo } from 'react';
import ChatMessage from './ChatMessage';
import { formatDate } from '../../utils';

interface Props {
  conversations: Conversation[] | null;
}

const ChatMessages: React.FC<Props> = ({ conversations }) => (
  <div className="ChatMessages_conversation_container">
    {conversations && conversations.length
      ? conversations.map(({ date, messages }, i) => (
        <div key={i} className="ChatMessages_conversation">
          <div className="ChatMessages_header">
            <h2>{formatDate(date)}</h2>
          </div>
          <ul className="ChatMessages">
            {messages.map((message, e) => <ChatMessage key={e} message={message} />)}
          </ul>
        </div>
      ))
      : (
        <div className="ChatMessages_no_conversation">
          <h2>There is no conversations here...</h2>
        </div>
      )}
  </div>
);

export default memo(ChatMessages);
