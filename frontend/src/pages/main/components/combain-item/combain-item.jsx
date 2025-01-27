import styles from './combain-item.module.css';

export const CombainItem = ({
	addClass,
	id,
	name,
	isCombinesAndParts,
	selectedCombine,
	onSelectCombain,
}) => (
	<li
		className={`
		${styles.combine}
		${styles[addClass]}
		${id === selectedCombine ? styles.active : ''}`}
		onClick={onSelectCombain}
	>
		<div className={styles.combineImage}>
			<img
				src={`./pictures/combines/${id}.jpg`}
				alt={`${!isCombinesAndParts ? 'Фото комбайна' : ''} ${name}`}
			/>
		</div>
		<div className={styles.combineName}>
			{!isCombinesAndParts || id === selectedCombine ? 'Комбайн ' : ''}"{name}"
		</div>
	</li>
);
