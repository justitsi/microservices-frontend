import styles from './Navbar.module.scss';
import CONSTANTS from './../../modules/CONSTANTS.json';
import { Link } from "react-router-dom";


const Navbar = (props) => {
    return (
        <div>
            <ul className={styles.ul}>
                <li className={styles.li}>
                    <Link to={'/'}>
                        Homepage
                    </Link>
                </li>
                {(!props.loggedIn) &&
                    <li className={styles.li}>
                        <Link to={'/login'}>
                            Login
                        </Link>
                    </li>
                }
                {(props.loggedIn) &&
                    <li className={styles.li}>
                        <Link to={'/logout'}>
                            Logout
                        </Link>
                    </li>
                }
                <li className={styles.li}>
                    <Link to={'/user'}>
                        User
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link to={'/images'}>
                        Images
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;