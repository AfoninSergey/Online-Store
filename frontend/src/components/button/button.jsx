import { SORTING_ORDER } from '../../constants';
import styles from './button.module.css';

export const Button = ({ addClass, type, children, sort, ...props }) => (
	<button
		className={`
			${styles.button}
			${styles[addClass]}
			${sort === SORTING_ORDER.DESCENDING ? styles.up : ''}
			${sort === SORTING_ORDER.ASCENDING ? styles.down : ''}
			`}
		{...props}
		type={type || 'button'}
	>
		{children}
	</button>
);
