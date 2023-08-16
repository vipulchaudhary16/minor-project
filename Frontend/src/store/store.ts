import { persistReducer, persistStore } from 'redux-persist';
import { rootReducer } from './root.reducer';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

const persistConfig = {
	key: 'root',
	storage,
	transforms: [
		encryptTransform({
			secretKey: 'my-super-secret-key-xxxx',
			onError() {
				window.location.reload();
			},
		}),
	],
};

const middleware: Array<any> = [];
middleware.push(logger);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(middleware),
});

export const persistedStore = persistStore(store);
