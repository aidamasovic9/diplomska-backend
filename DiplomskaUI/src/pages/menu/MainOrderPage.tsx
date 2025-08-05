import * as React from 'react';
import '../../styles/FoodPage.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import {TransitionProps} from "@mui/material/transitions";
import {ButtonGroup, Slide} from "@mui/material";
import {useEffect, useState} from "react";
import MenuListPage from './MenuListPage.tsx';
import OrderSummary from "./OrderSummary.tsx";
import { CategoryResponse } from '../../api/generated/model/category-response.ts';
import { Meal } from '../../api/index.ts';
import { HttpStatusCode } from "axios";
import { MealResponse } from '../../api/generated/model/meal-response.ts';
import { categoryIconMap } from '../../../src/util.ts';
import {RestaurantResponse} from "../../../src/api/generated";
import CartBadge from "../../../src/pages/CartBadge.tsx";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface FoodPageProps {
    open: boolean;
    handleClose: () => void;
    restaurant: RestaurantResponse;
    allRestaurants: RestaurantResponse[];
}

const MainOrderPage: React.FC<FoodPageProps> = ({ open, handleClose, restaurant, allRestaurants }) => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [food, setFood] = useState<MealResponse[] |  undefined>(undefined);
    const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantResponse>(restaurant);

    const handleButtonClick = async (index: number) => {
        setSelectedIndex(index);
        const newSelectedSection = selectedRestaurant.categories?.[index] ?? null;
        await fetchCategories(newSelectedSection);
    };


    const fetchCategories = async (category: CategoryResponse | null) => {
        if (category?.id != null) {
            const response = await Meal.getMealsByCategory(category.id);
            if (response.status === HttpStatusCode.Ok) {
                setFood(response.data.meals);
            }
        }
    };

    useEffect(() => {
        if (open) {
            setSelectedRestaurant(restaurant);
        }
    }, [open, restaurant]);

    const handleRestaurantChange = async (restaurantId: string) => {
        const newRestaurant = allRestaurants.find(r => r.id === restaurantId);
        if (newRestaurant) {
            setSelectedRestaurant(newRestaurant);
            setSelectedIndex(0);
            await fetchCategories(newRestaurant.categories?.[0] ?? null);
        }
    };


    useEffect(() => {
        if (open && selectedRestaurant.categories && selectedRestaurant.categories.length > 0) {
            fetchCategories(selectedRestaurant.categories[0]);
        } else if (!open) {
            setSelectedIndex(0);
            setFood(undefined);
        }
    }, [open, selectedRestaurant.categories]);


    return (
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'sticky', backgroundColor: '#040066', top: 0, zIndex: 1200 }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Order
                        </Typography>
                        <CartBadge />
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                            sx={{ marginLeft: 2 }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <ButtonGroup className='restaurantSwitcher' variant="text" aria-label="Basic button group">
                    {allRestaurants.map((r) => (
                        <Button
                            key={r.id}
                            onClick={() => handleRestaurantChange(r.id ?? '')}
                            className={r.id === selectedRestaurant.id ? 'selectedBtn' : 'unselectedBtn'}
                        >
                            {r.name}
                        </Button>
                    ))}
                </ButtonGroup>
                <ButtonGroup className='menuButtons' variant="text" aria-label="Basic button group">
                    {selectedRestaurant.categories?.map((section: CategoryResponse, index: number) => {
                        const Icon = categoryIconMap[section.name ?? 'default'] || categoryIconMap['default'];
                        return (
                            <Button
                                key={index}
                                onClick={() => handleButtonClick(index)}
                                className={selectedIndex === index ? 'selectedBtn' : 'unselectedBtn'}
                            >{section.name} <Icon/>
                            </Button>
                        );
                })}
                </ButtonGroup>
                <div className="grid">
                <MenuListPage meals={food} />
                <OrderSummary restaurantId={selectedRestaurant.id} shifts={selectedRestaurant.shifts}/>
                </div>
            </Dialog>
    );
};

export default MainOrderPage;
