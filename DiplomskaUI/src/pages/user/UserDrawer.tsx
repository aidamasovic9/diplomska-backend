import {
    SwipeableDrawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography, Avatar,
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import {useEffect, useState} from 'react';
import { User } from '../../../src/api';
import {AddFavoriteUserRequest, UserResponse} from "../../../src/api/generated";
import UserSelect from "../../../src/pages/user/UserSelect.tsx";

const UserDrawer = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [favoriteUsers, setFavoriteUsers] = useState<UserResponse[]>([]);

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    useEffect(() => {
        if (drawerOpen) {
            User.getFavoriteUsers("1")
                .then(res => setFavoriteUsers(res.data))
                .catch(err => console.error(err));
        }
    }, [drawerOpen]);

    const handleAddFavorite = (user: UserResponse | null) => {
        if (user && !favoriteUsers.find(u => u.id === user.id)) {
            const body: AddFavoriteUserRequest = { favoriteUserId: String(user.id) };
            User.addFavoriteUser("1", body)
                .then(() => {
                    setFavoriteUsers(prev => [...prev, user]);
                })
                .catch(err => console.error(err));
        }
    };

    const handleRemoveFavorite = (favoriteUserId: string | number) => {
        User.removeFavoriteUser("1", String(favoriteUserId))
            .then(() => {
                setFavoriteUsers(prev => prev.filter(u => u.id !== favoriteUserId));
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            <IconButton
                onClick={toggleDrawer(true)}
                style={{
                    position: 'absolute',   // Changed from 'absolute'
                    top: 10,
                    right: 10,           // 👈 Anchors to the right
                }}
            >
                <PeopleAltIcon sx={{ color: '#040066' }}/>
            </IconButton>

            <SwipeableDrawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <div style={{ width: 300, padding: 16 }}>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Search users by name, last name, or shortname and add them to your favorites.
                    </Typography>
                    <UserSelect
                        value={null}
                        onChange={(selectedUser) => {
                            if (selectedUser) {
                                handleAddFavorite(selectedUser); // existing logic
                            }
                        }}
                        label="Search Users"
                        excludeSelf
                    />
                    <Typography variant="h6" sx={{ mt: 3 }}>Favorites</Typography>
                    <List dense sx={{ maxHeight: 200, overflowY: 'auto' }}>
                        {favoriteUsers.map((user) => (
                            <ListItem
                                key={user.id}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => handleRemoveFavorite(user.id!)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <Avatar
                                    src={`${baseUrl}/images/AMD.JPG`}
                                    alt={`${user.firstName} ${user.lastName}`}
                                    sx={{ width: 30, height: 30, mr: 1 }}
                                />
                                <ListItemText
                                    primary={`${user.firstName} ${user.lastName} (${user.shortName})`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </SwipeableDrawer>
        </>
    );
};

export default UserDrawer;
