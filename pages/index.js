import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {VkAuth} from './components/vk-auth';

const Home = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico"/>
			</Head>

			<VkAuth/>
		</div>
	);
};

export default Home;
