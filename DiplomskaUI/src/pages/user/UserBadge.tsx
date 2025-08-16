import { useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider.tsx";
import {
    Box,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Divider,
    ListItemIcon,
    Tooltip
} from "@mui/material";
import { Logout } from "@mui/icons-material";

const UserBadge = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    if (!user) return null;

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleAdminClick = () => {
        navigate("/admin");
    };

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    return (
        <Box>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 1 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <Avatar sx={{ width: 30, height: 30 }}>
                        {`${baseUrl}/images/${user.image}`}
                    </Avatar>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                {user.role === "ADMIN" && (
                    <MenuItem onClick={handleAdminClick}>
                        <ListItemIcon>
                            {/* You can put an icon for admin if you want */}
                        </ListItemIcon>
                        Admin
                    </MenuItem>
                )}

                <Divider />

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default UserBadge;
