import styles from './user-title.module.css';
export const UsersTitle = () => (
	<div className={styles.usersTitle}>
		<span className={styles.usersNum}>№</span>
		<span className={styles.usersLogin}>Логин:</span>
		<span className={styles.usersStatus}>Статус:</span>
		<span className={styles.usersAmount}>Купил на (руб.):</span>
	</div>
);
