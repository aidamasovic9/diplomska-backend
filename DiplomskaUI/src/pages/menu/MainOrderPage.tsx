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
import { useState } from "react";
import MenuListPage from './MenuListPage.tsx';
import OrderSummary from "./OrderSummary.tsx";

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
    sections: {
        title: string;
        food: {
            id: string;
            image: string;
            title: string;
            description: string;
        }[];
        Icon: React.ElementType;
    }[];
}

const MainOrderPage: React.FC<FoodPageProps> = ({ open, handleClose, sections }) => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedSection, setSelectedSection] = useState(sections[0]);

    const handleButtonClick = (index: number) => {
        setSelectedIndex(index);
        setSelectedSection(sections[index]);
    };
    return (
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'sticky', backgroundColor: '#040066', top: 0, zIndex: 1000 }}>
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
                    {sections.map((section, index) => (
                        <Button
                            key={index}
                            onClick={() => handleButtonClick(index)}
                            className={selectedIndex === index ? 'selectedBtn' : 'unselectedBtn'}>
                            {section.title} <section.Icon />
                        </Button>))}
                </ButtonGroup>
                <div className="grid">
                <MenuListPage
                    items={selectedSection.food} />
                <OrderSummary/>
                </div>
            </Dialog>
    );
};

export default MainOrderPage;
