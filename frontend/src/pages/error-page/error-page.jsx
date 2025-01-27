import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import styles from './error-page.module.css';

export const ErrorPage = ({ children }) => {
	const navigate = useNavigate();
	return (
		<section className={styles.errorPage}>
			<Link to="/">
				<Button>На главную</Button>
			</Link>

			<div className={styles.errorMessage}>{children}</div>

				<Button onClick={() => navigate(-1)}>Назад</Button>

		</section>
	);
};
