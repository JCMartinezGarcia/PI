import styles from './Landing.module.css';
import { Link } from 'react-router-dom';
const Landing = () => {
    return (
        <div className={styles.landingImage}>
            <h1 className={styles.landingHead}></h1>
            <div>
                <div className={styles.landingCard}>
                    <Link to='/home'>
                        <button>Start Game</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Landing;