import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../button/button';
import {
	selectModalIsOpen,
	selectModalOnConfirm,
	selectModalRestText,
} from '../../selectors';
import { setNoScroll } from '../../utils';
import styles from './modal.module.css';
import { CLOSE_MODAL } from '../../actions';

export const Modal = () => {
	const isOpen = useSelector(selectModalIsOpen);
	const onConfirm = useSelector(selectModalOnConfirm);
	const restModalText = useSelector(selectModalRestText);

	const dispatch = useDispatch();

	const onCloseModal = () => {
		dispatch(CLOSE_MODAL);
		setNoScroll(false);
	};
	const onModalConfirm = () => {
		onCloseModal();
		onConfirm();
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className={styles.modal}>
			<div className={styles.modalBox}>
				<h2>Вы уверены, что хотитеудалить {restModalText}?</h2>
				<div className={styles.modalButtons}>
					<Button addClass="redButton" onClick={onModalConfirm}>
						Да, удалить!
					</Button>
					<Button addClass="greenButton" onClick={onCloseModal}>
						Нет, отменить!
					</Button>
				</div>
			</div>
		</div>
	);
};
