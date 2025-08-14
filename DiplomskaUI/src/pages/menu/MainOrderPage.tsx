import * as React from 'react';
import '../../styles/FoodPage.css';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import {TransitionProps} from "@mui/material/transitions";
import {Slide} from "@mui/material";
import {useEffect, useState} from "react";
import {RestaurantResponse} from "../../../src/api/generated";
import CartBadge from "../../../src/pages/CartBadge.tsx";
import OrderStepContent from "../order/OrderStepContent.tsx";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface FoodPageProps {
    open: boolean;
    handleClose: () => void;
    restaurant: RestaurantResponse;
    allRestaurants: RestaurantResponse[];
    fastOrder?: boolean;
}

const MainOrderPage: React.FC<FoodPageProps> = ({ open, handleClose, restaurant, allRestaurants, fastOrder }) => {

    const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantResponse>(restaurant);

    useEffect(() => {
        if (open) {
            setSelectedRestaurant(restaurant);
        }
    }, [open, restaurant]);

    const handleRestaurantChange = async (restaurantId: string) => {
        const newRestaurant = allRestaurants.find(r => r.id === restaurantId);
        if (newRestaurant) {
            setSelectedRestaurant(newRestaurant);
        }
    };

    return (
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'sticky', backgroundColor: '#040066', top: 0, zIndex: 1200 }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Order
                        </Typography>
                        <CartBadge />
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                            sx={{ marginLeft: 2 }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <OrderStepContent
                    selectedRestaurant={selectedRestaurant}
                    allRestaurants={allRestaurants}
                    fastOrder={fastOrder}
                    onRestaurantChange={handleRestaurantChange}
                />
            </Dialog>
    );
};

export default MainOrderPage;
