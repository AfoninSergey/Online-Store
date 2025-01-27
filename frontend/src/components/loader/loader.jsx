import { useSelector } from 'react-redux';
import styles from './loader.module.css';
import { selectIsLoading } from '../../selectors';

export const Loader = () => {
	const isLoading = useSelector(selectIsLoading);
	if (!isLoading) {
		return null;
	}
	return (
		<div className={styles.loader}>
			<div className={styles.loaderContent}>
				<div className={styles.wrapper}>
					<div className={styles.gear}>
						<span style={{ '--i': '1' }} />
						<span style={{ '--i': '2' }} />
						<span style={{ '--i': '3' }} />
						<span style={{ '--i': '4' }} />
						<span style={{ '--i': '5' }} />
						<span style={{ '--i': '6' }} />
					</div>
				</div>
				<div className={`${styles.wrapper} ${styles.wrapper2}`}>
					<div className={styles.gear}>
						<span style={{ '--i': '1' }} />
						<span style={{ '--i': '2' }} />
						<span style={{ '--i': '3' }} />
						<span style={{ '--i': '4' }} />
						<span style={{ '--i': '5' }} />
						<span style={{ '--i': '6' }} />
					</div>
				</div>
			</div>
		</div>
	);
};
