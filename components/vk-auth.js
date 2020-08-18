import Vk from 'react-vk';
import React, {useState} from 'react';
import {FriendsList} from './friends-list';
import styles from '../styles/Home.module.css';

export const VkAuth = () => {
	const [vkApi, setVkApi] = useState(null);
	const [id, setId] = useState(null);

	return (
		<div>
			<Vk
				apiId={7569953}
				onApiAvailable={vk => {
					setVkApi(vk);
					vk.Auth.getLoginStatus(({status}) => {
						if (status === 'connected') {
							setTimeout(() => {
								vk.Auth.getLoginStatus(({session: {user}}) => {
									setId(user.id);
								}, true);
							}, 0);
						}
					});
				}}
			>
				{
					(id === null) ?
						(
							<button
								type="button"
								className={styles.button} onClick={() => {
									vkApi.Auth.login(response => {
										if (response.session !== null) {
											const {session: {user}} = response;
											setId(user.id);
										}
									}, 2);
								}}
							>
								Войти через вконтакте
							</button>
						) :
						(
							<FriendsList vk={vkApi} userId={id}/>
						)
				}

			</Vk>
		</div>
	);
};

export default VkAuth;
