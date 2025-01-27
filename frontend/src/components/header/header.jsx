import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUserRole } from '../../selectors';
import { Button } from '../button/button';
import { AdminPanel, Logo, UserPanel } from './components';
import { ROLE } from '../../constants';
import { RESET_AUTH_AND_REG_FORM_ERROR } from '../../actions';
import styles from './header.module.css';

export const Header = () => {
	const userRole = useSelector(selectUserRole);
	const dispatch = useDispatch();

	return (
		<header className={styles.header}>
			<Logo />
			{userRole === ROLE.ADMIN && <AdminPanel />}
			{userRole === ROLE.CLIENT && <UserPanel />}
			{userRole === ROLE.GUEST && (
				<Link
					to="/login"
					onClick={() => dispatch(RESET_AUTH_AND_REG_FORM_ERROR)}
				>
					<Button>Вход</Button>
				</Link>
			)}
		</header>
	);
};
