import './App.css'
import Home from "./pages/Home.tsx";
import Header from "./pages/Header.tsx";
import Footer from "./pages/Footer.tsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchFastOrders} from "../src/context/store/fastOrdersSlice.ts";
import {fetchOrder} from "../src/context/store/orderSlice.ts";
import {fetchFavoriteUsers} from "../src/context/store/favoriteUsersSlice.ts";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFastOrders('1') as any);
        dispatch(fetchOrder("1") as any);
        dispatch(fetchFavoriteUsers("1") as any);
    }, [dispatch]);

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
