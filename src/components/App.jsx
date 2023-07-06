import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './App.module.css';

import { Section } from "./Section/Section";
import { Notification } from "./Notification/Notification";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";

import { save } from 'utils/storage';

import { addContact, deleteContact } from 'redux/contactsSlice';
import { setFilter } from 'redux/filterSlice';

import { selectContacts, selectFilters } from 'redux/selectors';

export const App = () => {
    const dispatch = useDispatch();
    const { contacts } = useSelector(selectContacts);
    const { filter } = useSelector(selectFilters);

    useEffect(() => {
        save('contacts', contacts);
    }, [contacts]);


    const onChangeFilter = event => {
        dispatch(
            setFilter({
                filter: event.currentTarget.value,
            }),
        );
    };

    const handleSubmit = event => {
        const name = event.name;
        const number = event.number;
        dispatch(
            addContact({
                name,
                number,
            })
        );
    };

    const clearContact = id => {
        dispatch(
            deleteContact({
                id,
            })
        );
    };

    const getFilteredContacts = () => {
        return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
    };

    const filteredContacts = getFilteredContacts();

    return (
        <div className={s.container}>
            <Section title="Phonebook">
                <ContactForm handleSubmit={handleSubmit}/>
            </Section>
            <Section title="Contacts">
                {contacts.length > 1 && <Filter value={filter} onChange={onChangeFilter} /> }
                {filteredContacts.length > 0 && (
                    <ContactList contacts={filteredContacts} onDelete={clearContact}/>
                )}
                {contacts.length < 1 && <Notification message="You phonebook is empty! Please add contact."/>}
            </Section>
        </div>
    );
}; 