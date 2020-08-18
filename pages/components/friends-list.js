import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {User} from './user';
import styles from '../../styles/Home.module.css';

export const FriendsList = ({vk, userId}) => {
	const [friendsList, setFriendsList] = useState(null);

	useEffect(() => {
		vk.Api.call('friends.get', {user_id: userId, v: '5.122'},
			data => {
				vk.Api.call('users.get', {user_ids: data.response.items.slice(0, 5).join(','), fields: 'photo_max', v: '5.122'},
					users => {
						setFriendsList(users.response);
						console.log(users.response);
					});
			});
	}, [userId]);

	return (
		<div>
			<b>Список друзей:</b>
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
