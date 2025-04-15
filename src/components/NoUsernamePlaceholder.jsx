import { useNavigate } from 'react-router';
import './styles.css';
import { Button } from './ui/atoms';

const NoUsernamePlaceholder = () => {
  const navigate = useNavigate();
  return (
    <div className="noUsernamePlaceholder">
      <span>{'No username set. Please return to the home page '}</span>
      <Button onClick={() => navigate('/')}>Home</Button>
    </div>
  );
};

export default NoUsernamePlaceholder;
