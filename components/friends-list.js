import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {User} from './user';
import styles from '../styles/Home.module.css';

export const FriendsList = ({vk, userId}) => {
	const [friendsList, setFriendsList] = useState(null);
	const [name, setName] = useState(null);

	useEffect(() => {
		vk.Api.call('friends.get', {user_id: userId, v: '5.122'},
			data => {
				let randInt = Math.floor(Math.random() * data.response.items.length);
				if (randInt < 5) {
					(randInt = 5);
				}

				vk.Api.call('users.get', {user_ids: data.response.items.slice(randInt - 5, randInt).join(','), fields: 'photo_max', v: '5.122'},
					users => {
						setFriendsList(users.response);
					});
			});
		vk.Api.call('users.get', {user_ids: [userId], v: '5.122'},
			({response: {0: {first_name, last_name}}}) => {
				setName(first_name + ' ' + last_name);
			});
	}, [userId]);

	return (
		<div>
			<h3>Друзья пользователя с именем {name}:</h3>
			{
				(friendsList === null) ? null : (

					<div className={styles.friendsContainer}>{friendsList.map(user => (<User user={user}/>))}</div>

				)
			}
		</div>
	);
};

FriendsList.propTypes = {
	vk: PropTypes.any,
	userId: PropTypes.any
};

export default FriendsList;
