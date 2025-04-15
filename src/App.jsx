import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import { Provider as ChakraProvider } from './components/ui/provider';

const Home = lazy(() => import('./pages/Home'));
const CreateOrJoin = lazy(() => import('./pages/CreateOrJoin'));
const ChatRoom = lazy(() => import('./pages/ChatRoom'));

export default function AppRoutes() {
  return (
    <ChakraProvider>
      <div className="appContainer">
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<CreateOrJoin />} />
              <Route path="/chat/:roomId" element={<ChatRoom />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  );
}
