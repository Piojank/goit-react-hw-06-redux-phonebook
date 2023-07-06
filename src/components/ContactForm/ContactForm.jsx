import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

const INITIAL_STATE = {
    name: '',
    number: '',
};

export const ContactForm = ({ handleSubmit }) => {
    const [name, setName] = useState(INITIAL_STATE.name);
    const [number, setNumber] = useState(INITIAL_STATE.number);

    const onSubmit = event => {
        event.preventDefault();
        onSubmit && handleSubmit({ name: name, number: number });
        reset();
    };

    const reset = () => {
        setName(INITIAL_STATE.name);
        setNumber(INITIAL_STATE.number);
    };

    return (
        <form className={s.form} onSubmit={onSubmit}>
            <label className={s.label}>
                Name
                <input 
                    className={s.input}
                    type="name" 
                    name="name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    placeholder='Enter name'
                    required
                />
            </label>
            <label className={s.label}> 
                Phone number
                <input 
                    className={s.input}
                    type="phone" 
                    name="number"
                    value={number}
                    onChange={event => setNumber(event.target.value)}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    placeholder='Enter phone number'
                    required
                />
            </label>

            <button type="submit" className={s.btn} disabled={!name && !number}>
                Add contact
            </button>
        </form>
    );
};

ContactForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};