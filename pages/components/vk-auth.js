import Vk, {Auth} from 'react-vk';
import React, {useState} from 'react';
import {FriendsList} from './friends-list';

export const VkAuth = () => {
	const [status, setStatus] = useState(null);
	const [vkApi, setVkApi] = useState(null);

	return (
		<div>
			<Vk
				apiId={7569953}
				onApiAvailable={vk => {
					vk.Auth.getLoginStatus(({status}) => {
						setStatus(status);
						setVkApi(vk);
					});
				}}
			>
				{status === 'connected' ? (
					<FriendsList vk={vkApi}/>
				) : (
					<Auth
						options={{
							onAuth: () => {
								setStatus('connected');
							}
						}}
					/>
				)}
			</Vk>
		</div>
	);
};
