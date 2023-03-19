import React, {
  memo, useCallback, useRef, useState,
} from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { classNames } from '../../utils';

interface Props {
  onSend: (message: string) => void;
}

const availableHints = {
  press: 'Press <strong>Shift</strong> to add a new line',
  error: 'You can\'t send an empty message',
};

const ChatInput: React.FC<Props> = ({ onSend }) => {
  const isShiftPressed = useRef(false);
  const isBackspacePressed = useRef(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const value = useRef('');
  const [hints, setHints] = useState<keyof typeof availableHints>('press');

  console.log('ChatInput render');

  const handleSend = useCallback(() => {
    if (!textareaRef.current) return;
    if (!value.current.length) {
      setHints('error');
      return;
    }
    onSend(value.current);
    textareaRef.current.style.height = '30px';
    textareaRef.current.value = '';
    value.current = '';
  }, [onSend]);

  const handleInput = useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
    if (hints === 'error') {
      setHints('press');
    }
    if (isBackspacePressed.current || isShiftPressed.current) {
      e.currentTarget.style.height = '30px';
      e.currentTarget.style.height = `${e.currentTarget.scrollHeight - 1}px`;
    }
    value.current = e.currentTarget.value;
  }, [hints]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Shift') {
      isShiftPressed.current = true;
    }
    if (e.key === 'Backspace') {
      isBackspacePressed.current = true;
    }
    if (e.key === 'Enter' && !isShiftPressed.current) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const handleKeyUp = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Shift') {
      isShiftPressed.current = false;
    }
  }, []);

  return (
    <div className="ChatInput">
      <div className="ChatInput-submit_container">
        <textarea
          className="ChatInput-submit_input"
          placeholder="Type your message here"
          ref={textareaRef}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
        <button
          className="ChatInput-submit_button"
          type="button"
          onClick={handleSend}
        >
          <FaPaperPlane />
        </button>
      </div>
      <p
        className={classNames('ChatInput-hints', hints)}
        dangerouslySetInnerHTML={{ __html: availableHints[hints] }}
      />
    </div>
  );
};

export default memo(ChatInput);
