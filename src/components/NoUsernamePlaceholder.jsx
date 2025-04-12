import { useNavigate } from 'react-router';
import './styles.css';

const NoUsernamePlaceholder = () => {
  const navigate = useNavigate();
  return (
    <div className="noUsernamePlaceholder">
      <span>{'No username set. Please go back '}</span>
      <button onClick={() => navigate('/')}>Home</button>
    </div>
  );
};

export default NoUsernamePlaceholder;
