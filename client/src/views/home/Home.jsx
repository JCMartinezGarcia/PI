import style from './Home.module.css';
import Cards from '../../components/cards/cards';
import Search from '../../components/searchbar/search';
import Pagination from '../../components/pagination/Pagination';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllVideoGames,
    getVideoGameByName,
    getAllGenres,
    getAllPlatforms
} from '../../redux/actions';
/**Utils */

const Home = () => {
    /**this are the subscriptions to states */
    const dispatch = useDispatch();
    const allVideoGames = useSelector((state) => state.allvideoGames);
    const allPlatforms = useSelector((state) => state.allPlatforms);
    const allGenres = useSelector((state) => state.allGenres);
    /**this are the local states  */
    const [searchString, setSearchString] = useState("");
    const [filtered, setFiltered] = useState([{}]);
    const [allVideoGamesCopy, setAllVideoGamesCopy] = useState([{}]);
    const [filteredExist, setFilterExist] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [genreFilterValue, setGenreFilterValue] = useState('');
    const [sourceFilterValue, setSourceFilterValue] = useState('');
    const [orderByFilterValue, setOrderByFilterValue] = useState('');
    const [sortByFilterValue, setSortByFilterValue] = useState('');
    const totalElements = 12;
    let totalPages = Math.ceil((allVideoGames.length - 1) / totalElements);
    // Reemplaza con el número total real de páginas
    useEffect(() => {
        dispatch(getAllVideoGames());
        dispatch(getAllGenres());
        dispatch(getAllPlatforms());
        /**if the arr is empty gets in */
        setCurrentPage(1);
    }, []);

    const setSearchFilterValues = (...filters) => {
        const [genre, search, source, order, sort] = filters;
        let objFilters = {}
        if (source) {
            objFilters.source = source;
        }
        if (genre) {
            objFilters.genres = genre;
        }
        if (search) {
            objFilters.search = search;
        }
        if (order) {
            objFilters.ordering = order;
        }
        if (sort) {
            if (order) {
                objFilters.ordering = (sort === 'desc') ? `-${order}` : order;
            }
        }
        return objFilters;
    }

    const handlePageChange = (number, angles = '') => {
        setCurrentPage(number);
        Paginate(number, angles, totalElements);
        // Puedes realizar cualquier búsqueda de datos o actualización necesaria aquí en función del número de página seleccionado
    };
    /**filtro desde la BD */
    const handleChange = (e) => {
        e.preventDefault();
        const { value } = e.target;
        setSearchString(value);
    }

    const handleSubmitSearchName = (e) => {
        e.preventDefault();
        const parameters = setSearchFilterValues(
            genreFilterValue,
            searchString,
            sourceFilterValue,
            orderByFilterValue,
            sortByFilterValue
        );
        dispatch(getVideoGameByName(parameters, true));
        if (filteredExist) {
            setTimeout(() => {
                setFilterExist(false);
                setFiltered([{}]);
            }, 1 * 1000);

        }
        setCurrentPage(1);
    }

    const handleGenderChange = (e) => {
        const { value } = e.target;
        const parameters = setSearchFilterValues(
            value,
            searchString,
            sourceFilterValue,
            orderByFilterValue,
            sortByFilterValue
        );
        setGenreFilterValue(value);
        dispatch(getVideoGameByName(parameters, true));
        if (filteredExist) {
            setTimeout(() => {
                setFilterExist(false);
                setFiltered([{}]);
            }, 1 * 1000);

        }
        setCurrentPage(1);
        /* if (filteredExist) {
             setTimeout(() => {
                 setFilterExist(false);
                 setFiltered([{}]);
             }, 1 * 1000);
 
         }*/
        /*
        let filteredGameList = applyGenderFilter(allVideoGames, {
            genre: value,
            search: searchString,
            source: sourceFilterValue,
            order: orderByFilterValue,
            sort: sortByFilterValue
        });
        setAllVideoGamesCopy(filteredGameList);
        setFiltered(filteredGameList.slice(0, totalElements));
        setCurrentPage(1);
        setFilterExist(true);*/

    }
    const handleSrcChange = (e) => {
        const { value } = e.target;
        const parameters = setSearchFilterValues(
            genreFilterValue,
            searchString,
            value,
            orderByFilterValue,
            sortByFilterValue
        );
        setSourceFilterValue(value);
        dispatch(getVideoGameByName(parameters, true));
        if (filteredExist) {
            setTimeout(() => {
                setFilterExist(false);
                setFiltered([{}]);
            }, 1 * 1000);

        }
        setCurrentPage(1);
    }

    const handleOrderChange = (e) => {
        const { value } = e.target;
        const parameters = setSearchFilterValues(
            genreFilterValue,
            searchString,
            sourceFilterValue,
            value,
            sortByFilterValue
        );
        setOrderByFilterValue(value);
        dispatch(getVideoGameByName(parameters, true));
        if (filteredExist) {
            setTimeout(() => {
                setFilterExist(false);
                setFiltered([{}]);
            }, 1 * 1000);

        }
        setCurrentPage(1);
    }
    const handleSortChange = (e) => {
        const { value } = e.target;
        const parameters = setSearchFilterValues(
            genreFilterValue,
            searchString,
            sourceFilterValue,
            orderByFilterValue,
            value
        );
        setSortByFilterValue(value);
        dispatch(getVideoGameByName(parameters, true));
        if (filteredExist) {
            setTimeout(() => {
                setFilterExist(false);
                setFiltered([{}]);
            }, 1 * 1000);

        }
        setCurrentPage(1);
    }

    const Paginate = (pageNumber = 1, angles = '', numberOfItems) => {
        console.log(filtered);
        let listPaginated;
        let startRange = 0;
        let LimitRange = numberOfItems; /**# of items to show per page */
        let page = pageNumber;
        /**validate if page change ocurred by clicking the left or right arrows and 
         * substract or sum to the current page value depending on the case
         */
        if (angles === 'left' && currentPage > 1) {
            page--;
            setCurrentPage(page);
        } else if (angles === 'rigth' && currentPage < totalPages) {
            page++;
            setCurrentPage(page);
        }
        /**if button page 01 is clicked not using angles. 
         * you get the first 10 items from store global state 
         * */
        if (pageNumber < 2 && angles === '') {
            listPaginated = allVideoGames.filter((game, index) => {
                return index >= startRange && index < LimitRange;
            });
            setFiltered(listPaginated);
            setFilterExist(true);
            return;
        } else {
            /**if page != 1. Get the corresponding 10 elements from redux store global state */
            startRange = (page * totalElements) - totalElements;
            LimitRange = startRange + totalElements;
            startRange = (page === 1) ? startRange : startRange + 1;
            LimitRange = (page === 1) ? LimitRange - 1 : LimitRange;
            listPaginated = allVideoGames.filter((game, index) => {
                return index >= startRange && index <= LimitRange;
            });
            setFiltered(listPaginated);
            setFilterExist(true);
        }
    }
    return (
        <div className={style.homeContainer}>
            <h1 className={style.homeHead}>Home View</h1>
            <Search
                handleChange={handleChange}
                handleGenderChange={handleGenderChange}
                handleSrcChange={handleSrcChange}
                handleOrderChange={handleOrderChange}
                handleSortChange={handleSortChange}
                handleSubmitSearchName={handleSubmitSearchName}
                allGenres={allGenres}
            />
            <div className={style.homeCardsContainer}>
                <div style={{ padding: '1rem' }}>
                    <Link to='/create'>
                        <button className={style.addHomeButton}><strong>Add Game</strong></button>
                    </Link>
                </div>
                <Cards allVideoGames={(filteredExist) ? filtered : allVideoGames.slice(0, totalElements)} />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}

export default Home;