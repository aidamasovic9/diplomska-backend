import RestaurantCard from "./restaurant/RestaurantCard.tsx";
import { RestaurantResponse } from '../api/generated/model/restaurant-response.ts';
import {fetchRestaurants} from "../../src/context/store/restaurantSlice.ts";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../src/context/store/store.ts";
import UserDrawer from "../../src/pages/user/UserDrawer.tsx";
import GroupDinnerProposalOverlay from "../../src/pages/groupDinner/GroupDinnerProposalOverlay.tsx";
import ProposalNotification from "../pages/groupDinner/ProposalNotification.tsx";
import {fetchDinnerProposals} from "../context/store/dinnerProposalSlice.ts";
import {GroupDinnerProposalResponse} from "../api/generated";
import ProposalOverlay from "../pages/groupDinner/ProposalOverlay.tsx";
import {DinnerProposal} from "../api";
import {fetchMyDinnerProposal} from "../context/store/myDinnerProposalSlice.ts";
import {HttpStatusCode} from "axios";
import {Alert, AlertColor, AlertPropsColorOverrides, Box, IconButton, Snackbar, Tooltip} from "@mui/material";
import {OverridableStringUnion} from "@mui/types";
import {useAuth} from "../context/AuthProvider.tsx";
import LocationSwitcher from "./LocationSwitcher.tsx";
import LocationCityIcon from "@mui/icons-material/LocationCity";

const locationIcons: Record<string, string> = {
    Skopje: "/images/Skopje.png",
    Ohrid: "/images/Ohrid.png",
    Bitola: "/images/Bitola.png",
};

const Home = () => {

    const dispatch = useDispatch();
    const { restaurants, loading, error } = useSelector((state: RootState) => state.restaurants);
    const { dinnerProposals } = useSelector((state: RootState) => state.dinnerProposals);
    const { myDinnerProposal } = useSelector((state: RootState) => state.myDinnerProposal);
    const storedLocation = localStorage.getItem("selectedLocation") || "Skopje";
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [openProposalOverlay, setOpenProposalOverlay] = useState(false);
    const [selectedProposal, setSelectedProposal] = useState<GroupDinnerProposalResponse | null>(null);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined>(undefined);
    const [showSnackbarMessage, setShowSnackbarMessage] = useState(false);
    const [locationDialogOpen, setLocationDialogOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const { userId } = useAuth();

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

    useEffect(() => {
        if (userId) {
            dispatch(fetchDinnerProposals(userId) as any);
            dispatch(fetchRestaurants(storedLocation) as any);
            dispatch(fetchMyDinnerProposal(userId) as any);
        }
    }, [dispatch]);

    if (loading) return <p>Loading…</p>;
    if (error) return <p>Error: {error}</p>;

    const handleDecline= (id: string) => {
        console.log(id);
    }

    const handleDelete= (id: string) => {
        console.log(id);
    }

    const handleAccept = async (id: string) => {
        if (selectedProposal?.id && userId) {
            const response = await DinnerProposal.answerDinnerProposal(id, selectedProposal.id, true);
            if (response.status === HttpStatusCode.Ok) {
                dispatch(fetchDinnerProposals(userId) as any);
                setMessage("Proposal accepted! Please proceed with creating your order.");
                setSeverity('success');
                setShowSnackbarMessage(true);
                setOpenProposalOverlay(false);
            } else {
                setMessage("Failed to send accept invite. Please try again.");
                setSeverity('error');
                setShowSnackbarMessage(true);
            }
        }
    }
    return (
        <>
        <div style={{ position: 'relative', maxHeight: '80vh',   // optional max height (80% viewport height)
            overflowY: 'auto', display: "flex", flexDirection: "row" }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '10px',
                    width: '250px',  // fixed width for your buttons column
                    boxSizing: 'border-box',
                    height: '500px'
                }}
            >
                <ProposalNotification
                    incomingProposals={dinnerProposals || []}
                    myProposal={myDinnerProposal}
                    onOpenProposal={(proposal: GroupDinnerProposalResponse) => {
                        setSelectedProposal(proposal);
                        setOpenProposalOverlay(true);
                    }}
                />
                <button
                    onClick={() => setIsOverlayOpen(true)}
                    style={{
                        position: 'fixed',      // fixed position relative to viewport
                        bottom: '150px',         // distance from bottom
                        left: '20px',           // distance from left
                        zIndex: 1000,           // make sure it stays above other content
                        padding: '12px 20px',
                        backgroundColor: '#1976d2', // MUI primary blue
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    }}
                >
                    Propose a group dinner
                </button>
            </div>
        <div className="restaurant-list">
            {restaurants?.map((restaurant: RestaurantResponse) => (
                <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    allRestaurants={restaurants}
                />
            ))}
        </div>
            <div style={{ display: "flex", alignItems: "end", flexDirection: "row"}}>
            <Tooltip title={`${selectedLocation}`} arrow>
                <IconButton
                    color="inherit"
                    onClick={() => setLocationDialogOpen(true)}
                    aria-label="switch location"
                    style={{
                        position: 'absolute',   // Changed from 'absolute'
                        top: 0,
                        right: 45,           // 👈 Anchors to the right
                    }}
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
            <UserDrawer />
        </div>
        </div>
    {isOverlayOpen && (
        <GroupDinnerProposalOverlay
            open={isOverlayOpen}
            onClose={() => setIsOverlayOpen(false)}
            restaurants={restaurants}
        />
    )}
        {openProposalOverlay && (
           <ProposalOverlay
        open={openProposalOverlay}
              proposal={selectedProposal}
              onClose={() => setOpenProposalOverlay(false)}
              currentUserId={userId || ''}
       onDecline={(id) => handleDecline(id)}
              onDelete={(id) => handleDelete(id)}
        onAccept={handleAccept}
           />)}
            {showSnackbarMessage && (<Snackbar
                open={showSnackbarMessage}
                autoHideDuration={6000}
                onClose={() => setShowSnackbarMessage(false)}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert
                    onClose={() => setShowSnackbarMessage(false)}
                    severity={severity}
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {message}
                </Alert>
            </Snackbar>)}
            <LocationSwitcher
                open={locationDialogOpen}
                onClose={() => setLocationDialogOpen(false)}
                onSelect={(loc) => setSelectedLocation(loc)}
            />
       </>
    );
};

export default Home;
