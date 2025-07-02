import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/store/store";
import { removeItem } from "../../context/store/cartSlice";
import Button from "@mui/material/Button";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Field, Form} from "react-final-form";

const OrderSummary: React.FC = () => {
    const cartItem = useSelector((state: RootState) => state.cart.item);
    const dispatch = useDispatch();
    const availableShifts = ['11:00', '12:00','13:15'];

    const onSubmit = () => {
        console.log("Submitting order:");
        // Dispatch or call API here
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
                                <span>{cartItem.title}</span>
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
                                            {availableShifts.map((shift) => (
                                                <MenuItem key={shift} value={shift.toLowerCase()}>
                                                    {shift}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="eatInOrTakeaway" >
                                {({ input, meta }) => (
                                    <FormControl fullWidth error={meta.touched && meta.error}>
                                        <InputLabel>Eat In or Takeaway</InputLabel>
                                        <Select {...input} label="Eat In or Takeaway">
                                            <MenuItem value="eat-in">Eat In</MenuItem>
                                            <MenuItem value="takeaway">Takeaway</MenuItem>
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
        </div>
    );
};

export default OrderSummary;
