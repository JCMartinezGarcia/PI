import style from './card.module.css';
import { Link } from 'react-router-dom';

function Card({ videoGame }) {
    
    const { name, description, platforms, image, genres, rating, released, id } = videoGame;
    return (
        <div className={`${style.cardContainer} ${style.cardImage}`} style={{ backgroundImage: `url(${image})` }}>
            <p className={style.cardNamePosition}>
                <span >{id}</span>
                <span className={style.cardName}>{name}</span>
                <span >{rating}</span>
            </p>
            <Link to={`/detail/${id}`}>
                <button className={style.cardButton}>Details </button>
            </Link>
        </div>
    )
}

export default Card;