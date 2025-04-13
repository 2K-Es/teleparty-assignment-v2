import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import _trim from 'lodash/trim';

import { SocketMessageTypes } from 'teleparty-websocket-lib';

import PropertyControlledComponent from '@app/hoc/PropertyControlledComponent';
import NoUsernamePlaceholder from '@app/components/NoUsernamePlaceholder';
import telepartyClientInstance from '@app/utils/telepartyClientInstance';
import useDebounce from '@app/hooks/useDebounce';

import ChatContainer from './components/ChatContainer';
import './chatRoom.css';

const ChatRoom = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();

  const [newMessage, setNewMessage] = useState('');
  const [isCurrentUserTyping, setIsCurrentUserTyping] = useState(false);

  const userName = useSelector((state) => state.userDetails.userName);
  const messageObjects = useSelector((state) => state.chat.messageObjects);
  const isConnected = useSelector((state) => state.chat.isConnected);
  const isAnyoneTyping = useSelector((state) => state.chat.isAnyoneTyping);

  const handleSendMessage = useCallback(() => {
    const trimmedMessage = _trim(newMessage);
    if (trimmedMessage && isConnected) {
      telepartyClientInstance.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
        body: trimmedMessage,
      });
      telepartyClientInstance.sendMessage(
        SocketMessageTypes.SET_TYPING_PRESENCE,
        {
          typing: false,
        }
      );
      setNewMessage('');
    }
  }, [newMessage, isConnected]);

  const handleTyping = useCallback(() => {
    if (isConnected && !isCurrentUserTyping) {
      telepartyClientInstance.sendMessage(
        SocketMessageTypes.SET_TYPING_PRESENCE,
        {
          typing: true,
        }
      );
      setIsCurrentUserTyping(true);
    }
  }, [isConnected, isCurrentUserTyping]);

  // debounce to set not typing after 3 seconds
  useDebounce(
    () => {
      if (isConnected) {
        telepartyClientInstance.sendMessage(
          SocketMessageTypes.SET_TYPING_PRESENCE,
          {
            typing: false,
          }
        );
        setIsCurrentUserTyping(false);
      }
    },
    newMessage,
    3000
  );

  const chatRoomDetails = useMemo(() => {
    return { userName, roomId };
  }, [userName, roomId]);

  useEffect(() => {
    if (!isConnected) return;
    const joinChatRoomWithMessages = async () => {
      const existingMessages = await telepartyClientInstance.joinChatRoom(
        chatRoomDetails.userName,
        chatRoomDetails.roomId
      );
      dispatch({ type: 'chat/addMessageBulk', payload: existingMessages });
      console.log('Joining chat room...');
    };
    if (chatRoomDetails.userName && chatRoomDetails.roomId) {
      joinChatRoomWithMessages();
    }
  }, [isConnected, chatRoomDetails, dispatch]);

  return (
    <div>
      <PropertyControlledComponent controllerProperty={userName !== ''}>
        <div>
          <h3>Chat User Name : {userName}</h3>
          <div className="roomIdContainer">
            <h4>Chat Room ID : </h4>
            <input disabled value={roomId} />
          </div>
          <div>
            <ChatContainer
              messageObjects={messageObjects}
              currentUserNickname={userName}
              anyoneTyping={isAnyoneTyping}
            />
            <div className="inputChatContainer">
              <input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                  else handleTyping();
                }}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      </PropertyControlledComponent>
      <PropertyControlledComponent controllerProperty={userName === ''}>
        <NoUsernamePlaceholder />
      </PropertyControlledComponent>
    </div>
  );
};

export default ChatRoom;
