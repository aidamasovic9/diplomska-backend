import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Box,
    Typography,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/LocationSwitcher.css";

interface LocationSwitcherProps {
    open: boolean;
    onClose: () => void;
    onSelect: (location: string) => void;
}

const LocationSwitcher = ({ open, onClose, onSelect }: LocationSwitcherProps) => {
    const locations = [
        { name: "Skopje", img: "/images/Skopje.png" },
        { name: "Ohrid", img: "/images/Ohrid.png" },
        { name: "Bitola", img: "/images/Bitola.png" },
    ];
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
            PaperProps={{
                className: "location-dialog-paper",
            }}
        >
            <DialogTitle className="location-dialog-title">
                Select a Location
                <IconButton
                    onClick={onClose}
                    className="location-close-button"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {locations.map((loc) => (
                        <Grid item xs={4} key={loc.name}>
                            <Box
                                component="button"
                                onClick={() => {
                                    onSelect(loc.name);
                                    onClose();
                                }}
                                className="location-button"
                            >
                                <img src={`${baseUrl}${loc.img}`} alt={loc.name} />
                                <Typography variant="body2" className="location-name">
                                    {loc.name}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default LocationSwitcher;
