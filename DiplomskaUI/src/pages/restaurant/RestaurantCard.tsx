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

const RestaurantCard: React.FC<RestaurantResponse> = ({ name, image, shifts, categories, id }) => {
    const [open, setOpen] = React.useState(false);

    const handleOpenRestaurant = () => setOpen((currentState) => !currentState);

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    return (
        <>
        <Card className="card">
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={`${baseUrl}/images/${image}`}
                    alt="restaurant image"
                />
                <CardContent className="content">
                    <Button className="select-button" onClick={handleOpenRestaurant}>Select</Button>
                    <div className="text-container">
                    <h2>{name}</h2>
                    </div>
                    <ShiftDetailsComponent shifts={shifts} />
                </CardContent>
            </CardActionArea>
        </Card>
                <MainOrderPage
                open={open}
                handleClose={handleOpenRestaurant}
                categories={categories}
                restaurantId={id}
                shifts={shifts} />
        </>
    );
};

export default RestaurantCard;
