import { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import {
	AddPart,
	AuthorizeAndRegister,
	CartPage,
	ErrorPage,
	Main,
	Order,
	Part,
	PartList,
	Users,
} from './pages';
import { Header, Loader, Modal } from './components';
import {
	loadCombinesAsync,
	loadPartsAsync,
	setCart,
	setIsLoading,
	setStatuses,
	setUser,
} from './actions';
import styles from './online-store.module.css';
import { ERROR_MESSAGE } from './constants';

export const OnlineStore = () => {
	const dispatch = useDispatch();
	const [error, setError] = useState('');

	useLayoutEffect(() => {
		Promise.all([dispatch(loadCombinesAsync()), dispatch(loadPartsAsync())])
			.then(([combines, parts]) => {
				if (combines.length !== 0 && parts.length !== 0)
					dispatch(setIsLoading(false));
			})
			.catch(() => {
				setError(ERROR_MESSAGE.SERVER_SHORT);
			});

		const currentUserDataJSON = sessionStorage.getItem('currentUserData');
		const loadedStatusesJSON = sessionStorage.getItem('loadedStatuses');
		const currentUserCartDataJSON =
			sessionStorage.getItem('currentUserCartData');

		if (currentUserDataJSON) {
			dispatch(setUser(JSON.parse(currentUserDataJSON)));
		}
		if (currentUserCartDataJSON) {
			dispatch(setCart(JSON.parse(currentUserCartDataJSON)));
		}
		if (loadedStatusesJSON) {
			dispatch(setStatuses(JSON.parse(loadedStatusesJSON)));
		}
	}, [dispatch]);

	if (error) {
		return (
			<div className={styles.onlineStore}>
				<ErrorPage>{error}</ErrorPage>;
			</div>
		);
	}

	return (
		<div className={styles.onlineStore}>
			<h1>"Сельхоззапчасть" - Интернет-магазин сельхоззапчастей.</h1>

			<Loader />
			<Header />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/parts/add" element={<AddPart />} />
				<Route path="/parts/edit" element={<PartList />} />
				<Route path="/parts" element={<Main />} />
				<Route path="/part/:id" element={<Part />} />
				<Route path="/cart" element={<CartPage />} />
				<Route path="/users" element={<Users />} />
				<Route path="/order" element={<Order />} />
				<Route path="/login" element={<AuthorizeAndRegister />} />
				<Route path="/register" element={<AuthorizeAndRegister />} />
				<Route
					path="/*"
					element={
						<ErrorPage>{ERROR_MESSAGE.NON_EXISTENT_PAGE}</ErrorPage>
					}
				/>
			</Routes>
			<Modal />
		</div>
	);
};
