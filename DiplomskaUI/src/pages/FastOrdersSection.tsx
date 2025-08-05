import {useDispatch, useSelector} from "react-redux";
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
import Button from "@mui/material/Button";
import MainOrderPage from "../../src/pages/menu/MainOrderPage.tsx";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {fetchFastOrders} from "../../src/context/store/fastOrdersSlice.ts";
import {addOrder} from "../../src/context/store/orderSlice.ts";

const FastOrdersSection = () => {
    const dispatch = useDispatch();
    const {fastOrders, loading, error} = useSelector((state: RootState) => state.fastOrders);
    const {restaurants} = useSelector((state: RootState) => state.restaurants);
    const [showSnackbarMessage, setShowSnackbarMessage] = useState(false);
    const [severity, setSeverity] = useState<OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined>(undefined);
    const [message, setMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [orderItem, setOrderItem] = useState<FastOrderObject>({});
    const [openOrderPage, setOpenOrderPage] = useState(false);
    const [openDeleteItemDialog, setOpenDeleteItemDialog] = useState(false);
    const [itemForDeletion, setItemForDeletion] = useState({});

    const orderCount = fastOrders.orders?.length ?? 0;

    const handleOpenOrderPage = () => {
        setOpenOrderPage(false);
        dispatch(fetchFastOrders("1") as any);
    }

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
        slidesToShow: Math.min(3, orderCount),
        slidesToScroll: 1,
        variableWidth: true,
        adaptiveHeight: true,
    };

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const defaultRestaurant = restaurants[0];

    const handleOrder = async (item: OrderResponse) => {
      await Order.createOrder("1", prepareOrderRequestFromFastOrder(item))
        .then((response) => {
           showAlert("success", "Successfully created an order");
           dispatch(addOrder(response.data));
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

    const handleCloseItemDeleteDialog = () => {
        setOpenDeleteItemDialog(false);
    }

    const handleItemDelete = async (itemId?: string) => {
        if (itemId) {
            await Order.deleteFastOrder("1", itemId)
           .then(() => {
             showAlert("success", "Successfully deleted a fast order");
             dispatch(fetchFastOrders("1") as any);
           })
           .catch(() => {
             showAlert("error", "Failed to delete the fast order");
           })
           .finally(() => {
            setOpenDeleteItemDialog(false);
           })
        }
    }

    const handleDeleteFastOrder = (item: FastOrderObject) => {
        setItemForDeletion(item);
        setOpenDeleteItemDialog(true);
    }

    return (
    <>
        <div className="fast-orders-container">
        {fastOrders.orders && fastOrders.orders.length > 0 ? (
        <Slider {...settings} className="fast-orders-slider">
            {fastOrders.orders?.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'center', width: 320 }}>
                    <Card
                        onClick={() => onItemClick(item)}
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            height: 140,
                            cursor: 'pointer',
                            '&:hover': { boxShadow: 6 },
                            maxWidth: 300,
                            width: '100%',
                            borderRadius: '40px',
                            overflow: 'hidden',
                            border: '4px solid #ffffff33', // subtle semi-transparent white border
                            backgroundColor: '#7ab5e6',
                        }}
                    >
                        <IconButton
                            size="small"
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                width: 18,
                                height: 18,
                                backgroundColor: 'rgba(255,255,255,0.8)',
                                '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
                                zIndex: 2,
                                boxShadow: 3
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteFastOrder(item);
                            }}
                        >
                            <CloseIcon sx={{ fontSize: 14 }} />
                        </IconButton>

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
                                textAlign: 'left',
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
            ) : (
            <Typography variant="h6" sx={{ textAlign: 'center', width: '1400px' }}>
                Save your go-to meals and order in seconds. Add your first fast order now!
            </Typography>
        )}
        <Button
            variant="contained"
            color="primary"
            sx={{
                height: 50,
                whiteSpace: 'nowrap',
                alignSelf: 'center',
                marginLeft: 10,
            }}
            onClick={() => {
                setOpenOrderPage(true);
            }}
        >
            Add Fast Order
        </Button>
        </div>
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
            title="Confirm order"
            message="Please confirm the following order"
            handleCloseDialog={handleCloseDialog}
            handleOrder={handleOrder}
            item={orderItem}
            /> }
        {openDeleteItemDialog &&
        <AddItemDialog
            title="Delete fast order"
            message="Please confirm the deletion of the following item"
            handleCloseDialog={handleCloseItemDeleteDialog}
            handleDeleteFastOrder={handleItemDelete}
            item={itemForDeletion} />}
        {openOrderPage && <MainOrderPage
            open={openOrderPage}
            handleClose={handleOpenOrderPage}
            restaurant={defaultRestaurant}
            allRestaurants={restaurants}
        />
        }
        </>
    );
};

export default FastOrdersSection;