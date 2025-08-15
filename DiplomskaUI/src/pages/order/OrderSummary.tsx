import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../src/context/store/store.ts";
import { removeItem } from "../../../src/context/store/cartSlice.ts";
import Button from "@mui/material/Button";
import {
    Alert, AlertColor,
    AlertPropsColorOverrides,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField
} from "@mui/material";
import {Field, Form} from "react-final-form";
import { Order } from '../../../src/api';
import { OrderFormValues, prepareOrderRequest } from '../../../src/util.ts';
import { useState } from "react";
import { ShiftResponse } from '../../../src/api/generated/model/shift-response.ts';
import { OverridableStringUnion } from '@mui/types';
import { addOrder } from "../../../src/context/store/orderSlice.ts";
import UserSelect from "../../../src/pages/user/UserSelect.tsx";
import {useAuth} from "../../context/AuthProvider.tsx";

interface OrderSummaryProps {
    restaurantId: string | undefined;
    shifts: ShiftResponse[] | undefined;
    fastOrder?: boolean
    groupDinner?: boolean
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ restaurantId, shifts, fastOrder, groupDinner }) => {
    const cartItem = useSelector((state: RootState) => state.cart.item);
    const dispatch = useDispatch();
    const [showSnackbarMessage, setShowSnackbarMessage] = useState(false);
    const [severity, setSeverity] = useState<OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined>(undefined);
    const [message, setMessage] = useState('');
    const [submitType, setSubmitType] = useState<"normal" | "fast">("normal");
    const { userId } = useAuth();

    const showAlert = (severity: AlertColor, message: string) => {
        setSeverity(severity);
        setMessage(message);
        setShowSnackbarMessage(true);
    }

    const onSubmit = async (values: OrderFormValues, form: any) => {
        let success: boolean;
        if (submitType === "normal") {
            success = await createOrder(values);
        } else {
            success = await createFastOrder(values);
        }

        if (success) {
            dispatch(removeItem());
            form.reset();
        }
    };

    const createOrder = async (values: OrderFormValues) => {
        if (cartItem && restaurantId) {
            const response =
                await Order.createOrder(String(values.user.id), prepareOrderRequest(values, cartItem, restaurantId));
            if (response.status === 200) {
                showAlert("success", "Successfully created an order");
                dispatch(addOrder(response.data));
                return true;
            } else {
                showAlert("error", "Failed to create an order");
            }
        }
        return false;
    }

    const createFastOrder = async (values: OrderFormValues) => {
        if (cartItem && restaurantId && userId) {
            const response = await Order.createFastOrder(userId, prepareOrderRequest(values, cartItem, restaurantId));
            if (response.status === 200) {
                showAlert("success", "Successfully saved a fast order");
                return true;
            } else {
                showAlert("error", "Failed to create a fast order");
            }
        }
        return false;
    }

    return (
        <div className={`cartDiv ${groupDinner ? 'no-fixed' : ''}`}>
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
                                            {shifts?.map((shift) => (
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
                            {!fastOrder && <Field name="user">
                                {({ input }) => (
                                    <UserSelect
                                        value={input.value}
                                        onChange={input.onChange}
                                        label="Order for User"
                                    />
                                )}
                            </Field>
                            }
                            {!fastOrder && <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={() => setSubmitType("normal")}>
                                Submit Order
                            </Button>
                            }
                            {fastOrder && <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={() => setSubmitType("fast")}>
                                Add fast Order
                            </Button>
                            }
                        </form>
                    )}
                />
            ) : (
                <p>No item in cart</p>
            )}
            <Snackbar
                open={showSnackbarMessage}
                autoHideDuration={6000}
                onClose={() => setShowSnackbarMessage(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setShowSnackbarMessage(false)}
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%', zIndex: 1300, top: 120}}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default OrderSummary;
