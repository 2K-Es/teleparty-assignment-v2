import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { SocketMessageTypes } from 'teleparty-websocket-lib';

import PropertyControlledComponent from '@app/hoc/PropertyControlledComponent';
import NoUsernamePlaceholder from '@app/components/NoUsernamePlaceholder';
import telepartyClientInstance from '@app/utils/telepartyClientInstance';

import ChatContainer from './components/ChatContainer';
import './chatRoom.css';

const ChatRoom = () => {
  const { roomId } = useParams();

  const [newMessage, setNewMessage] = useState('');

  const userName = useSelector((state) => state.userDetails.userName);
  const messageObjects = useSelector((state) => state.chat.messageObjects);
  const isConnected = useSelector((state) => state.chat.isConnected);
  const isAnyoneTyping = useSelector((state) => state.chat.isAnyoneTyping);

  const handleSendMessage = () => {
    if (newMessage.trim() && isConnected) {
      telepartyClientInstance.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
        body: newMessage,
      });
      telepartyClientInstance.sendMessage(
        SocketMessageTypes.SET_TYPING_PRESENCE,
        {
          typing: false,
        }
      );
      setNewMessage('');
    }
  };

  const handleTyping = () => {
    if (isConnected) {
      telepartyClientInstance.sendMessage(
        SocketMessageTypes.SET_TYPING_PRESENCE,
        {
          typing: true,
        }
      );
    }
  };

  useEffect(() => {
    if (!isConnected) return;
    telepartyClientInstance.joinChatRoom(userName, roomId);
    console.log('Joining chat room...');
  }, [isConnected, userName, roomId]);

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
            <input
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
      </PropertyControlledComponent>
      <PropertyControlledComponent controllerProperty={userName === ''}>
        <NoUsernamePlaceholder />
      </PropertyControlledComponent>
    </div>
  );
};

export default ChatRoom;
