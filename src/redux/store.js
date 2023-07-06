import { configureStore } from '@reduxjs/toolkit';
import contactsSlice from './contactsSlice';
import filterSlice from './filterSlice';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    contactsSlice,
    filterSlice,
});

export const store = configureStore({
    reducer: reducers,
});