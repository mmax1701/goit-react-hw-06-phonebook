import { configureStore } from '@reduxjs/toolkit';
import persistedReducer, { contactFormReducer } from './contactFormReducer';
import persistStore from 'redux-persist/es/persistStore';

export const store = configureStore({
  reducer: {
    contactForm: persistedReducer,
  },
});

export const persistor = persistStore(store);
