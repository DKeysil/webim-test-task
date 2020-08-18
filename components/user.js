import PropTypes from 'prop-types';
import React from 'react';
import styles from '../styles/Home.module.css';

export const User = ({user}) => {
	return (
		<div className={styles.friendContainer}><img src={user.photo_max}/>
			<p>{user.first_name} {user.last_name}</p>
		</div>
	);
};

User.propTypes = {
	user: PropTypes.any
};

export default User;
