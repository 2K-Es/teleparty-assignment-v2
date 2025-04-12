import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import PropertyControlledComponent from '@app/hoc/PropertyControlledComponent';

import './styles.css';

/**
 * @param {Object[]} messageObjects - An array of message objects containing chat message details.
 * @param {boolean} anyoneTyping - A flag indicating whether any user is currently typing.
 * @param {string} currentUserNickname - The nickname of the current user to differentiate message styling.
 */
const ChatContainer = ({
  messageObjects,
  anyoneTyping,
  currentUserNickname,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom whenever messageObjects changes
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messageObjects]);

  return (
    <div className="chat-container" ref={containerRef}>
      <PropertyControlledComponent
        controllerProperty={messageObjects.length !== 0}
      >
        {messageObjects.map((message) => (
          <div
            key={message.messageId}
            className={`message ${message.userNickname === currentUserNickname ? 'current-user' : 'other-user'}`}
          >
            {message.isSystemMessage ? (
              <div className="system-message">
                <span className="user-nickname">{message.userNickname}</span>
                <span>{` ${message.body}`}</span>
              </div>
            ) : (
              <>
                <div className="message-header">
                  {message.userNickname !== currentUserNickname && (
                    <span className="user-nickname">
                      {message.userNickname}
                    </span>
                  )}
                  <span className="timestamp">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="message-body">{message.body}</div>
              </>
            )}
          </div>
        ))}
        {/* to handle overlapping of message and typing indicator */}
        <div>{'---'}</div>
        {anyoneTyping && (
          <div className="typing-placeholder">
            <span>Someone is typing...</span>
          </div>
        )}
      </PropertyControlledComponent>
    </div>
  );
};

ChatContainer.propTypes = {
  messageObjects: PropTypes.arrayOf(
    PropTypes.shape({
      isSystemMessage: PropTypes.bool.isRequired,
      userNickname: PropTypes.string,
      body: PropTypes.string.isRequired,
      permId: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
    })
  ).isRequired,
  anyoneTyping: PropTypes.bool.isRequired,
  currentUserNickname: PropTypes.string.isRequired,
};

export default memo(ChatContainer);
