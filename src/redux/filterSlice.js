import { createSlice } from "@reduxjs/toolkit";
import { initialContacts } from 'utils/contacts';

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        contacts: initialContacts(),
        filter: '',
    },
    reducers: {
        setFilter: (state, action) => {
            const { filter } = action.payload;
            state.filter = filter;
        },
    },
});

export default filterSlice.reducer;
export const { setFilter } = filterSlice.actions;