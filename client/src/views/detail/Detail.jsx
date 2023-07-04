import styles from './Detail.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/';
import axios from 'axios';
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
    /**on mount component execute the following */
    useEffect(async () => {
        async function getGameById() {
            try {
                const { data } = await axios.get(URL, { params: { source: 'api' } });
                setGameDetail(data[0]);
            } catch (error) {
                console.log(error.message);
            }
        }
        getGameById();
    }, [id]);

    const { description, genres, image, name, rating, released, platforms } = gameDetail;
    const detailId = gameDetail.id;
    /**general functions */


    /**Handlers funtions */
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

    return (
        <div>
            <header>
                <h1 className={styles.detailHead}>
                    <span className={styles.detailHeadTitle}>Game Details</span>
                </h1>
            </header>

            <section className={styles.mainSection}>
                <div className={styles.detailImage} style={{ backgroundImage: `url(${image})` }}>
                    <h2 className={styles.detailTitle}>{name}</h2>
                </div>
                <div className={styles.detailInfo}>
                    <div className={styles.detailInfoCard}>
                        <p># : {detailId}</p>
                        <div className={styles.detailCollapsible}
                            onClick={handleGenres}
                            style={(displayGenres) ? { backgroundColor: '#ccc' } : {}}
                        >
                            <p>Genres</p>
                        </div>
                        <div className={styles.detailContentCollapsible}
                            style={(displayGenres) ? { display: 'block' } : { display: 'none' }}
                        >
                            {
                                genre.map((gen) => {
                                    return <p>{gen.name}</p>
                                })
                            }
                        </div>
                        <div
                            className={styles.detailCollapsible}
                            style={(displayPlatform) ? { backgroundColor: '#ccc' } : {}}
                            onClick={handlePlatforms}
                        >
                            <p>Platforms</p>
                        </div>
                        <div className={styles.detailContentCollapsible}
                            style={(displayPlatform) ? { display: 'block' } : { display: 'none' }}
                        >
                            {
                                (displayPlatform) ? platform.map((plat, i) => { return <p key={i}>{plat.platform.name}</p> }) : ''
                            }
                        </div>
                        <p>Rating : {rating}</p>
                        <p>Released : {released}</p>
                        <p>Description:</p>
                        <p>{(description) ? cleanText(description) : ''}</p>
                    </div>
                </div>
            </section>
            <footer className={styles.detailFooter}>
                <h1 className={styles.detailFooterInner}></h1>
            </footer>
        </div>
    )
}

export default Detail;