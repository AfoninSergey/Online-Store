import { Link } from 'react-router-dom';
import styles from './logo.module.css';

export const Logo = () => (
	<Link to="/" className={styles.logo} title='На главную'>
		<img
			src="../pictures/logo/logo.png"
			alt="'Сельхоззапчасть' - Интернет-магазин сельхоззапчастей"
			width={473}
			height={176}
		/>
	</Link>
);
