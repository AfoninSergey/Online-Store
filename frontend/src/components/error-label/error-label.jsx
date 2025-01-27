import { useDispatch, useSelector } from 'react-redux';
import { setSuccessInfo } from '../../actions';
import { selectSuccessInfo } from '../../selectors';

import styles from './error-label.module.css';

export const ErrorLabel = ({ children }) => {
	const succesMessage = useSelector(selectSuccessInfo);
	const dispatch = useDispatch();

	return (
		<div
			className={`${styles.errorLabel} ${succesMessage ? styles.succes : ''}`}
		>
			{children}
			{succesMessage && (
				<button onClick={() => dispatch(setSuccessInfo(null))}>×</button>
			)}
		</div>
	);
};
