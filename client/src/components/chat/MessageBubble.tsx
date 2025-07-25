import React from 'react';
import { Message } from '../../context/ChatContext';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { type, content, timestamp } = message;
  
  // Format timestamp to show only hours and minutes
  const formattedTime = timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`message-bubble ${type}`}>
      <div className="message-content">{content}</div>
      <div className="message-timestamp">{formattedTime}</div>
    </div>
  );
};

export default MessageBubble;
