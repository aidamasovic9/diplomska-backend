import RestaurantCard from "./restaurant/RestaurantCard.tsx";
import { RestaurantResponse } from '../api/generated/model/restaurant-response.ts';
import {fetchRestaurants} from "../../src/context/store/restaurantSlice.ts";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../src/context/store/store.ts";
import UserDrawer from "../../src/pages/UserDrawer.tsx";


const Home = () => {

    const dispatch = useDispatch();
    const { restaurants, loading, error } = useSelector((state: RootState) => state.restaurants);

    useEffect(() => {
        dispatch(fetchRestaurants("Skopje") as any);
    }, [dispatch]);

    if (loading) return <p>Loading…</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ position: 'relative' }}>
        <div className="restaurant-list">
            {restaurants?.map((restaurant: RestaurantResponse) => (
                <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    allRestaurants={restaurants}
                />
            ))}
        </div>
            <UserDrawer />
        </div>
    );
};

export default Home;
