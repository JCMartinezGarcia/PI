import Card from "../card/card";
import style from './cards.module.css';
const Cards = ({ allVideoGames }) => {
    const listVideoGames = allVideoGames;

    return (
        <div className={style.cardsContainer}>
            {
                (listVideoGames)?.map((game, index) => {
                    return <Card key={index} videoGame={game} />
                })
            }
        </div>
    )
}

export default Cards;