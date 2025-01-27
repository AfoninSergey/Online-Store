import { Input } from '../input/input';
import styles from './search-panel.module.css';

export const SearchPanel = ({ children, placeholder, value, onChange }) => (
	<section className={styles.searchPanel}>
		<Input
			id="search"
			label={
				<img
					src="../pictures/icons/search.png"
					alt="🔍"
					className={styles.searchImage}
				/>
			}
			type="text"
			placeholder={placeholder}
			className={styles.searchInput}
			value={value}
			onChange={onChange}
		/>
		{children && <div className={styles.sortingBlock}>{children}</div>}
	</section>
);
