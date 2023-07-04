import style from './search.module.css';
import Navbar from '../navbar/navbar';
const Search = ({ handleChange, handleSubmit, handleGenderChange, allGenres, handleSrcChange, handleOrderChange }) => {

    return (
        <div className={style.searchContainer}>
            <div>
                <Navbar />
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type='text' onChange={handleChange} />
                    <button type='submit'>Buscar</button>
                </form>
            </div>
            <div>
                <label>filter by Genre: </label>
                <select name='source' onChange={handleGenderChange}>
                    {
                        allGenres.map((genres, i) => {
                            return <option value={genres.name} key={i}>{genres.name}</option>
                        })
                    }
                </select>

                <label>filter by source: </label>
                <select name='source' onChange={handleSrcChange}>
                    <option value='api'>Api</option>
                    <option value='db'>BD</option>
                </select>

                <label>order by: </label>
                <select name='source' onChange={handleOrderChange}>
                    <option value='asc'>Asc</option>
                    <option value='desc'>Desc</option>
                    <option value='rate'>Rating</option>
                </select>
            </div>
        </div>
    )
}

export default Search;