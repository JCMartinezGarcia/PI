import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useParams, Link } from 'react-router-dom/';
import axios from 'axios';
import styles from './Detail.module.css';
/**utils */
import { cleanText } from '../utils/utils';

const Detail = () => {
    /**get the id in url*/
    const { id } = useParams();
    const URL = `http://localhost:3001/videogames/${id}`;
    /**local state */
    const [gameDetail, setGameDetail] = useState({});
    const [genre, setGenre] = useState([{}]);
    const [platform, setPlatform] = useState([{}]);
    const [displayGenres, setDisplayGenres] = useState(false);
    const [displayPlatform, setDisplayPlatform] = useState(false);
    const [rateStars, setRateStars] = useState([]);
    /**on mount component execute the following */
    useEffect(async () => {
        async function getGameById() {
            try {
                const { data } = await axios.get(URL, { params: { source: 'api' } });
                console.log(data);
                setGameDetail(data[0]);
                setRateStars(ratingLen(data[0].rating));
            } catch (error) {
                console.log(error.message);
            }
        }
        getGameById();
    }, [id]);

    const { description, genres, image, name, released, platforms, source } = gameDetail;
    const detailId = gameDetail.id;
    const handleGenres = () => {
        if (displayGenres) {
            setDisplayGenres(false);
            setGenre([{}]);
        } else {
            setDisplayGenres(true);
            setGenre(genres);
        }
    }

    const handlePlatforms = () => {
        if (displayPlatform) {
            setDisplayPlatform(false);
            setPlatform([{}]);
        } else {
            setDisplayPlatform(true);
            setPlatform(platforms);
        }
    }

    const ratingLen = (rating) => {
        let rate = [];
        for (let i = 0; i <= Math.floor(rating); i++) {
            rate.push(i);
        }
        return rate;
    }

    return (
        <div>
            <header>
                <h1 className={styles.detailHead}>
                    <div style={{ padding: '1rem' }}>
                        <Link to='/home'>
                            <button className={styles.detailHomeButton}><strong>Home</strong></button>
                        </Link>
                    </div>
                    <span className={styles.detailHeadTitle}>Game Details</span>
                </h1>
            </header>

            <section className={styles.mainSection}>

                <div className={styles.detailImage} style={{ backgroundImage: `url(${image})` }}>

                </div>
                <div>
                    <div className={styles.detailInfoCard}>
                        <div>
                            <labe><strong>#:</strong></labe>
                            <p>{detailId}</p>
                        </div>
                        <div>
                            <label><strong>Name:</strong></label>
                            <p>{name}</p>
                        </div>
                        <div className={styles.detailCollapsible}
                            onClick={handleGenres}
                            style={(displayGenres) ? { backgroundColor: '#ccc' } : {}}
                        >
                            <p><strong>Genres</strong></p>
                        </div>
                        <div className={styles.detailContentCollapsible}
                            style={(displayGenres) ? { display: 'block' } : { display: 'none' }}
                        >
                            {
                                genre.map((gen, i) => {
                                    return <p key={i}>{gen.name}</p>
                                })
                            }
                        </div>
                        <div
                            className={styles.detailCollapsible}
                            style={(displayPlatform) ? { backgroundColor: '#ccc' } : {}}
                            onClick={handlePlatforms}
                        >
                            <p><strong>Platforms</strong></p>
                        </div>
                        <div className={styles.detailContentCollapsible}
                            style={(displayPlatform) ? { display: 'block' } : { display: 'none' }}
                        >
                            {
                                (displayPlatform) ? platform.map((plat, i) => { return <p key={i}>{(source === 'api') ? plat.platform.name : plat}</p> }) : ''
                            }
                        </div>
                        <div className={styles.ratingCont}>
                            <label><strong>Rating:</strong></label>
                            <p>
                                {
                                    rateStars?.map((el) => {
                                        return <FaStar />
                                    })
                                }
                            </p>
                        </div>
                        <div>
                            <label><strong>Released Date:</strong></label>
                            <p>{released}</p>
                        </div>
                        <div className={styles.descriptionCont}>
                            <label><strong>Description:</strong></label>
                            <p>{(description) ? cleanText(description) : ''}</p>
                        </div>
                    </div>
                </div>
            </section>
            {
                /* <footer className={styles.detailFooter}>
                    <h1 className={styles.detailFooterInner}></h1>
                </footer>
                */
            }
        </div>
    )
}

export default Detail;