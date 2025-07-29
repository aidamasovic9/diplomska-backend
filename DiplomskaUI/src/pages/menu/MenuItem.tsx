import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import "../../styles/MenuItem.css";
import Button from "@mui/material/Button";
import {Add} from "@mui/icons-material";
import {CardActions} from "@mui/material";
import {useDispatch} from "react-redux";
import {addItem} from "../../context/store/cartSlice.ts";
import { MealResponse } from '../../api/generated/model/meal-response.ts';

type MenuItemPageProps = {
    item: MealResponse;
};

const MenuItemPage = ({ item }: MenuItemPageProps) => {
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(addItem(item));
    };

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

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