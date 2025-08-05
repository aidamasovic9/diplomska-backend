import '../styles/Header.css';
import CartBadge from "../../src/pages/CartBadge.tsx";

const Header = () => {
    return (
        <header className="app-header">
            <div className="logo-container">
                <h1 className="app-title">Lunch App</h1>
            </div>
            <CartBadge />
        </header>
    );
};

export default Header;
