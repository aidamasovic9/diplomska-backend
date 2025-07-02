import '../../styles/RestaurantCard.css';
import ShiftDetailsComponent from "./ShiftDetails.tsx";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea} from "@mui/material";
import * as React from "react";
import MainOrderPage from "../menu/MainOrderPage.tsx";
import Button from "@mui/material/Button";

interface RestaurantCardProps {
    name: string;
    description: string;
    image: string;
    sections: {
        title: string;
        food: {
            id: string;
            image: string;
            title: string;
            description: string;
        }[];
        Icon: React.ElementType;
    }[];
    shifts: {
        title: string;
        content: string;
        isFull: boolean;
        personImage?: string;
    }[];
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ name, description, image, shifts, sections }) => {
    const [open, setOpen] = React.useState(false);

    const handleOpenRestaurant = () => setOpen((currentState) => !currentState);

    return (
        <>
        <Card className="card">
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="restaurant image"
                />
                <CardContent className="content">
                    <Button className="select-button" onClick={handleOpenRestaurant}>Select</Button>
                    <div className="text-container">
                    <h2>{name}</h2>
                    <p>{description}</p>
                    </div>
                    <ShiftDetailsComponent shifts={shifts} />
                </CardContent>
            </CardActionArea>
        </Card>
        <MainOrderPage open={open} handleClose={handleOpenRestaurant} sections={sections}/>
        </>
    );
};

export default RestaurantCard;
