import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './context/store/store.ts';
import { AuthProvider } from '../src/context/AuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </Provider>
    </StrictMode>
);
