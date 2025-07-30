import RestaurantCard from "./restaurant/RestaurantCard.tsx";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "../context/store/store";
import { useEffect } from "react";
import { fetchRestaurants } from '../context/store/restaurantSlice';
import { RestaurantResponse } from '../api/generated/model/restaurant-response.ts';
import { CircularProgress } from "@mui/material";
import { fetchFastOrders } from "../../src/context/store/fastOrdersSlice.ts";

const Home = () => {

    const dispatch = useDispatch();
    const { restaurants, loading, error } = useSelector((state: RootState) => state.restaurants);

    useEffect(() => {
        dispatch(fetchRestaurants('Skopje') as any);
        dispatch(fetchFastOrders('1') as any);
    }, [dispatch]);

    if (loading) return <CircularProgress />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="restaurant-list">
            {restaurants.map((restaurant: RestaurantResponse) => (
                <RestaurantCard
                    key={restaurant.id}
                    name={restaurant.name}
                    image={restaurant.image}
                    shifts={restaurant.shifts}
                    categories={restaurant.categories}
                    id={restaurant.id}
                />
            ))}
        </div>
    );
};

export default Home;
