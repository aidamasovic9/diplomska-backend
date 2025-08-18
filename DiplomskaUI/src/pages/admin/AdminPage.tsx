import { useState, useEffect } from "react";
import {
    Box, Typography, Container, Tabs, Tab, Paper,
    Button, TextField, Grid, IconButton, List, ListItem, ListItemText, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminPage = () => {
    const [tab, setTab] = useState(0);
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState<any | null>(null);

    useEffect(() => {
        setRestaurants([
            {
                id: 1,
                name: "Pasta House",
                city: "Rome",
                imageUrl: "https://placehold.co/200",
                shifts: [{ id: 1, name: "Lunch", maxGuests: 20 }],
                categories: [
                    {
                        id: 1,
                        name: "Pasta",
                        meals: [{ id: 1, name: "Carbonara", description: "Classic Roman pasta" }]
                    }
                ]
            }
        ]);
        setCities([{ id: 1, name: "Rome" }, { id: 2, name: "Paris" }]);
    }, []);

    const handleTabChange = (_: any, newValue: number) => setTab(newValue);

    const handleDeleteRestaurant = (restaurantId: number) => {
        setRestaurants((prev) => prev.filter((r) => r.id !== restaurantId));
        if (selectedRestaurant?.id === restaurantId) setSelectedRestaurant(null);
    };

    const addCategory = () => {
        if (!selectedRestaurant) return;
        const updated = {
            ...selectedRestaurant,
            categories: [...selectedRestaurant.categories, { id: Date.now(), name: "", meals: [] }]
        };
        setSelectedRestaurant(updated);
    };

    const addMeal = (categoryIdx: number) => {
        if (!selectedRestaurant) return;
        const updatedCategories = [...selectedRestaurant.categories];
        updatedCategories[categoryIdx].meals.push({
            id: Date.now(),
            name: "",
            description: ""
        });
        setSelectedRestaurant({ ...selectedRestaurant, categories: updatedCategories });
    };

    const addShift = () => {
        if (!selectedRestaurant) return;
        const updatedShifts = [...selectedRestaurant.shifts, { id: Date.now(), name: "", maxGuests: 0 }];
        setSelectedRestaurant({ ...selectedRestaurant, shifts: updatedShifts });
    };

    const saveRestaurant = () => {
        if (!selectedRestaurant) return;

        // Update existing restaurant
        if (selectedRestaurant.id) {
            setRestaurants((prev) =>
                prev.map((r) => (r.id === selectedRestaurant.id ? selectedRestaurant : r))
            );
        } else {
            // Add new restaurant
            setRestaurants((prev) => [
                ...prev,
                { ...selectedRestaurant, id: Date.now() },
            ]);
        }

        setSelectedRestaurant(null);
    };

    return (
        <Container
            maxWidth={false}
            sx={{ margin: "20px", width: "calc(100% - 40px)" }}
        >
            {/* Page Title */}
            <Typography
                variant="h4"
                gutterBottom
                sx={{ mt: 2, mb: 3, ml: 1 }}
            >
                Admin Dashboard
            </Typography>

            {/* Main Content Card */}
            <Paper elevation={3} sx={{ p: 3 }}>
                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    variant="scrollable"
                >
                    <Tab label="Restaurants" />
                    <Tab label="Cities" />
                </Tabs>

                <Box sx={{ mt: 3 }}>
                    {tab === 0 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Restaurants
                            </Typography>

                            {/* Add New Button */}
                            <Box mb={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        setSelectedRestaurant({
                                            id: null,
                                            name: "",
                                            city: "",
                                            imageUrl: "",
                                            shifts: [],
                                            categories: [],
                                        })
                                    }
                                >
                                    + Add Restaurant
                                </Button>
                            </Box>

                            {/* List of Existing Restaurants */}
                            <List>
                                {restaurants.map((r) => (
                                    <ListItem
                                        key={r.id}
                                        secondaryAction={
                                            <>
                                                <IconButton onClick={() => setSelectedRestaurant(r)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteRestaurant(r.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </>
                                        }
                                    >
                                        <ListItemText primary={r.name} secondary={r.city} />
                                    </ListItem>
                                ))}
                            </List>

                            {/* Restaurant Form */}
                            {selectedRestaurant && (
                                <Box mt={4}>
                                    <Typography variant="h6" sx={{ mb: 2 }}>
                                        {selectedRestaurant.id ? "Edit Restaurant" : "New Restaurant"}
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <TextField
                                                fullWidth
                                                label="Name"
                                                value={selectedRestaurant.name}
                                                onChange={(e) =>
                                                    setSelectedRestaurant({
                                                        ...selectedRestaurant,
                                                        name: e.target.value,
                                                    })
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <FormControl fullWidth>
                                                <InputLabel>City</InputLabel>
                                                <Select
                                                    value={selectedRestaurant.city}
                                                    label="City"
                                                    onChange={(e) =>
                                                        setSelectedRestaurant({
                                                            ...selectedRestaurant,
                                                            city: e.target.value,
                                                        })
                                                    }
                                                >
                                                    {cities.map((c) => (
                                                        <MenuItem key={c.id} value={c.name}>
                                                            {c.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                label="Image URL"
                                                value={selectedRestaurant.imageUrl}
                                                onChange={(e) =>
                                                    setSelectedRestaurant({
                                                        ...selectedRestaurant,
                                                        imageUrl: e.target.value,
                                                    })
                                                }
                                            />
                                        </Grid>
                                    </Grid>

                                    {/* Shifts */}
                                    <Box mt={3}>
                                        <Typography variant="subtitle1">Shifts</Typography>
                                        {selectedRestaurant.shifts.map((s, idx) => (
                                            <Box key={idx} display="flex" gap={2} mt={1}>
                                                <TextField
                                                    sx={{ maxWidth: 250 }}
                                                    label="Name"
                                                    value={s.name}
                                                    onChange={(e) => {
                                                        const shifts = [...selectedRestaurant.shifts];
                                                        shifts[idx] = { ...shifts[idx], name: e.target.value };
                                                        setSelectedRestaurant({ ...selectedRestaurant, shifts });
                                                    }}
                                                />
                                                <TextField
                                                    sx={{ maxWidth: 150 }}
                                                    type="number"
                                                    label="Max Guests"
                                                    value={s.maxGuests}
                                                    onChange={(e) => {
                                                        const shifts = [...selectedRestaurant.shifts];
                                                        shifts[idx] = { ...shifts[idx], maxGuests: +e.target.value };
                                                        setSelectedRestaurant({ ...selectedRestaurant, shifts });
                                                    }}
                                                />
                                            </Box>
                                        ))}
                                        <Button sx={{ mt: 1 }} onClick={addShift}>
                                            + Add Shift
                                        </Button>
                                    </Box>

                                    {/* Categories & Meals */}
                                    <Box mt={3}>
                                        <Typography variant="subtitle1">Categories</Typography>
                                        {selectedRestaurant.categories.map((c, cIdx) => (
                                            <Box key={c.id} sx={{ mb: 2, border: "1px solid #ccc", p: 2, borderRadius: 1 }}>
                                                <TextField
                                                    sx={{ maxWidth: 250, mr: 2 }}
                                                    label="Category"
                                                    value={c.name}
                                                    onChange={(e) => {
                                                        const categories = [...selectedRestaurant.categories];
                                                        categories[cIdx] = { ...categories[cIdx], name: e.target.value };
                                                        setSelectedRestaurant({ ...selectedRestaurant, categories });
                                                    }}
                                                />

                                                <Typography variant="body2" sx={{ mt: 2 }}>Meals</Typography>
                                                {c.meals.map((m, mIdx) => (
                                                    <Box key={m.id} display="flex" gap={2} mt={1}>
                                                        <TextField
                                                            sx={{ maxWidth: 250 }}
                                                            label="Meal Name"
                                                            value={m.name}
                                                            onChange={(e) => {
                                                                const categories = [...selectedRestaurant.categories];
                                                                categories[cIdx].meals[mIdx] = {
                                                                    ...categories[cIdx].meals[mIdx],
                                                                    name: e.target.value
                                                                };
                                                                setSelectedRestaurant({ ...selectedRestaurant, categories });
                                                            }}
                                                        />
                                                        <TextField
                                                            sx={{ maxWidth: 400 }}
                                                            label="Description"
                                                            value={m.description}
                                                            onChange={(e) => {
                                                                const categories = [...selectedRestaurant.categories];
                                                                categories[cIdx].meals[mIdx] = {
                                                                    ...categories[cIdx].meals[mIdx],
                                                                    description: e.target.value
                                                                };
                                                                setSelectedRestaurant({ ...selectedRestaurant, categories });
                                                            }}
                                                        />
                                                    </Box>
                                                ))}
                                                <Button sx={{ mt: 1 }} onClick={() => addMeal(cIdx)}>
                                                    + Add Meal
                                                </Button>
                                            </Box>
                                        ))}
                                        <Button sx={{ mt: 1 }} onClick={addCategory}>
                                            + Add Category
                                        </Button>
                                    </Box>

                                    {/* Save Button */}
                                    <Box mt={3}>
                                        <Button variant="contained" color="primary" onClick={saveRestaurant}>
                                            {selectedRestaurant.id ? "Save Changes" : "Create Restaurant"}
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    )}

                    {tab === 1 && (
                        <Box>
                            <Typography variant="h6">Cities</Typography>
                            {cities.map(c => (
                                <Box key={c.id} display="flex" gap={2} mt={1}>
                                    <TextField sx={{ maxWidth: 250 }} value={c.name} />
                                    <IconButton><DeleteIcon /></IconButton>
                                </Box>
                            ))}
                            <Button sx={{ mt: 1 }}>+ Add City</Button>
                        </Box>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default AdminPage;