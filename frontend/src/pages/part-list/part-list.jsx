import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorPage } from '../error-page/error-page';
import { Button, Form, InfoBlock, Pagination, SearchPanel } from '../../components';
import { PartItem, PartTitle } from './components';
import {
	selectAccessError,
	selectCombines,
	selectIdForPartUpdating,
	selectIsLoading,
	selectParts,
	selectServerError,
	selectUserRole,
} from '../../selectors';
import {
	checkAccess,
	getChangedObjects,
	getCurrentSortingOrder,
	getPaginationData,
	getZeros,
	search,
	sortByNumber,
} from '../../utils';
import { ERROR_MESSAGE, MAX_ITEMS, ROLE, SORTING_ORDER } from '../../constants';
import styles from './part-list.module.css';
import {
	savePartsDataAsync,
	setAccessError,
	setIdForPartUpdating,
	setIsLoading,
	setParts,
} from '../../actions';

export const PartList = () => {
	const parts = useSelector(selectParts);
	const combines = useSelector(selectCombines);
	const accessError = useSelector(selectAccessError);
	const serverError = useSelector(selectServerError);
	const idForPartUpdating = useSelector(selectIdForPartUpdating);
	const isLoading = useSelector(selectIsLoading);
	const userRole = useSelector(selectUserRole);

	const [currentPage, setCurrentPage] = useState(1);
	const [initialParts, setInitialParts] = useState([]);
	const [partsToDisplay, setPartsToDisplay] = useState([]);
	const [searchString, setSearchString] = useState('');
	const [priceSortingOrder, setPriceSortingOrder] = useState(
		SORTING_ORDER.NOT_APPLIED,
	);

	const dispatch = useDispatch();

	useEffect(() => {
		if (checkAccess([ROLE.ADMIN], userRole)) {
			dispatch(setAccessError(false));
		} else {
			dispatch(setAccessError(ERROR_MESSAGE.ACCESS));
		}
	}, [dispatch, userRole]);

	useEffect(() => {
		if (partsToDisplay.length === 0 && searchString.length === 0) {
			setPartsToDisplay(parts);
		}
		if (initialParts.length === 0) {
			setInitialParts(parts);
		}

		if (idForPartUpdating) {
			const updatedPart = parts.find((part) => part.id === idForPartUpdating);

			let partsWithUpdatedOrDeletedPart = updatedPart
				? initialParts.map((part) =>
						part.id === idForPartUpdating ? updatedPart : part,
					)
				: initialParts.filter((part) => part.id !== idForPartUpdating);
			setInitialParts(partsWithUpdatedOrDeletedPart);

			if (priceSortingOrder !== SORTING_ORDER.NOT_APPLIED) {
				partsWithUpdatedOrDeletedPart = sortByNumber(
					priceSortingOrder,
					partsWithUpdatedOrDeletedPart,
					'price',
				);
			}

			if (searchString.length !== 0) {
				partsWithUpdatedOrDeletedPart = search(
					partsWithUpdatedOrDeletedPart,
					searchString,
					'name',
				);
			}

			setPartsToDisplay(partsWithUpdatedOrDeletedPart);
			dispatch(setIdForPartUpdating(null));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [parts, idForPartUpdating]);

	const onPriceSort = () => {
		const currentSortingOrder = getCurrentSortingOrder(
			priceSortingOrder,
			setPriceSortingOrder,
		);

		let sortedParts = sortByNumber(currentSortingOrder, initialParts, 'price');

		if (searchString.length !== 0) {
			sortedParts = search(sortedParts, searchString, 'name');
		}

		setPartsToDisplay(sortedParts);
	};

	const onSearchString = ({ target: { value } }) => {
		setSearchString(value);

		let foundParts = search(initialParts, value, 'name');

		if (priceSortingOrder !== SORTING_ORDER.NOT_APPLIED) {
			foundParts = sortByNumber(priceSortingOrder, foundParts, 'price');
		}

		const { totalPages } = getPaginationData(
			foundParts,
			MAX_ITEMS.EDIT_PAGE_PARTS,
			currentPage,
		);

		if (currentPage > totalPages) {
			setCurrentPage(1);
		}
		setPartsToDisplay(foundParts);
	};

	const onCancelAllPartsChanges = () => {
		dispatch(setParts(initialParts));
		setPartsToDisplay(initialParts);
		setPriceSortingOrder(SORTING_ORDER.NOT_APPLIED);
		setSearchString('');
	};

	const onSaveAllPartsChanges = () => {
		dispatch(setIsLoading(true));

		const arrayOfChangedParts = getChangedObjects(initialParts, parts);

		dispatch(savePartsDataAsync(arrayOfChangedParts)).then(
			({ updatedSuccessfully }) => {
				if (updatedSuccessfully) {
					setInitialParts(parts);

					let updatedParts = parts;
					if (priceSortingOrder !== SORTING_ORDER.NOT_APPLIED) {
						updatedParts = sortByNumber(
							priceSortingOrder,
							updatedParts,
							'price',
						);
					}
					if (searchString.length !== 0) {
						updatedParts = search(updatedParts, searchString, 'name');
					}

					setPartsToDisplay(updatedParts);
				}
				dispatch(setIsLoading(false));
			},
		);
	};

	const {
		list: partsList,
		isPagination,
		totalPages,
	} = getPaginationData(partsToDisplay, MAX_ITEMS.EDIT_PAGE_PARTS, currentPage);

	const isCancelButtonDisabled =
		JSON.stringify(
			initialParts.map((part) => ({
				...part,
				quantity: +part.quantity,
				price: getZeros(part.price),
			})),
		) ===
		JSON.stringify(
			parts.map((part) => ({
				...part,
				quantity: +part.quantity,
				price: getZeros(part.price),
			})),
		);

	const isSaveButtonDisabled =
		isCancelButtonDisabled || parts.some(({ price }) => isNaN(price));

	if (accessError && !isLoading) return <ErrorPage>{accessError}</ErrorPage>;
	return (
		<div className={styles.partList}>
			<SearchPanel
				placeholder="Поиск запчастей по наименованию..."
				value={searchString}
				onChange={onSearchString}
			>
				<Button
					addClass="smallButton"
					sort={priceSortingOrder}
					onClick={onPriceSort}
				>
					По стоимости
				</Button>
			</SearchPanel>
			<div className={styles.parts}>
				{partsList.length === 0 && (
					<InfoBlock>Запчасти не найдены...</InfoBlock>
				)}
				{partsList.length !== 0 && (
					<Form
						title="Редактировать:"
						className={styles.editPartsForm}
						errorMessage={serverError}
					>
						{partsList.length !== 0 && <PartTitle />}
						{partsList.map((part) => (
							<PartItem
								key={part.id}
								id={part.id}
								part={part}
								combines={combines}
							/>
						))}
						<div className={styles.partsButtons}>
							<Button
								addClass="greenButton"
								disabled={isSaveButtonDisabled}
								onClick={onSaveAllPartsChanges}
							>
								Сохранить всё!
							</Button>
							<Button
								addClass="yellowButton"
								disabled={isCancelButtonDisabled}
								onClick={onCancelAllPartsChanges}
							>
								Отменить всё!
							</Button>
						</div>
					</Form>
				)}
				{isPagination && (
					<Pagination
						page={currentPage}
						lastPage={totalPages}
						setCurrentPage={setCurrentPage}
					/>
				)}
			</div>
		</div>
	);
};
