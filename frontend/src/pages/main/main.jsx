import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { selectCombines, selectParts } from '../../selectors';
import {
	Button,
	InfoBlock,
	Pagination,
	PartItem,
	SearchPanel,
} from '../../components';
import { CombainItem } from './components';
import { MAX_ITEMS, SORTING_ORDER } from '../../constants';
import {
	filterPartsByCombine,
	getCurrentSortingOrder,
	getPaginationData,
	search,
	sortByNumber,
} from '../../utils';

import styles from './main.module.css';

export const Main = () => {
	const combines = useSelector(selectCombines);
	const parts = useSelector(selectParts);
	const navigate = useNavigate();

	const [currentPage, setCurrentPage] = useState(1);
	const [partsToDisplay, setPartsToDisplay] = useState(parts);
	const [searchString, setSearchString] = useState('');
	const [selectedCombine, setSelectedCombine] = useState('');
	const [priceSortingOrder, setPriceSortingOrder] = useState(
		SORTING_ORDER.NOT_APPLIED,
	);

	const isCombinesAndParts = !!useMatch('/parts');

	useEffect(() => {
		setPartsToDisplay(parts);
	}, [parts]);

	const onSelectCombain = (id) => {
		if (!isCombinesAndParts) {
			navigate('/parts');
		}

		let filteredParts = parts;

		if (selectedCombine !== id) {
			setSelectedCombine(id);
			filteredParts = filterPartsByCombine(filteredParts, id);
		} else {
			setSelectedCombine('');
		}

		if (searchString.length !== 0) {
			filteredParts = search(filteredParts, searchString, 'name');
		}

		if (priceSortingOrder !== SORTING_ORDER.NOT_APPLIED) {
			filteredParts = sortByNumber(priceSortingOrder, filteredParts, 'price');
		}

		setCurrentPage(1);
		setPartsToDisplay(filteredParts);
	};

	const onPriceSort = () => {
		const currentSortingOrder = getCurrentSortingOrder(
			priceSortingOrder,
			setPriceSortingOrder,
		);

		let sortedParts = sortByNumber(currentSortingOrder, parts, 'price');

		if (selectedCombine !== '') {
			sortedParts = filterPartsByCombine(sortedParts, selectedCombine);
		}

		if (searchString.length !== 0) {
			sortedParts = search(sortedParts, searchString, 'name');
		}

		setPartsToDisplay(sortedParts);
	};

	const onSearchString = ({ target: { value } }) => {
		setSearchString(value);
		if (!isCombinesAndParts) {
			navigate('/parts');
		}

		let foundParts = search(parts, value, 'name');

		if (selectedCombine !== '') {
			foundParts = filterPartsByCombine(foundParts, selectedCombine);
		}

		if (priceSortingOrder !== SORTING_ORDER.NOT_APPLIED) {
			foundParts = sortByNumber(priceSortingOrder, foundParts, 'price');
		}

		const { totalPages } = getPaginationData(
			foundParts,
			MAX_ITEMS.MAIN_PAGE_PARTS,
			currentPage,
		);

		if (currentPage > totalPages) {
			setCurrentPage(1);
		}

		setPartsToDisplay(foundParts);
	};

	const {
		list: partsList,
		isPagination,
		totalPages,
	} = getPaginationData(partsToDisplay, MAX_ITEMS.MAIN_PAGE_PARTS, currentPage);

	const currentClassname = isCombinesAndParts
		? 'combinesAndParts'
		: 'combinesOnly';

	return (
		<div className={styles.main}>
			<div className={styles.searchBlock}>
				<SearchPanel
					placeholder="Поиск запчастей по наименованию..."
					value={searchString}
					onChange={onSearchString}
				>
					{isCombinesAndParts && (
						<Button
							addClass="smallButton"
							sort={priceSortingOrder}
							onClick={onPriceSort}
						>
							По стоимости
						</Button>
					)}
				</SearchPanel>
				{!isCombinesAndParts && (
					<Link to={'/parts'}>
						<Button
							addClass="smallButton"
							sort={SORTING_ORDER.DESCENDING}
						>
							СПИСОК ЗАПЧАСТЕЙ
						</Button>
					</Link>
				)}
			</div>
			<main className={styles[currentClassname]}>
				<ul className={styles.combines}>
					{combines.map(({ id, name }) => (
						<CombainItem
							addClass={currentClassname}
							key={id}
							id={id}
							name={name}
							isCombinesAndParts={isCombinesAndParts}
							selectedCombine={selectedCombine}
							onSelectCombain={() => onSelectCombain(id)}
						/>
					))}
				</ul>

				{isCombinesAndParts && (
					<div className={styles.parts}>
						<ul className={styles.partsList}>
							{partsList.length === 0 && (
								<InfoBlock>
									По заданным критериям, запчасти не найдены...
								</InfoBlock>
							)}
							{partsList.map(({ id, ...props }) => (
								<PartItem
									addClass="combinesAndParts"
									key={id}
									id={id}
									combines={combines}
									{...props}
								/>
							))}
						</ul>
						{isPagination && (
							<Pagination
								page={currentPage}
								lastPage={totalPages}
								setCurrentPage={setCurrentPage}
							/>
						)}
					</div>
				)}
			</main>
		</div>
	);
};
