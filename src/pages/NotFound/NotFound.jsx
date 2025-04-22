import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@app/components/ui/atoms';

import './notFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Button onClick={() => navigate('/')}>Go Back to Home</Button>
    </div>
  );
};

export default NotFound;
