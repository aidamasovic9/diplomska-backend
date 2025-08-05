import '../../styles/RestaurantCard.css';
import ShiftDetailsComponent from "./ShiftDetails.tsx";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea} from "@mui/material";
import * as React from "react";
import MainOrderPage from "../menu/MainOrderPage.tsx";
import Button from "@mui/material/Button";
import { RestaurantResponse } from '../../api/generated/model/restaurant-response.ts';
import {fetchRestaurants} from "../../../src/context/store/restaurantSlice.ts";
import {useDispatch} from "react-redux";

interface RestaurantProps {
    restaurant: RestaurantResponse;
    allRestaurants: RestaurantResponse[]
}

const RestaurantCard: React.FC<RestaurantProps> = ({ restaurant, allRestaurants }: RestaurantProps) => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleOpenRestaurant = () => {
        setOpen((currentState) => !currentState);
        if (open) {
            dispatch(fetchRestaurants("Skopje") as any);
        }
    }

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    return (
        <>
        <Card className="card">
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={`${baseUrl}/images/${restaurant.image}`}
                    alt="restaurant image"
                />
                <CardContent className="content">
                    <Button className="select-button" onClick={handleOpenRestaurant}>Select</Button>
                    <div className="text-container">
                    <h2>{restaurant.name}</h2>
                    </div>
                    <ShiftDetailsComponent shifts={restaurant.shifts} />
                </CardContent>
            </CardActionArea>
        </Card>
                <MainOrderPage
                open={open}
                handleClose={handleOpenRestaurant}
                restaurant={restaurant}
                allRestaurants={allRestaurants}/>
        </>
    );
};

export default RestaurantCard;
