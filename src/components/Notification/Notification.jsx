import s from './Notification.module.css';
import PropTypes from 'prop-types';

export const Notification = ({ message }) => {
    return (
        <p className={s.title}>{message}</p>
    );
};

Notification.propTypes = {
    message: PropTypes.string.isRequired,
};