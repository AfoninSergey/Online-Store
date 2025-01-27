import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../../../button/button';
import { LOGOUT, RESET_CART } from '../../../../actions';
import styles from './admin-panel.module.css';
import { request } from '../../../../utils';

export const AdminPanel = () => {
	const dispatch = useDispatch();


	const onLogout = () => {
		request('/logout', 'POST');
		dispatch(LOGOUT);
		dispatch(RESET_CART);
		sessionStorage.removeItem('currentUserData');
		sessionStorage.removeItem('currentUserCartData');
		sessionStorage.removeItem('loadedStatuses');
	};

	return (
		<div className={styles.adminPanel}>
			<div className={styles.editButtons}>
				<Link to="/parts/add" className={styles.add} title="Добавить запчасть">
					<img src="../pictures/icons/add.png" alt="add" width={112} />
				</Link>
				<Link
					to="/parts/edit"
					className={styles.edit}
					title="Редактировать запчасти"
				>
					<img src="../pictures/icons/edit.png" alt="edit" width={112} />
				</Link>
				<Link to="/users" className={styles.edit} title="Список клиентов">
					<img src="../pictures/icons/users.png" alt="users" width={112} />
				</Link>
			</div>

			<Button onClick={onLogout}>Выйти</Button>

		</div>
	);
};
