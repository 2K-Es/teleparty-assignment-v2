import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import _map from 'lodash/map';
import _size from 'lodash/size';

import PropertyControlledComponent from '@app/hoc/PropertyControlledComponent';
import messageObjectReader from '@app/readers/messageObject.reader';

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
      <PropertyControlledComponent controllerProperty={_size(messageObjects)}>
        {_map(messageObjects, (message) => (
          <div
            key={messageObjectReader.timestamp(message)}
            className={`message ${messageObjectReader.userNickname(message) === currentUserNickname ? 'current-user' : 'other-user'}`}
          >
            {messageObjectReader.isSystemMessage(message) ? (
              <div className="system-message">
                <span className="user-nickname">
                  {messageObjectReader.userNickname(message)}
                </span>
                <span>{` ${messageObjectReader.body(message)}`}</span>
              </div>
            ) : (
              <>
                <div className="message-header">
                  {messageObjectReader.userNickname(message) !==
                    currentUserNickname && (
                    <span className="user-nickname">
                      {messageObjectReader.userNickname(message)}
                    </span>
                  )}
                  <span className="timestamp">
                    {new Date(
                      messageObjectReader.timestamp(message)
                    ).toLocaleTimeString()}
                  </span>
                </div>
                <div className="message-body">
                  {messageObjectReader.body(message)}
                </div>
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
