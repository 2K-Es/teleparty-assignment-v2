import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import _trim from 'lodash/trim';
import _isEmpty from 'lodash/isEmpty';

import { SocketMessageTypes } from 'teleparty-websocket-lib';

import PropertyControlledComponent from '@app/hoc/PropertyControlledComponent';
import NoUsernamePlaceholder from '@app/components/NoUsernamePlaceholder';
import telepartyClientInstance from '@app/utils/telepartyClientInstance';
import useDebounce from '@app/hooks/useDebounce';
import { INVALID_SESSION_ID_ERROR_MESSAGE } from '@app/constants/telepartyClientError.constants';
import { Button, Input } from '@app/components/ui/atoms';

import {
  ChatContainer,
  InvalidSessionModal,
  SignOutConfirmationModal,
  UserProfileContainer,
} from './components';
import { TYPING_DEBOUNCE_DELAY } from './chatRoom.constants';
import './chatRoom.css';

const ChatRoom = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();

  const [newMessage, setNewMessage] = useState('');
  const [isCurrentUserTyping, setIsCurrentUserTyping] = useState(false);

  const userName = useSelector((state) => state.userDetails.userName);
  const userProfilePic = useSelector(
    (state) => state.userDetails.userProfilePic
  );

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
    TYPING_DEBOUNCE_DELAY
  );

  const chatRoomDetails = useMemo(() => {
    return { userName, roomId, userProfilePic };
  }, [userName, roomId, userProfilePic]);

  const handleSignOutButtonClick = useCallback(() => {
    dispatch({
      type: 'modals/setIsSignOutConfirmationModalOpen',
      payload: true,
    });
  }, [dispatch]);

  useEffect(() => {
    if (!isConnected) {
      telepartyClientInstance.connect();
    }
    const joinChatRoomWithMessages = async () => {
      try {
        const existingMessages = await telepartyClientInstance.joinChatRoom(
          chatRoomDetails.userName,
          chatRoomDetails.roomId,
          chatRoomDetails.userProfilePic
        );
        dispatch({
          type: 'chat/initMessageBulk',
          payload: existingMessages,
        });
        console.log('Joining chat room...');
      } catch (err) {
        if (err.message === INVALID_SESSION_ID_ERROR_MESSAGE) {
          dispatch({
            type: 'modals/setIsChatRoomInvalidSessionModalOpen',
            payload: true,
          });
        }
      }
    };
    if (chatRoomDetails.userName && chatRoomDetails.roomId) {
      joinChatRoomWithMessages();
    }
  }, [isConnected, chatRoomDetails, dispatch]);

  return (
    <div>
      <PropertyControlledComponent controllerProperty={!_isEmpty(userName)}>
        <div>
          <div className="headerContainer">
            <UserProfileContainer
              userProfilePic={userProfilePic}
              userName={userName}
            />
            <div className="roomIdContainer">
              <h3>RoomID: </h3>
              <Input className="roomIdInput" disabled value={roomId} />
            </div>
            <Button colorPalette="red" onClick={handleSignOutButtonClick}>
              Sign Out
            </Button>
          </div>
          <div>
            <ChatContainer
              messageObjects={messageObjects}
              currentUserNickname={userName}
              anyoneTyping={isAnyoneTyping}
            />
            <div className="inputChatContainer">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                  else handleTyping();
                }}
              />
              <Button colorPalette="green" onClick={handleSendMessage}>
                Send
              </Button>
            </div>
          </div>
        </div>
      </PropertyControlledComponent>

      {/* Modals */}
      <InvalidSessionModal />
      <SignOutConfirmationModal />

      <PropertyControlledComponent controllerProperty={_isEmpty(userName)}>
        <NoUsernamePlaceholder />
      </PropertyControlledComponent>
    </div>
  );
};

export default ChatRoom;
