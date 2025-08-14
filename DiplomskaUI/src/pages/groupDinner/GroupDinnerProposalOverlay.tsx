import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import OrderStepContent from "../order/OrderStepContent.tsx";
import {RestaurantResponse, UserResponse} from "../../api/generated";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "../../context/store/store.ts";

import '../../styles/GroupDinnerOverlay.css';
import Step3InvitePeople from "../../pages/groupDinner/InvitePeople.tsx";
import {DinnerProposal} from "../../../src/api";
import {HttpStatusCode} from "axios";
import {Alert, AlertColor, AlertPropsColorOverrides, IconButton, Snackbar} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {prepareProposeGroupDinnerRequest} from "../../util.ts";
import {OverridableStringUnion} from "@mui/types";
import {fetchMyDinnerProposal} from "../../context/store/myDinnerProposalSlice.ts";

type Props = {
    onClose: () => void;
    restaurants: RestaurantResponse[];
    open: boolean;
};

const steps = [
    "Choose Restaurant",
    "Make Order",
    "Choose Invited Persons & Send Invite",
];

const GroupDinnerProposalOverlay: React.FC<Props> = ({ onClose, restaurants, open }) => {
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(0);
    const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantResponse | undefined>(undefined);
    const orderDetails = useSelector((state: RootState) => state.order.order);
    const [invitedPersons, setInvitedPersons] = useState<UserResponse[]>([]);
    const [showSnackbarMessage, setShowSnackbarMessage] = useState(false);
    const [severity, setSeverity] = useState<OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined>(undefined);
    const [message, setMessage] = useState('');

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const nextStep = () => setActiveStep((s) => Math.min(s + 1, steps.length - 1));
    const prevStep = () => setActiveStep((s) => Math.max(s - 1, 0));

    const sendInvite = async () => {
        const invitedPersonIds = invitedPersons.map(p => p.id?.toString());
        if (orderDetails && selectedRestaurant?.id) {
            try {
                const request = prepareProposeGroupDinnerRequest(
                    orderDetails,
                    selectedRestaurant.id,
                    invitedPersonIds ?? []
                );

                const response = await DinnerProposal.proposeGroupDinner("1", request);

                if (response.status === HttpStatusCode.Ok) {
                    dispatch(fetchMyDinnerProposal("1") as any);
                    setMessage("Invite sent successfully!");
                    setSeverity('success');
                    setShowSnackbarMessage(true);
                    setTimeout(() => {
                        onClose();
                    }, 1500);
                } else {
                    setMessage("Failed to send invite. Please try again.");
                    setSeverity('error');
                    setShowSnackbarMessage(true);
                }
            } catch (error) {
                console.error(error);
                alert("An error occurred while sending the invite.");
            }
        }
    };

    // Reset step and selection when dialog opens
    React.useEffect(() => {
        if (open) {
            setActiveStep(0);
            setSelectedRestaurant(undefined);
            setInvitedPersons([]);
        }
    }, [open]);

    return (
        <><Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="lg"
            scroll="paper"
            aria-labelledby="group-dinner-dialog-title"
        >
            <DialogTitle id="group-dinner-dialog-title">
                Group Dinner Proposal
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>

            <DialogContent dividers style={{minHeight: 400}}>
                <div className="stepper" style={{marginBottom: 16}}>
                    {steps.map((label, i) => (
                        <div
                            key={label}
                            className={`step${i === activeStep ? " active" : ""}`}
                            onClick={() => setActiveStep(i)}
                            style={{cursor: "pointer", display: "inline-block", marginRight: 16}}
                        >
                            {label}
                        </div>
                    ))}
                </div>

                {/* Step content */}
                {activeStep === 0 && (
                    <div>
                        <h3>Choose a Restaurant</h3>
                        <div className="restaurant-card-grid">
                            {restaurants.map((r) => (
                                <div
                                    key={r.id}
                                    className={`restaurant-card${selectedRestaurant?.id === r.id ? " selected" : ""}`}
                                    onClick={() => setSelectedRestaurant(r)}
                                    style={{cursor: "pointer"}}
                                >
                                    <img
                                        src={`${baseUrl}/images/${r.image}`} // fallback if needed
                                        alt={r.name}
                                        className="restaurant-card-image"/>
                                    <div className="restaurant-card-name">{r.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeStep === 1 && selectedRestaurant && (
                    <OrderStepContent
                        groupDinner
                        selectedRestaurant={selectedRestaurant}
                        allRestaurants={[selectedRestaurant]}
                        onRestaurantChange={() => {
                        }}/>
                )}

                {activeStep === 2 && (
                    <Step3InvitePeople
                        invitedPersons={invitedPersons}
                        setInvitedPersons={setInvitedPersons}/>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={prevStep} disabled={activeStep === 0}>
                    Back
                </Button>

                {activeStep < steps.length - 1 ? (
                    <Button
                        onClick={() => {
                            if ((activeStep === 0 && !selectedRestaurant) || (activeStep === 1 && !orderDetails)) {
                                alert("Please fill in required fields before continuing.");
                                return;
                            }
                            nextStep();
                        }}
                        variant="contained"
                        color="primary"
                    >
                        Next
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            if (invitedPersons.length === 0) {
                                alert("Please add invited persons before sending invite.");
                                return;
                            }
                            sendInvite();
                        }}
                        variant="contained"
                        color="primary"
                    >
                        Send Invite
                    </Button>
                )}
            </DialogActions>
        </Dialog>
            <Snackbar
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
        </Snackbar></>
    );
};

export default GroupDinnerProposalOverlay;
