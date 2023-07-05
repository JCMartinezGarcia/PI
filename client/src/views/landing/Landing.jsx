import styles from './Landing.module.css';
import { Link } from 'react-router-dom';
const Landing = () => {
    return (
        <div>
            <h1 className={styles.landingHead}></h1>
            <div className={styles.landingImage}>
                <div className={styles.landingCard}>
                    <h1>Welcome</h1>
                    <h1>Video Games App</h1>
                    <Link to='/home'>
                        <button>Start Game</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Landing;