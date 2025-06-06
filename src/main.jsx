import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import AppWithRoutes from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AppWithRoutes />
  </Provider>
);
