import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { UserProvider } from './context/user.context.tsx';
import axios from 'axios';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistedStore, store } from './store/store.ts';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<UserProvider>
			<Provider store={store}>
				<PersistGate persistor={persistedStore}>
					<App />
				</PersistGate>
			</Provider>
		</UserProvider>
	</React.StrictMode>
);
