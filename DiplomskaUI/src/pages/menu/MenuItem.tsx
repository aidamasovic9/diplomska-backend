import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import "../../styles/MenuItem.css";
import Button from "@mui/material/Button";
import {Add} from "@mui/icons-material";
import {CardActions, Rating} from "@mui/material";
import {useDispatch} from "react-redux";
import {addItem} from "../../context/store/cartSlice.ts";
import { MealResponse } from '../../api/generated/model/meal-response.ts';
import {useState} from "react";
import {Meal} from "../../api";
import {prepareMealRatingRequest} from "../../util.ts";
import {useAuth} from "../../context/AuthProvider.tsx";

type MenuItemPageProps = {
    initialItem: MealResponse;
};

const MenuItemPage = ({ initialItem }: MenuItemPageProps) => {
    const dispatch = useDispatch();
    const [item, setItem] = useState<MealResponse>(initialItem);
    const { userId } = useAuth();
    const handleAddToCart = () => {
        dispatch(addItem(item));
    };
    const [hoverRating, setHoverRating] = useState(-1);

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const handleRatingChange = async (_event: React.SyntheticEvent<Element, Event>, value: number | null) => {
        if (value !== null && item.id && userId) {
            try {
                // Submit rating to the backend
                const response =
                    await Meal.submitMealRating(item.id, prepareMealRatingRequest(userId, value));

                setItem(prev => ({
                    ...prev,
                    avgRating: response.data.averageRating
                }));
            } catch (error) {
                console.error("Failed to submit rating", error);
            }
        }
    };

    return (
        <Card className="menuItemCard">
            <CardMedia
                component="img"
                className="menuItemCardMedia"
                image={`${baseUrl}/images/${item.image}`}
                alt="restaurant image"
            />
            <CardContent className="menuItemCardContent">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <Rating
                    name={`meal-rating-${item.id}`}
                    value={item.avgRating}
                    onChange={handleRatingChange}
                    onChangeActive={(_, newHover) => setHoverRating(newHover)}
                />
                <div>{hoverRating !== -1 ? hoverRating : item.avgRating} / 5</div>
            </CardContent>
            <CardActions className="menuItemCardAction">
                <Button className="menuItemSelectButton" variant="contained" onClick={handleAddToCart}>
                    <Add/>
                    <div>Add</div>
                </Button>
            </CardActions>
        </Card>
    );
};

export default MenuItemPage;