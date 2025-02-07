import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  contacts: [],
  filter: '',
  contact: {
    name: '',
    number: '',
  },
};

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {
    addContact(state, action) {
      state.contacts.push(action.payload);
    },
    deleteContact(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    changeFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, changeFilter } =
  contactFormSlice.actions;

export const selectContacts = state => state.contactForm.contacts;
export const selectFilter = state => state.contactForm.filter;
export const selectContact = state => state.contactForm.contact;

const persistConfig = {
  key: 'contactForm',
  storage,
  whitelist: ['contacts'],
};

const persistedReducer = persistReducer(
  persistConfig,
  contactFormSlice.reducer
);

export default persistedReducer;
