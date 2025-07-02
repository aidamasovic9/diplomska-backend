import {DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

type Props = {
open: boolean;
handleCloseDialog: () => void;
handleAddToCart: () => void;
title: string;
};

export const AddItemDialog = (props: Props) => {
    const {open, handleCloseDialog, handleAddToCart, title} = props;

    return (
    <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Add to Cart</DialogTitle>
        <DialogContent>
            <p>Are you sure you want to add <strong>{title}</strong> to your cart?</p>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
            <Button onClick={handleAddToCart} color="primary" variant="contained">Add</Button>
        </DialogActions>
    </Dialog>
    );
};