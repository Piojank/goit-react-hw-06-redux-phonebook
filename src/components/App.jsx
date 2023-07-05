import { useState, useEffect } from 'react';
import s from './App.module.css';

import { Section } from "./Section/Section";
import { Notification } from "./Notification/Notification";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";

import { save, load } from "./utils/storage";
import initialContacts from "./utils/contacts.json";

import { Notify } from "notiflix";
import { nanoid } from "nanoid";

const INITIAL_STATE = {
    contacts: initialContacts,
    filter: '',
};
export const App = () => {

    const [contacts, setContacts] = useState(load('contacts') ?? INITIAL_STATE.contacts);
    const [filter, setFilter] = useState(INITIAL_STATE.filter);

    const addContact = (data) => {
        const { name, number } = data;

        const newContact = {
            id: nanoid(6),
            name,
            number,
        };

        if (contacts.find(contact => contact.name === name)) {
            Notify.failure(`${name} is already in contacts!`);
            return;
        }

        setContacts([...contacts, newContact]);

        Notify.success(`New contact has been added! Name: ${newContact.name}, Phone number: ${newContact.number}.`);
    };

    const onChangeFilter = event => {
        setFilter(event.currentTarget.value);
    };

    const getFilteredContacts = () => {
        return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
    };

    const clearContact = id => {

        const contact = contacts.find(el => el.id === id);

        if (contact) {
            const { name, number } = contact;

            setContacts(contacts.filter(contact => contact.id !== id));
    
            Notify.warning(`Contact has been deleted! Name: ${name}, Phone number: ${number}.`);
        }
    };

    const filteredContacts = getFilteredContacts();

    useEffect(() => {
        const parsedContacts = load('contacts');
        if (parsedContacts) {
            setContacts(parsedContacts);
        }
    }, []);

    useEffect(() => {
        save('contacts', contacts);
    }, [contacts]);

    return (
        <div className={s.container}>
            <Section title="Phonebook">
                <ContactForm handleSubmit={addContact}/>
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