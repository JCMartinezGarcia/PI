import { useEffect } from 'react';
import style from './navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {

   

    return (


        <div>
            <ul className={style.ulNavbar}>
                <li className={`${style.liNavbar} ${style.liStyle}`}><a href='#'><span>Home</span></a></li>
                <Link to="/create">
                    <li className={`${style.liNavbar} ${style.liStyle}`}><span>Create Video Game</span></li>
                </Link>
            </ul>
        </div>
    )
}

export default Navbar;