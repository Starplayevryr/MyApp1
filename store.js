import { configureStore } from '@reduxjs/toolkit';
import ticketReducer from './slices/ticketSlice'; // Adjust the path as needed

const store = configureStore({
  reducer: {
    ticket: ticketReducer,
  },
});

export default store;
