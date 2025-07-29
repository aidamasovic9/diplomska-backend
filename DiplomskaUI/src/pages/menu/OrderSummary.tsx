import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/store/store";
import { removeItem } from "../../context/store/cartSlice";
import Button from "@mui/material/Button";
import {Alert, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField} from "@mui/material";
import {Field, Form} from "react-final-form";
import { Order } from '../../api/index.ts';
import { OrderFormValues, prepareOrderRequest } from '../../../src/util.ts';
import { useState } from "react";
import { ShiftResponse } from '../../api/generated/model/shift-response.ts';

interface OrderSummaryProps {
    restaurantId: string | undefined;
    shifts: ShiftResponse[] | undefined;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ restaurantId, shifts }) => {
    const cartItem = useSelector((state: RootState) => state.cart.item);
    const dispatch = useDispatch();
    const [showSnackbarMessage, setShowSnackbarMessage] = useState(false);

    const onSubmit = async (values: OrderFormValues) => {
        if (cartItem && restaurantId) {
            await Order.createOrder("1", prepareOrderRequest(values, cartItem, restaurantId));
            setShowSnackbarMessage(true);
        }
    };

    return (
        <div className="cartDiv">
            <h2>Order Summary</h2>
            {cartItem ? (
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <h4>{cartItem.name}</h4>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => dispatch(removeItem())}
                                    sx={{ padding: "5px 10px", fontSize: "12px" }}
                                >
                                    Remove
                                </Button>
                            </div>

                            <Field name="shift">
                                {({ input, meta }) => (
                                    <FormControl fullWidth error={meta.touched && meta.error}>
                                        <InputLabel>Shift</InputLabel>
                                        <Select {...input} label="Shift">
                                            {shifts && shifts.map((shift) => (
                                                <MenuItem key={shift.id} value={shift.id}>
                                                    {shift.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="eatInOrTakeAway" >
                                {({ input, meta }) => (
                                    <FormControl fullWidth error={meta.touched && meta.error}>
                                        <InputLabel>Eat In or Takeaway</InputLabel>
                                        <Select {...input} label="Eat In or Takeaway">
                                            <MenuItem value="EAT_IN">Eat In</MenuItem>
                                            <MenuItem value="TAKE_AWAY">Takeaway</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="comment">
                                {({ input }) => (
                                    <TextField
                                        {...input}
                                        label="Comment"
                                        multiline
                                        rows={3}
                                        fullWidth
                                    />
                                )}
                            </Field>
                            <Button type="submit" variant="contained" color="primary">
                                Submit Order
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Add fast Order
                            </Button>
                        </form>
                    )}
                />
            ) : (
                <p>No item in cart</p>
            )}
            <Snackbar open={showSnackbarMessage} autoHideDuration={6000} onClose={() => setShowSnackbarMessage(false)}>
                <Alert
                    onClose={() => setShowSnackbarMessage(false)}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Successfully added order!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default OrderSummary;
