import styles from './pagination.module.css';
export const Pagination = ({ page, lastPage, setCurrentPage }) => (
	<div className={styles.pagination}>
		<button
			disabled={page === 1}
			className={styles.firstPage}
			onClick={() => setCurrentPage(1)}
		/>
		<button
			disabled={page === 1}
			className={styles.prewPage}
			onClick={() => setCurrentPage(page - 1)}
		/>
		<div className={styles.currentPage}>
			Страница: {page} из {lastPage}
		</div>
		<button
			disabled={page === lastPage}
			className={styles.nextPage}
			onClick={() => setCurrentPage(page + 1)}
		/>
		<button
			disabled={page === lastPage}
			className={styles.lastPage}
			onClick={() => setCurrentPage(lastPage)}
		/>
	</div>
);
