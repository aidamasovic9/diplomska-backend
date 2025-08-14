import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store/store.ts";
import { UserResponse } from "../../api/generated";
import UserSelect from "../user/UserSelect";
import Typography from "@mui/material/Typography"; // adjust path if needed

type Props = {
    invitedPersons: UserResponse[];
    setInvitedPersons: (invitedPersons: UserResponse[]) => void;
};

const Step3InvitePeople = ({
                               invitedPersons,
                               setInvitedPersons,
                           }: Props) => {
    // Selected user in autocomplete
    const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);

    // Select favoriteUsers state from Redux store
    const highlightedUsers = useSelector(
        (state: RootState) => state.favoriteUsers.favoriteUsers
    );

    // Toggle user in invitedPersons list
    const toggleUser = (user: UserResponse) => {
        if (invitedPersons.some((u) => u.id === user.id)) {
            setInvitedPersons(invitedPersons.filter((u) => u.id !== user.id));
        } else {
            setInvitedPersons([...invitedPersons, user]);
        }
    };

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    return (
        <div>
            <h3>Choose invited persons & send invite</h3>

            {/* Top row: highlighted + invited side by side */}
            <div style={{ display: "flex", gap: 24, marginBottom: 20 }}>
                {/* Highlighted colleagues */}
                <div style={{ flex: 1 }}>
                    <p><em>Your Highlighted colleagues</em></p>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        {highlightedUsers.map((user) => (
                            <div
                                key={user.id}
                                onClick={() => toggleUser(user)}
                                style={{
                                    border: "3px solid black",
                                    borderRadius: "50%",
                                    padding: 2,
                                    cursor: "pointer",
                                    width: 60,
                                    height: 60,
                                    marginBottom: 15,
                                }}
                                title={user.firstName}
                            >
                                <img
                                    src={`${baseUrl}/images/${user.image}`}
                                    alt={user.firstName}
                                    style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                                />
                                <Typography>{user.shortName}</Typography>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Invited persons */}
                <div style={{ flex: 1 }}>
                    <p><em>Invited persons</em></p>
                    {invitedPersons.length === 0 && <p>No one invited yet</p>}
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        {invitedPersons.map((user) => (
                            <div
                                key={user.id}
                                onClick={() => toggleUser(user)}
                                style={{
                                    border: "2px solid #a0c000",
                                    borderRadius: "50%",
                                    padding: 2,
                                    cursor: "pointer",
                                    width: 60,
                                    height: 60,
                                    filter: "drop-shadow(0 0 2px #a0c000)",
                                }}
                                title={`Remove ${user.firstName}`}
                            >
                                <img
                                    src={`${baseUrl}/images/${user.image}`}
                                    alt={user.firstName}
                                    style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Search bar below */}
            <div style={{ maxWidth: 400 }}>
                <UserSelect
                    value={selectedUser}
                    onChange={(user) => {
                        setSelectedUser(user);
                        if (user && !invitedPersons.some((u) => u.id === user.id)) {
                            setInvitedPersons([...invitedPersons, user]);
                        }
                    }}
                    label="Search users"
                    excludeSelf={false}
                />
            </div>
        </div>
    );
};

export default Step3InvitePeople;
