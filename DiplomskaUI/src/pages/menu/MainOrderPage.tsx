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
import { ShiftResponse } from '../../api/generated/model/shift-response.ts';

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
    categories: CategoryResponse[] | undefined;
    restaurantId: string | undefined;
    shifts: ShiftResponse[] | undefined;
}

const MainOrderPage: React.FC<FoodPageProps> = ({ open, handleClose, categories, restaurantId, shifts }) => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [food, setFood] = useState<MealResponse[] |  undefined>(undefined);

    const handleButtonClick = async (index: number) => {
        setSelectedIndex(index);
        const newSelectedSection = categories?.[index] ?? null;
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
        if (open && categories && categories.length > 0) {
            fetchCategories(categories[0]);
        } else if (!open) {
            setSelectedIndex(0);
            setFood(undefined);
        }
    }, [open, categories]);


    return (
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'sticky', backgroundColor: '#040066', top: 0, zIndex: 1200 }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Order
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <ButtonGroup className='menuButtons' variant="text" aria-label="Basic button group">
                    {categories?.map((section, index) => {
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
                <OrderSummary restaurantId={restaurantId} shifts={shifts}/>
                </div>
            </Dialog>
    );
};

export default MainOrderPage;
