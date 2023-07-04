import styles from './pagination.module.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={styles.pagContainer}>
            <a href="#" className={styles.pagItem}>&laquo;</a>
            {pageNumbers.map((number) => (
                <a
                    key={number}
                    className={currentPage === number ? styles.active : styles.pagItem}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </a>
            ))}
            <a href="#" className={styles.pagItem}>&raquo;</a>
        </div>
    )
}

export default Pagination;