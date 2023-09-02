import style from './search.module.css';
const Search = (props) => {
    const {
        handleChange,
        handleGenderChange,
        handleSrcChange,
        handleOrderChange,
        handleSortChange,
        handleSubmitSearchName,
        allGenres
    } = props;

    return (
        <div className={style.searchContainer}>
            <div style={{ display: 'inline-flex' }}>
                <label>Genre: </label>
                <select
                    name='source'
                    onChange={handleGenderChange}
                    className={style.searchSelectGenre}
                >
                    <option value="" key="0">genre..</option>
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
                        placeholder='Introduce name..'
                    />
                    <button
                        type='submit'
                        className={style.searchButton}
                    >Buscar</button>
                </form>
            </div>
            <div>

                <label>Source: </label>
                <select
                    name='source'
                    onChange={handleSrcChange}
                    className={style.searchSelectSmall}
                >
                    <option value="" key="0">source..</option>
                    <option value='api'>Api</option>
                    <option value='db'>BD</option>
                </select>

                <label>Order: </label>
                <select
                    name='source'
                    onChange={handleOrderChange}
                    className={style.searchSelectSmall}
                >
                    <option value="" key="0">order by..</option>
                    <option value='rating'>Rating</option>
                    <option value='name'>name</option>
                </select>
                <labe>Sort:</labe>
                <select
                    name='order'
                    onChange={handleSortChange}
                    className={style.searchSelectSmall}
                >
                    <option value="" key="0">sort..</option>
                    <option value='asc'>Asc</option>
                    <option value='desc'>Desc</option>
                </select>
            </div>
        </div>
    )
}

export default Search;