import { ErrorLabel } from '../error-label/error-label';
import styles from './form.module.css';

export const Form = ({ children, title, onSubmit, errorMessage, className, addClass}) => (
	<section className={`${styles.form} ${className || ''}`}>
		<h2>{title}</h2>

		<form onSubmit={onSubmit}>
			{errorMessage && <ErrorLabel addClass={addClass}>{errorMessage}</ErrorLabel>}
			{children}
		</form>
	</section>
);
