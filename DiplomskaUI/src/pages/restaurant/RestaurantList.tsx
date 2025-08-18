// src/components/restaurant/RestaurantList.tsx
import React from 'react';
import RestaurantCard from "./RestaurantCard";
import { RestaurantResponse } from '../../api/generated/model/restaurant-response';

interface Props {
    restaurants: RestaurantResponse[];
}

const RestaurantList: React.FC<Props> = ({ restaurants }) => {
    return (
        <div className="restaurant-list">
            {restaurants?.map((restaurant) => (
                <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    allRestaurants={restaurants}
                />
            ))}
        </div>
    );
};

export default React.memo(RestaurantList);
