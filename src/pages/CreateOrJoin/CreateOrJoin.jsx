import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import PropertyControlledComponent from '@app/hoc/PropertyControlledComponent';

import NoUsernamePlaceholder from '@app/components/NoUsernamePlaceholder';
import telepartyClientInstance from '@app/utils/telepartyClientInstance';
import './createOrJoin.css';

const ChatRoom = () => {
  const [joiningRoomId, setJoiningRoomId] = useState('');
  const userName = useSelector((state) => state.userDetails.userName);
  const navigate = useNavigate();

  const handleCreateRoom = useCallback(async () => {
    const newRoomId = await telepartyClientInstance.createChatRoom(userName);
    navigate(`/chat/${newRoomId}`);
  }, [userName, navigate]);

  const handleJoinRoom = useCallback(() => {
    navigate(`/chat/${joiningRoomId}`);
  }, [joiningRoomId, navigate]);

  return (
    <div>
      <PropertyControlledComponent controllerProperty={userName !== ''}>
        <div className="formSection">
          <input
            type="text"
            placeholder="Please Enter room ID to join"
            value={joiningRoomId}
            onChange={(e) => setJoiningRoomId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleJoinRoom()}
          />
          <button onClick={handleJoinRoom}>Join Room</button>
        </div>
        <div className="formSection">
          <button onClick={handleCreateRoom}>Create Room</button>
        </div>
      </PropertyControlledComponent>
      <PropertyControlledComponent controllerProperty={userName === ''}>
        <NoUsernamePlaceholder />
      </PropertyControlledComponent>
    </div>
  );
};

export default ChatRoom;
