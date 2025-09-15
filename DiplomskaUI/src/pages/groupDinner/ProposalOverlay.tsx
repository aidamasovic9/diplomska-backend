import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Typography,
    Box,
    Avatar,
    Stack,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import DeleteIcon from "@mui/icons-material/Delete";
import { GroupDinnerProposalResponse, InvitedPerson } from "../../api/generated";

interface ProposalOverlayProps {
    open: boolean;
    proposal: GroupDinnerProposalResponse | null;
    onClose: () => void;
    currentUserId: string;
    onDecline: (proposalId: string) => void;
    onDelete: (proposalId: string) => void;
    onAccept: (userId: string) => void;
}

const ProposalOverlay: React.FC<ProposalOverlayProps> = ({
                                                             open,
                                                             proposal,
                                                             onClose,
                                                             currentUserId,
                                                             onDecline,
                                                             onDelete,
    onAccept
                                                         }) => {
    if (!proposal) return null;

    const isInitiator = proposal.initiator?.id === currentUserId;

    const getStatusIcon = (status?: string) => {
        switch (status) {
            case "ACCEPTED":
                return <CheckCircleIcon color="success" />;
            case "DECLINED":
                return <CancelIcon color="error" />;
            case "PENDING":
            default:
                return <HourglassEmptyIcon color="disabled" />;
        }
    };

    const currentUserStatus = !isInitiator
        ? proposal?.invitedPersons?.find(p => p?.id === currentUserId)?.status !== "ACCEPTED"
        : undefined;
    console.log(currentUserId, currentUserStatus);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <Box sx={{ position: "relative", p: 2 }}>
                {/* Close button top-right */}
                <Button
                    onClick={onClose}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                >
                    Close
                </Button>

                <DialogTitle>
                    {proposal.restaurantName} - {proposal.shiftName || "Shift"}
                    {proposal.status === "TO_BE_CANCELLED" && (
                        <Typography variant="body2" color="warning.main" sx={{ mt: 1 }}>
                            ⚠️ The group dinner will likely fall apart.
                        </Typography>
                    )}
                </DialogTitle>

                <DialogContent>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Initiator: {proposal.initiator?.firstName} {proposal.initiator?.lastName}
                    </Typography>

                    <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: "wrap" }}>
                        {proposal.invitedPersons?.map((p: InvitedPerson) => (
                            <Box key={p.id} sx={{ textAlign: "center", minWidth: 90, display: "flex",
                                flexDirection: "column",
                                alignItems: "center" }}>
                                <Avatar
                                    src={`${import.meta.env.VITE_API_BASE_URL}/images/${p.image}`}
                                    sx={{ width: 80, height: 80, mb: 1 }}
                                >
                                    {p.firstName?.[0]}
                                </Avatar>
                                <Typography>{p.shortName}</Typography>
                                <Box>{getStatusIcon(p.status)}</Box>
                            </Box>
                        ))}
                        <Box key={2} sx={{ textAlign: "center", minWidth: 90, display: "flex",
                            flexDirection: "column",
                            alignItems: "center" }}>
                            <Avatar
                                src={`${import.meta.env.VITE_API_BASE_URL}/images/marija.jpg`}
                                sx={{ width: 80, height: 80, mb: 1 }}
                            >
                                Marija
                            </Avatar>
                            <Typography>MPE</Typography>
                            <Box>{getStatusIcon('PENDING')}</Box>
                        </Box>
                    </Stack>
                </DialogContent>

                {!isInitiator ? (
                    currentUserStatus &&
                    (<Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => onDecline(proposal.id!)}
                        >
                            Decline
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => onAccept(currentUserId)}
                        >
                            Accept
                        </Button>
                    </Box>
                    )
                ) : (
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => onDelete(proposal.id!)}
                        >
                            Delete Proposal
                        </Button>
                    </Box>
                )}
            </Box>
        </Dialog>
    );
};

export default ProposalOverlay;