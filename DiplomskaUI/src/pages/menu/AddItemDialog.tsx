import {DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { OrderResponse } from "../../../src/api/generated";

type Props = {
title: string;
message: string;
handleCloseDialog: () => void;
handleOrder?: (item: OrderResponse) => Promise<void>;
handleDeleteFastOrder?: (itemId?: string) => Promise<void>;
item: OrderResponse;
};

export const AddItemDialog = (props: Props) => {
    const {title, message, handleCloseDialog, handleOrder, handleDeleteFastOrder, item} = props;

    return (
    <Dialog open onClose={handleCloseDialog}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <Typography>
                {message}
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
            {handleOrder &&
                <Button onClick={() => handleOrder(item)} color="primary" variant="contained">Order</Button>
            }
            {handleDeleteFastOrder &&
                <Button
                    onClick={() => handleDeleteFastOrder(item.id)}
                    color="primary"
                    variant="contained">
                    Delete fast order
                </Button>}
        </DialogActions>
    </Dialog>
    );
};