// components/UserSelect.tsx
import { useEffect, useState } from "react";
import { Autocomplete, Avatar, TextField } from "@mui/material";
import { User } from "../../api/index.ts";
import { UserResponse } from "../../../src/api/generated";
import {useAuth} from "../../context/AuthProvider.tsx";

interface UserSelectProps {
    value: UserResponse | null;
    onChange: (user: UserResponse | null) => void; // parent decides what to do
    label?: string;
    excludeSelf?: boolean;
}

const UserSelect: React.FC<UserSelectProps> = ({ value, onChange, excludeSelf, label = "Select User" }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<UserResponse[]>([]);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const { userId } = useAuth();

    useEffect(() => {
        if (searchQuery.trim().length > 0 && userId) {
            if (excludeSelf) {
                User.searchFavoriteUsers(searchQuery, userId)
                    .then((res) => setSearchResults(res.data))
                    .catch(() => setSearchResults([]));
            } else {
                User.searchUsers(searchQuery)
                    .then((res) => setSearchResults(res.data))
                    .catch(() => setSearchResults([]));
            }
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    return (
        <Autocomplete
            options={searchResults}
            value={value}
            getOptionLabel={(option) =>
                `${option.firstName} ${option.lastName} (${option.shortName})`
            }
            onInputChange={(_, newValue) => setSearchQuery(newValue)}
            onChange={(_, newValue) => onChange(newValue)}
            renderOption={(props, option) => (
                <li {...props}>
                    <Avatar
                        src={`${baseUrl}/images/AMD.JPG`}
                        alt={`${option.firstName} ${option.lastName}`}
                        sx={{ width: 24, height: 24, mr: 1 }}
                    />
                    {option.firstName} {option.lastName} ({option.shortName})
                </li>
            )}
            renderInput={(params) => (
                <TextField {...params} label={label} fullWidth />
            )}
            noOptionsText="No users found"
        />
    );
};

export default UserSelect;
