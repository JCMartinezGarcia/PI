import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import style from './card.module.css';

function Card({ videoGame }) {
    const {
        name,
        description,
        platforms,
        image,
        genres,
        rating,
        released,
        id
    } = videoGame;
    const [ratingStar, setRatingStar] = useState([]);

    useEffect(() => {
        setRatingStar(ratingLen());
    }, []);

    const ratingLen = () => {
        let rate = [];
        for (let i = 0; i <= Math.floor(rating); i++) {
            rate.push(i);
        }
        return rate;
    }

    return (
        <div style={{ padding: '6px' }}>
            <Link to={`/detail/${id}`}>
                <div className={`${style.cardContainer} ${style.cardImage}`} style={{ backgroundImage: `url(${image})` }}>
                </div>
            </Link>
            <p>
                <span className={style.cardName}>{name}</span>
            </p>
            <div className={style.ratingCont}>
                {
                    ratingStar?.map((el) => {
                        return <FaStar />
                    })
                }
            </div>
        </div>
    )
}

export default Card;