import style from './NotResults.module.css';

const NotResults = () => {
    return (
        <div className={style.notResultsContainer}>
            <h1>Results not Found </h1>
            <p>Any results were found</p>
        </div>
    );
}

export default NotResults;