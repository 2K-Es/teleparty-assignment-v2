import { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import _isEmpty from 'lodash/isEmpty';

import PropertyControlledComponent from '@app/hoc/PropertyControlledComponent';

import NoUsernamePlaceholder from '@app/components/NoUsernamePlaceholder';
import telepartyClientInstance from '@app/utils/telepartyClientInstance';
import './createOrJoin.css';
import { Button } from '@app/components/ui/atoms';
import { Field, Input } from '@chakra-ui/react';

const ChatRoom = () => {
  const [joiningRoomId, setJoiningRoomId] = useState('');
  const [showEmptyJoiningRoomIdError, setShowEmptyJoiningRoomIdError] =
    useState(false);

  const isConnected = useSelector((state) => state.chat.isConnected);
  const userName = useSelector((state) => state.userDetails.userName);
  const navigate = useNavigate();

  const handleCreateRoom = useCallback(async () => {
    try {
      const newRoomId = await telepartyClientInstance.createChatRoom(userName);
      navigate(`/chat/${newRoomId}`);
    } catch (error) {
      console.error('Failed to create chat room:', error);
    }
  }, [userName, navigate]);

  const handleJoinRoom = useCallback(() => {
    if (_isEmpty(joiningRoomId)) return setShowEmptyJoiningRoomIdError(true);
    navigate(`/chat/${joiningRoomId}`);
  }, [joiningRoomId, navigate]);

  useEffect(() => {
    if (!isConnected) {
      telepartyClientInstance.connect();
    }
  }, [isConnected, navigate]);

  return (
    <div className="createOrJoinContainer">
      <PropertyControlledComponent controllerProperty={!_isEmpty(userName)}>
        <div className="formSection">
          <Field.Root invalid={showEmptyJoiningRoomIdError}>
            <Input
              variant={'subtle'}
              type="text"
              placeholder="Please Enter room ID to join"
              value={joiningRoomId}
              onChange={(e) => setJoiningRoomId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleJoinRoom()}
            />
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
          <Button onClick={handleJoinRoom}>Join Room</Button>
        </div>
        <div className="formSection">
          <Button onClick={handleCreateRoom}>Create Room</Button>
        </div>
      </PropertyControlledComponent>
      <PropertyControlledComponent controllerProperty={_isEmpty(userName)}>
        <NoUsernamePlaceholder />
      </PropertyControlledComponent>
    </div>
  );
};

export default ChatRoom;
