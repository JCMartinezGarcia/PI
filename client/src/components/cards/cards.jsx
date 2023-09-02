/**import components */
import NotResults from "../notFoundResults/NotResults";
import Card from "../card/card";
import style from './cards.module.css';

const Cards = ({ allVideoGames }) => {
    const listVideoGames = allVideoGames;
    return (
        <div
            className={(listVideoGames.length) ? style.cardsContainer : ''}
        >
            {
                (listVideoGames.length) ?
                    (listVideoGames)?.map((game, index) => {
                        return <Card key={index} videoGame={game} />
                    }) : <NotResults />
            }
        </div>
    )
}

export default Cards;