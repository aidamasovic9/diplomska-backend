import React, { useState } from 'react';
import {Badge, IconButton, Popover, Typography, Box, Snackbar, Alert} from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "../../src/context/store/store.ts";
import Button from "@mui/material/Button";
import { Order } from '../api/index.ts';
import {clearOrder} from "../../src/context/store/orderSlice.ts";
import {fetchRestaurants} from "../../src/context/store/restaurantSlice.ts";

const StyledBadge = Badge;

const CartBadge = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const order = useSelector((state: RootState) => state.order.order);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const dispatch = useDispatch();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        if (order?.id) {
            await Order.deleteOrder(order.id);
            setShowSnackbar(true);
            handleClose();
            dispatch(clearOrder());
            dispatch(fetchRestaurants("Skopje") as any);
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'cart-popover' : undefined;

    return (
        <>
            <IconButton aria-label="cart" onClick={handleClick} sx={{ color: 'white' }}>
                <StyledBadge badgeContent={order ? 1 : 0}>
                    <ShoppingBagIcon sx={{ color: 'white' }}/>
                </StyledBadge>
            </IconButton>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Box p={2} minWidth={200}>
                    {order ? (
                        <>
                            <Typography variant="subtitle1">Your Order:</Typography>
                            <Typography><strong>Meal:</strong> {order.mealName}</Typography>
                            <Typography><strong>Restaurant:</strong> {order.restaurantName}</Typography>
                            <Typography><strong>Shift:</strong> {order.shiftName}</Typography>
                            {order.comment && (
                                <Typography><strong>Comment:</strong> {order.comment}</Typography>
                            )}
                            <Box mt={2} display="flex" justifyContent="flex-end">
                                <Button variant="outlined" color="error" size="small" onClick={handleDelete}>
                                    Delete Order
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <Typography variant="body2">You have no order.</Typography>
                    )}
                </Box>
            </Popover>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="success" variant="filled" onClose={() => setShowSnackbar(false)}>
                    Order deleted successfully.
                </Alert>
            </Snackbar>
        </>
    );
};

export default CartBadge;
