import {useSelector} from "react-redux";
import {RootState} from "../../src/context/store/store.ts";
import {useState} from "react";
import {Alert, AlertColor, AlertPropsColorOverrides, CircularProgress, Snackbar} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { OrderResponse} from '../api/generated/model/order-response.ts';
import { Order } from '../api/index.ts';
import { prepareOrderRequestFromFastOrder } from '../../src/util.ts';
import {OverridableStringUnion} from "@mui/types";
import "../styles/FastOrderSection.css";
import { AddItemDialog } from "../pages/menu/AddItemDialog.tsx";
import { FastOrderObject } from "../../src/api/generated";

const FastOrdersSection = () => {
    const {fastOrders, loading, error} = useSelector((state: RootState) => state.fastOrders);
    const [showSnackbarMessage, setShowSnackbarMessage] = useState(false);
    const [severity, setSeverity] = useState<OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined>(undefined);
    const [message, setMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [orderItem, setOrderItem] = useState<FastOrderObject>({});

    const showAlert = (severity: AlertColor, message: string) => {
        setSeverity(severity);
        setMessage(message);
        setShowSnackbarMessage(true);
    }

    if (loading) return <CircularProgress/>;
    if (error) return <div>Error: {error}</div>;

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
    };

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const handleOrder = async (item: OrderResponse) => {
      await Order.createOrder("1", prepareOrderRequestFromFastOrder(item))
        .then(() => {
           showAlert("success", "Successfully created an order");
        })
        .catch(() => {
           showAlert("error", "Failed to create an order");
         })
        .finally(() => {
          setOpenDialog(false);
        });
    };

    const onItemClick = (item: OrderResponse) => {
        setOrderItem(item);
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    return (
    <>
        <Slider {...settings} className="fast-orders-slider">
            {fastOrders.orders?.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card
                        onClick={() => onItemClick(item)}
                        sx={{
                            display: 'flex',
                            height: 140,
                            cursor: 'pointer',
                            '&:hover': { boxShadow: 6 },
                            maxWidth: 300,
                            width: '100%',
                            borderRadius: '48px',
                            overflow: 'hidden',
                            border: '4px solid #ffffff33', // subtle semi-transparent white border
                            backgroundColor: '#7ab5e6',
                        }}
                    >
                        <CardMedia
                            component="img"
                            sx={{ width: 140, height: '100%', objectFit: 'cover' }}
                            image={`${baseUrl}/images/${item.mealImage}`}
                            alt="restaurant image"
                        />
                        <CardContent
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                flex: 1,
                                backgroundColor: '#89a8dd',
                                color: '#040066',
                                padding: 2,
                                '& .MuiTypography-root': { color: 'inherit' },
                            }}
                        >
                            <Typography sx={{ fontWeight: 'bold' }}>{item.mealName}</Typography>
                            <Typography>{item.restaurantName}</Typography>
                            <Typography>{item.shiftName}</Typography>
                            <Typography>{item.comment}</Typography>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </Slider>
            <Snackbar
                open={showSnackbarMessage}
                autoHideDuration={6000}
                onClose={() => setShowSnackbarMessage(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setShowSnackbarMessage(false)}
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        {openDialog &&
           <AddItemDialog
            handleCloseDialog={handleCloseDialog}
            handleOrder={handleOrder}
            item={orderItem}
            /> }
        </>
    );
};

export default FastOrdersSection;