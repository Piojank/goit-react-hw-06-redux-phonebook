import PropTypes from 'prop-types';
import s from './ContactList.module.css';
import { ContactListItem } from 'components/ContactListItem/ContactListItem';

export const ContactList = ({ contacts, onDelete }) => {
    return (
        <ul className={s.list}>
            {contacts.map(({ id, name, number }) => (
            <ContactListItem
                key={id}
                id={id}
                name={name}
                number={number}
                onDelete={onDelete}
            />
        ))}
        </ul>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }),
    ),
    onDelete: PropTypes.func,
};