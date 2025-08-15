import './App.css'
import Home from "./pages/Home.tsx";
import Header from "./pages/Header.tsx";
import Footer from "./pages/Footer.tsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchFastOrders} from "../src/context/store/fastOrdersSlice.ts";
import {fetchOrder} from "../src/context/store/orderSlice.ts";
import {fetchFavoriteUsers} from "../src/context/store/favoriteUsersSlice.ts";
import LoginPage from "../src/pages/LoginPage.tsx";
import {useAuth} from "../src/context/AuthProvider.tsx";

function App() {
    const dispatch = useDispatch();
    const { token, userId } = useAuth();

    // Always call hooks here
    useEffect(() => {
        if (userId) {
            dispatch(fetchFastOrders(userId) as any);
            dispatch(fetchOrder(userId) as any);
            dispatch(fetchFavoriteUsers(userId) as any);
        }
    }, [dispatch, userId]);

    if (!token) {
        return <LoginPage />;
    }

    return (
        <div>
            <Header />
            <main className="main-content">
                <Home />
            </main>
            <Footer />
        </div>
    );
}

export default App
