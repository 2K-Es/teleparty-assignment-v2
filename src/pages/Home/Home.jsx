import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import _isEmpty from 'lodash/isEmpty';

import { Field } from '@chakra-ui/react';
import { Button, Input } from '@app/components/ui/atoms';
import telepartyClientInstance from '@app/utils/telepartyClientInstance';

import './home.css';

const Home = () => {
  const [userName, setUserName] = useState('');
  const [showEmptyUserNameError, setShowEmptyUserNameError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSetUserName = useCallback(() => {
    if (_isEmpty(userName)) return setShowEmptyUserNameError(true);
    dispatch({ type: 'userDetails/setUserName', payload: userName });
    telepartyClientInstance.connect();
    navigate('/chat');
  }, [userName, dispatch, navigate]);

  return (
    <div className="homeContainer">
      <h1>Chat Room</h1>
      <div className="formSection">
        <Field.Root invalid={showEmptyUserNameError}>
          <Input
            type="text"
            placeholder="Please enter a username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSetUserName()}
          />
          <Field.ErrorText>This field is required</Field.ErrorText>
        </Field.Root>
        <Button onClick={handleSetUserName}>Set User Name</Button>
      </div>
    </div>
  );
};

export default Home;
