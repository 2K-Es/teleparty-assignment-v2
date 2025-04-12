import { useState } from 'react';
import { useDispatch } from 'react-redux';

import './home.css';
import { useNavigate } from 'react-router';

const Home = () => {
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSetUserName = () => {
    dispatch({ type: 'userDetails/setUserName', payload: userName });
    navigate('/chat');
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <div className="formSection">
        <input
          type="text"
          placeholder="Please enter a username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSetUserName()}
        />
        <button onClick={handleSetUserName}>Set User Name</button>
      </div>
    </div>
  );
};

export default Home;
