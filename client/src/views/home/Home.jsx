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
import { isNotEmptyArr } from '../utils/utils';

const Home = () => {
    const dispatch = useDispatch();
    const allVideoGames = useSelector((state) => state.allvideoGames);
    const allPlatforms = useSelector((state) => state.allPlatforms);
    const allGenres = useSelector((state) => state.allGenres);
    const [searchString, setSearchString] = useState("");
    const [filtered, setFiltered] = useState([{}]);
    const [filteredExist, setFilterExist] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const totalElements = 15;
    let totalPages = Math.ceil((allVideoGames.length - 1) / totalElements); // Reemplaza con el número total real de páginas

    useEffect(() => {
        dispatch(getAllVideoGames());
        dispatch(getAllGenres());
        dispatch(getAllPlatforms());
        /**if the arr is empty gets in */
    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1);
        /**if the arr is empty gets in */
    }, []);


    const handlePageChange = (number, angles = '') => {
        setCurrentPage(number);
        Paginate(number, true, angles);
        // Puedes realizar cualquier búsqueda de datos o actualización necesaria aquí en función del número de página seleccionado
    };
    /**filtro desde la BD */
    const handleChange = (e) => {
        e.preventDefault();
        const { value } = e.target;
        setSearchString(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getVideoGameByName(searchString));
    }

    const handleGenderChange = (e) => {
        const { value } = e.target;
        let filt;
        let startRange = 0;
        let LimitRange = 0;
        if (currentPage === 1) {
            filt = allVideoGames.slice(0, 14).filter((game, i) => {
                for (let index = 0; index < game.genres.length; index++) {
                    if (game.genres[index].name.includes(value)) {
                        return game;
                    }
                }
            });
        } else {
            startRange = (currentPage * totalElements) - totalElements;
            LimitRange = startRange + totalElements;
            filt = allVideoGames.slice(startRange, LimitRange).filter((game, i) => {
                for (let index = 0; index < game.genres.length; index++) {
                    if (game.genres[index].name.includes(value)) {
                        return game;
                    }
                }
            });
        }
        setFiltered(filt);
        setFilterExist(true);
    }
    const handleSrcChange = (e) => {
        const { value } = e.target;
        let startRange = 0;
        let LimitRange = 0;
        let filt;

        if (currentPage === 1) {
            startRange = (currentPage * totalElements) - totalElements;
            LimitRange = startRange + totalElements;
            filt = allVideoGames.slice(0, 14).filter((game, i) => {
                return game.source === value;
            });
        } else {
            startRange = (currentPage * totalElements) - totalElements;
            LimitRange = startRange + totalElements;
            filt = allVideoGames.slice(startRange, LimitRange).filter((game, i) => {
                return game.source === value;
            });
        }
        setFiltered(filt);
        setFilterExist(true);
    }

    const handleOrderChange = (e) => {
        const { value } = e.target;
        let startRange = 0;
        let LimitRange = 0;
        let filt;

        switch (value) {
            case 'asc':
                if (currentPage === 1) {
                    filt = allVideoGames.slice(0, 14).sort((a, b) => {
                        return a.id - b.id
                    });
                } else {
                    startRange = (currentPage * totalElements) - totalElements;
                    LimitRange = startRange + totalElements;
                    filt = allVideoGames.slice(startRange, LimitRange).sort((a, b) => {
                        return a.id - b.id
                    });
                }
                break;
            case 'desc':
                if (currentPage === 1) {
                    filt = allVideoGames.slice(0, 14).sort((a, b) => {
                        return b.id - a.id
                    });

                } else {
                    startRange = (currentPage * totalElements) - totalElements;
                    LimitRange = startRange + totalElements;
                    filt = allVideoGames.slice(startRange, LimitRange).sort((a, b) => {
                        return b.id - a.id
                    });

                }
                break;
            case 'rate':
                if (currentPage === 1) {
                    filt = allVideoGames.slice(0, 14).sort((a, b) => {
                        return b.rating - a.rating
                    });

                } else {
                    startRange = (currentPage * totalElements) - totalElements;
                    LimitRange = startRange + totalElements;
                    filt = allVideoGames.slice(startRange, LimitRange).sort((a, b) => {
                        return b.rating - a.rating
                    });

                }
                break;

            default:
                setFiltered([{}]);
                setFilterExist(false);
                break;
        }
        setFiltered(filt);
        setFilterExist(true);
    }

    const Paginate = (pageNumber = 1, changeEvent = false, angles = '') => {
        let listPaginated;
        let startRange = 0;
        let LimitRange = 14;
        let page = pageNumber;
        if (angles === 'left' && currentPage > 1) {
            page--;
            setCurrentPage(page);
        } else if (angles === 'rigth' && currentPage < totalPages) {
            page++;
            setCurrentPage(page);
        }
        /**if curent page is the first bring the first elements */
        if (currentPage === 1 && !changeEvent) {
            listPaginated = allVideoGames.filter((game, index) => {
                return index >= startRange && index <= LimitRange;
            });
            setFiltered(listPaginated);
            setFilterExist(true);
            return;
        } else if (changeEvent && pageNumber < 2 && angles === '') {

            listPaginated = allVideoGames.filter((game, index) => {
                return index >= startRange && index <= LimitRange;
            });
            setFiltered(listPaginated);
            setFilterExist(true);
            return;
        } else {

            startRange = (page * totalElements) - totalElements;
            LimitRange = startRange + totalElements;
            listPaginated = allVideoGames.filter((game, index) => {
                return index >= startRange + 1 && index <= LimitRange;
            });
            setFiltered(listPaginated);
            setFilterExist(true);
        }
    }


  //  console.log('reference: ', allVideoGames);

    return (
        <div>
            <h1 className={style.homeHead}>Home View</h1>
            <Search
                handleChange={handleChange}
                handleGenderChange={handleGenderChange}
                handleSrcChange={handleSrcChange}
                handleOrderChange={handleOrderChange}
                handleSubmit={handleSubmit}
                allGenres={allGenres}
            />
            <div className={style.homeCardsContainer}>
                <div style={{ padding: '1rem' }}>
                    <Link to='/create'>
                        <button className={style.addHomeButton}><strong>Add Game</strong></button>
                    </Link>
                </div>
                <Cards allVideoGames={(filteredExist) ? filtered : allVideoGames.slice(0, 15)} />
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