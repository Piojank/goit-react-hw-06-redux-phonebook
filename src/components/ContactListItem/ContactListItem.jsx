import s from './ContactListItem.module.css';
import PropTypes from 'prop-types';

export const ContactListItem = ({ name, number, id, onDelete }) => {
    return (
        <li className={s.list__item} key={id}>
            {`${name}: `}
            <span className={s.list__number}>{number}</span>
            <button 
                className={s.list__btn} 
                onClick={() => onDelete(id)}
            >
                Delete
            </button>
        </li>
    );
};

ContactListItem.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
};