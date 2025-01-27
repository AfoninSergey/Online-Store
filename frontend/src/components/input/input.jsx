import styles from './input.module.css';

export const Input = ({ id, label, className, ...props }) => (
	<>
		{label && (
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
		)}
		<input id={id} className={`${styles.input} ${className || ''}`} {...props} />
	</>
);
