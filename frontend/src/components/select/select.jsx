import styles from './select.module.css';

export const Select = ({ children, className, ...props }) => (
	<select  className={`${styles.select} ${className || ''}`} {...props}>
		{children}
	</select>
);
