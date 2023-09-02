import styles from './pagination.module.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    const pages = (totalPages === 0) ? 1 : totalPages;
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }
    return (
        <div className={styles.pagContainer}>
            <span
                className={styles.pagItem}
                onClick={() => onPageChange(currentPage, 'left')}
            >&laquo;
            </span>
            {pageNumbers.map((number) => (
                <span
                    key={number}
                    className={currentPage === number ? styles.active : styles.pagItem}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </span>
            ))}
            <span
                className={styles.pagItem}
                onClick={() => onPageChange(currentPage, 'rigth')}
            >&raquo;
            </span>
        </div>
    )
}

export default Pagination;