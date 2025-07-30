import '../styles/Footer.css';
import FastOrdersSection from '../../src/pages/FastOrdersSection.tsx';

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="logo-container">
                <h1 className="footer-title">FAST ORDERS</h1>
            </div>
            <FastOrdersSection />
        </footer>
    );
};

export default Footer;
