import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { Notify } from "notiflix";
import { initialContacts } from 'utils/contacts';

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        filter: '',
        contacts: initialContacts(),
    },
    reducers: {
        addContact: (state, action) => {
            const id = nanoid(6);
            const name = action.payload.name;
            const number = action.payload.number;
            const contactList = [...state.contacts];
            
            if (contactList.findIndex(
                    contact => name === contact.name
                ) !== -1
            ) {
                Notify.failure(`${name} is already in contacts!`);
            } else {
                contactList.push({ name, id, number });
            }
            state.contacts = contactList;
        },
        
        deleteContact: (state, action) => {
            const { id } = action.payload;
            const contact = state.contacts.find(el => el.id === id);

            if (contact) {
                const { name, number } = contact;

                state.contacts = state.contacts.filter(contact => contact.id !== id);
    
                Notify.warning(`Contact has been deleted! Name: ${name}, Phone number: ${number}.`);
            };
        },
    },
});

export default contactsSlice.reducer;
export const { addContact, deleteContact } = contactsSlice.actions;

