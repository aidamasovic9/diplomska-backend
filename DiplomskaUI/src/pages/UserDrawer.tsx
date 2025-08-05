import {
    SwipeableDrawer,
    IconButton,
    TextField,
    List,
    ListItem,
    ListItemText,
    Divider,
    Typography, Avatar
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useState } from 'react';

type User = {
    id: string;
    name: string;
    lastName: string;
    shortName: string;
};

const MOCK_USERS: User[] = [
    { id: '1', name: 'John', lastName: 'Doe', shortName: 'JD' },
    { id: '2', name: 'Jane', lastName: 'Smith', shortName: 'JS' },
    { id: '3', name: 'Alice', lastName: 'Brown', shortName: 'AB' },
];

const UserDrawer = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [favoriteUsers, setFavoriteUsers] = useState<User[]>([]);

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const filteredUsers = MOCK_USERS.filter((user) =>
        `${user.name} ${user.lastName} ${user.shortName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    const handleSelectUser = (user: User) => {
        if (!favoriteUsers.find((u) => u.id === user.id)) {
            setFavoriteUsers((prev) => [...prev, user]);
        }
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
                    <TextField
                        label="Search Users"
                        variant="outlined"
                        fullWidth
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />

                    <Typography variant="h6">Favorites</Typography>
                    <List dense sx={{ maxHeight: 200, overflowY: 'auto' }}>
                        {favoriteUsers.map((user) => (
                            <ListItem key={user.id}>
                                <Avatar
                                    src={`${baseUrl}/images/AMD.JPG`}
                                    alt={`${user.name} ${user.lastName}`}
                                    sx={{ width: 30, height: 30, mr: 1 }}
                                >
                                    {user.name[0]}
                                </Avatar>
                                <ListItemText
                                    primary={`${user.name} ${user.lastName} (${user.shortName})`}
                                />
                            </ListItem>
                        ))}
                    </List>

                    <Divider sx={{ my: 2 }} />

                    {searchQuery && (
                        <>
                            <Typography variant="h6">Search Results</Typography>
                            <List dense sx={{ maxHeight: 200, overflowY: 'auto' }}>
                                {filteredUsers.map(user => (
                                    <ListItem key={user.id} onClick={() => handleSelectUser(user)}>
                                        <Avatar
                                            src={`${baseUrl}/images/AMD.JPG`}
                                            alt={`${user.name} ${user.lastName}`}
                                            sx={{ width: 30, height: 30, mr: 1 }}
                                        >
                                            {user.name[0]}
                                        </Avatar>
                                        <ListItemText
                                            primary={`${user.name} ${user.lastName} (${user.shortName})`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </>
                    )}
                </div>
            </SwipeableDrawer>
        </>
    );
};

export default UserDrawer;
