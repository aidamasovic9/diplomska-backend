import {DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { OrderResponse } from "../../../src/api/generated";

type Props = {
handleCloseDialog: () => void;
handleOrder: (item: OrderResponse) => Promise<void>;
item: OrderResponse;
};

export const AddItemDialog = (props: Props) => {
    const {handleCloseDialog, handleOrder, item} = props;

    return (
    <Dialog open onClose={handleCloseDialog}>
        <DialogTitle>Confirm Order</DialogTitle>
        <DialogContent>
            <Typography>
                Please confirm the following order:
            </Typography>
            <Typography><strong>Meal:</strong> {item.mealName}</Typography>
            <Typography><strong>Restaurant:</strong> {item.restaurantName}</Typography>
            <Typography><strong>Shift:</strong> {item.shiftName}</Typography>
            {item.comment && (
                <Typography><strong>Comment:</strong> {item.comment}</Typography>
            )}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
            <Button onClick={() => handleOrder(item)} color="primary" variant="contained">Order</Button>
        </DialogActions>
    </Dialog>
    );
};