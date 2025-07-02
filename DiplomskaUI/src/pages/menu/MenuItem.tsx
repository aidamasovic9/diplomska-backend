import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import "../../styles/MenuItem.css";
import Button from "@mui/material/Button";
import {Add} from "@mui/icons-material";
import {CardActions} from "@mui/material";
import {useDispatch} from "react-redux";
import {addItem} from "../../context/store/cartSlice.ts";

interface Props {
    item: {
        id: string,
        image: string,
        title: string,
        description: string,
    };
}

const MenuItemPage: React.FC<Props> = (props: Props) => {
    const {item} = props;
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addItem(item));
    };

    return <>
        <Card className="menuItemCard">
            <CardMedia
                component="img"
                className="menuItemCardMedia"
                image={item.image}
                alt="restaurant image"
            />
            <CardContent className="menuItemCardContent">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
            </CardContent>
            <CardActions className="menuItemCardAction">
                <Button className="menuItemSelectButton" variant="contained" onClick={handleAddToCart}>
                    <Add/>
                    <div>Add</div>
                </Button>
            </CardActions>
        </Card>
    </>

};

export default MenuItemPage;