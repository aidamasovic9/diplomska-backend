import '../styles/Header.css';
import CartBadge from "../../src/pages/CartBadge.tsx";
import UserBadge from "../../src/pages/user/UserBadge.tsx";
import useFetchCurrentUser from "./useFetchCurrentUser.ts";
import { Link } from 'react-router-dom';

const Header = () => {
    useFetchCurrentUser();

    return (
        <header className="app-header">
            <div className="logo-container">
                <Link to="/" className="app-title-link">
                    <h1 className="app-title">Lunch App</h1>
                </Link>
            </div>
            <div className="header-right">
                <CartBadge/>
                <UserBadge/>
            </div>
        </header>
    );
};

export default Header;