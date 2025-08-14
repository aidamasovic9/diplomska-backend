import '../styles/Header.css';
import CartBadge from "../../src/pages/CartBadge.tsx";
import { useEffect, useState } from "react";
import {IconButton, Tooltip, Box} from "@mui/material";
import LocationSwitcher from "../../src/pages/LocationSwitcher.tsx";
import { fetchRestaurants } from "../../src/context/store/restaurantSlice.ts";
import { useDispatch } from "react-redux";
import LocationCityIcon from '@mui/icons-material/LocationCity';

const locationIcons: Record<string, string> = {
    Skopje: "/images/Skopje.png",
    Ohrid: "/images/Ohrid.png",
    Bitola: "/images/Bitola.png",
};

const Header = () => {
    const [locationDialogOpen, setLocationDialogOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const dispatch = useDispatch();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const savedLocation = localStorage.getItem("selectedLocation");
        if (savedLocation) setSelectedLocation(savedLocation);
    }, []);

    useEffect(() => {
        if (selectedLocation) {
            localStorage.setItem("selectedLocation", selectedLocation);
            dispatch(fetchRestaurants(selectedLocation) as any);
        }
    }, [selectedLocation]);

    return (
        <header className="app-header">
            <div className="logo-container">
                <h1 className="app-title">Lunch App</h1>
            </div>
            <div className="header-right">
                <Tooltip title={`${selectedLocation}`} arrow>
                    <IconButton
                        color="inherit"
                        onClick={() => setLocationDialogOpen(true)}
                        aria-label="switch location"
                    >
                        {selectedLocation ? (
                            <Box
                                component="img"
                                src={`${baseUrl}${locationIcons[selectedLocation]}`}
                                sx={{
                                    width: 32,
                                    height: 32,
                                    bgcolor: 'white',       // white background
                                    borderRadius: '50%',    // circular shape
                                    objectFit: 'contain',   // ensures full image fits
                                    padding: 0.5,           // optional: small padding inside circle
                                }}
                            />
                        ) : (
                            <LocationCityIcon />
                        )}
                    </IconButton>
                </Tooltip>

                <CartBadge />
            </div>

            <LocationSwitcher
                open={locationDialogOpen}
                onClose={() => setLocationDialogOpen(false)}
                onSelect={(loc) => setSelectedLocation(loc)}
            />
        </header>
    );
};

export default Header;