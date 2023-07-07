import style from './search.module.css';
import Navbar from '../navbar/navbar';
const Search = (props) => {
    const {
        handleChange,
        handleGenderChange,
        handleSrcChange,
        handleOrderChange,
        handleSubmitSearchName,
        allGenres
    } = props;

    return (
        <div className={style.searchContainer}>
            <div style={{ display: 'inline-flex' }}>
                <label>filter by Genre: </label>
                <select
                    name='source'
                    onChange={handleGenderChange}
                    className={style.searchSelectGenre}
                >
                    {
                        allGenres.map((genres, i) => {
                            return <option value={genres.name} key={i}>{genres.name}</option>
                        })
                    }
                </select>
            </div>
            <div>
                <form onSubmit={handleSubmitSearchName}>
                    <input
                        type='text'
                        onChange={handleChange}
                        className={style.searchInput}
                    />
                    <button
                        type='submit'
                        className={style.searchButton}
                    >Buscar</button>
                </form>
            </div>
            <div>

                <label>filter by source: </label>
                <select
                    name='source'
                    onChange={handleSrcChange}
                    className={style.searchSelectSmall}
                >
                    <option value='api'>Api</option>
                    <option value='db'>BD</option>
                </select>

                <label>order by: </label>
                <select
                    name='source'
                    onChange={handleOrderChange}
                    className={style.searchSelectSmall}
                >
                    <option value='asc'>Asc</option>
                    <option value='desc'>Desc</option>
                    <option value='rate'>Rating</option>
                    <option value='alphabetical'>alphabetical</option>
                </select>
            </div>
        </div>
    )
}

export default Search;