import styles from './part-title.module.css';
export const PartTitle = () => (
	<div className={styles.partsTitle}>
		<span className={styles.partArticle}>Артикул:</span>
		<span className={styles.partName}>Наименование:</span>
		<span className={styles.partQuantity}>Шт.:</span>
		<span className={styles.partPrice}>Цена:</span>
		<span className={styles.partPhoto}>Фото:</span>
		<span className={styles.partCombine}>Комбайн:</span>
	</div>
);
