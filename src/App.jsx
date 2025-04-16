import { Suspense, lazy } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import { Provider as ChakraProvider } from './components/ui/provider';
import './index.css';

const Home = lazy(() => import('./pages/Home'));
const CreateOrJoin = lazy(() => import('./pages/CreateOrJoin'));
const ChatRoom = lazy(() => import('./pages/ChatRoom'));

export default function AppRoutes() {
  return (
    <ChakraProvider>
      <div className="appContainer">
        <HashRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<CreateOrJoin />} />
              <Route path="/chat/:roomId" element={<ChatRoom />} />
            </Routes>
          </Suspense>
        </HashRouter>
      </div>
    </ChakraProvider>
  );
}
