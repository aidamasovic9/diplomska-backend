import {
    Tabs,
    Tab,
    Badge,
    List,
    ListItemButton,
    ListItemText,
    Box, ListItemAvatar, Avatar,
} from "@mui/material";
import { useState } from "react";
import { GroupDinnerProposalResponse } from "../../api/generated";
import { useTheme, Theme } from "@mui/material/styles";

interface ProposalNotificationsProps {
    incomingProposals?: GroupDinnerProposalResponse[];
    myProposal: GroupDinnerProposalResponse | null;
    onOpenProposal: (proposal: GroupDinnerProposalResponse) => void;
}

const ProposalNotification: React.FC<ProposalNotificationsProps> = ({
                                                                        incomingProposals = [],
                                                                        myProposal,
                                                                        onOpenProposal,
                                                                    }) => {
    // Start with no tab selected
    const [selectedTab, setSelectedTab] = useState<number | undefined>(undefined);

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const theme = useTheme<Theme>();

    const statusColors: Record<string, string> = {
        PENDING: theme.palette.warning.light,
        CONFIRMED: theme.palette.success.light,
        CANCELLED: theme.palette.error.light,
        INVITED: theme.palette.info.light,
        TO_BE_CANCELLED: theme.palette.error.light, // same as CANCELLED, but can be different if you want
    };


    return (
        <>
            <Tabs
                orientation="vertical"
                value={selectedTab}
                sx={{
                    borderRight: 1,
                    borderColor: "divider",
                    minWidth: 120,
                }}
            >
                <Tab onClick={() =>
                    setSelectedTab((prev) => (prev === 0 ? undefined : 0))
                }
                    label={
                        <Badge
                            color="secondary"
                            badgeContent={incomingProposals.length}
                            invisible={incomingProposals.length === 0}
                        >
                            Group dinner proposals
                        </Badge>
                    }
                />
                <Tab onClick={() =>
                    setSelectedTab((prev) => (prev === 1 ? undefined : 1))
                }
                    label={
                        <Badge
                            color="secondary"
                            variant="dot"
                            invisible={!myProposal}
                            sx={{
                                "& .MuiBadge-dot": {
                                    right: -8, // move dot slightly away from text
                                },
                                pr: 1, // add padding to give more space overall
                            }}
                        >
                            My Dinner Proposal
                        </Badge>
                    }
                />
            </Tabs>

            <Box sx={{ flex: 1, overflowY: "auto" }}>
                {selectedTab === 0 && (
                    <List dense>
                        {incomingProposals.map((proposal) => (
                            <ListItemButton
                                key={proposal.id}
                                onClick={() => onOpenProposal(proposal)}
                                sx={{
                                    backgroundColor: statusColors[proposal.status || ''] || "transparent",
                                    borderRadius: 1,
                                    mb: 1,
                                }}
                            > <ListItemAvatar>
                                <Avatar src={`${baseUrl}/images/${proposal?.initiator?.image}`}>
                                    {proposal?.initiator?.firstName?.[0]}
                                </Avatar>
                            </ListItemAvatar>
                                <ListItemText
                                    primary={proposal.restaurantName}
                                    secondary={`By ${proposal.initiator?.shortName}`}
                                />
                            </ListItemButton>
                        ))}
                    </List>
                )}

                {selectedTab === 1 && myProposal && (
                    <List dense>
                        <ListItemButton onClick={() => onOpenProposal(myProposal)}
                                        sx={{
                                            backgroundColor: statusColors[myProposal.status || ''] || "transparent",
                                            borderRadius: 1,
                                            mb: 1,
                                        }}>
                            <ListItemAvatar>
                                <Avatar src={`${baseUrl}/images/${myProposal?.initiator?.image}`}>
                                    {myProposal?.initiator?.firstName?.[0]}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={myProposal.restaurantName}
                                secondary="By you"
                            />
                        </ListItemButton>
                    </List>
                )}
            </Box>
        </>
    );
};

export default ProposalNotification;
