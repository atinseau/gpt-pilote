import React, { memo } from 'react';
import { classNames } from '../../utils';

interface Props {
  message: Message
}

const ChatMessage: React.FC<Props> = ({ message }) => {
  console.log('Render ChatMessage');
  const { isLocal, content, timestamp } = message;
  return (
    <li className={classNames('ChatMessage', isLocal ? 'local' : 'remote')}>
      <div className="ChatMessage_header">
        <h2>{ isLocal ? 'You' : 'GPT-3' }</h2>
      </div>
      <div className="ChatMessage_container">
        <p>{content}</p>
      </div>
      <div className="ChatMessage_footer">
        <p>{timestamp}</p>
      </div>
    </li>
  );
};

export default memo(ChatMessage);
