// slices/ticketSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for the ticket slice
const initialState = {
  details: null, // Initialize as null or an empty object if preferred
};

// Create a slice for ticket details
const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    // Action to set ticket details
    setTicketDetails: (state, action) => {
      state.details = action.payload;
    },
    // Action to clear ticket details if needed
    clearTicketDetails: (state) => {
      state.details = null;
    },
  },
});

// Export the actions created by the slice
export const { setTicketDetails, clearTicketDetails } = ticketSlice.actions;

// Export the reducer to be used in the store
export default ticketSlice.reducer;
