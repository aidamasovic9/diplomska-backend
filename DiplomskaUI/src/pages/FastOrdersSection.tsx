import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../src/context/store/store.ts";
import {useEffect} from "react";
import {fetchFastOrders} from "../../src/context/store/fastOrdersSlice.ts";
import {CircularProgress, Slider} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { OrderResponse} from '../api/generated/model/order-response.ts';

const FastOrdersSection = () => {
    const dispatch = useDispatch();
    const {fastOrders, loading, error} = useSelector((state: RootState) => state.fastOrders);

    useEffect(() => {
        dispatch(fetchFastOrders('1') as any);
    }, [dispatch]);

    if (loading) return <CircularProgress/>;
    if (error) return <div>Error: {error}</div>;

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
    };

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const onItemClick = (item: OrderResponse) => {
        console.log(item);
    };

    return (
        <Slider {...settings}>
            {fastOrders.orders?.map(item => (
                <div key={item.orderId} onClick={() => onItemClick(item)}>
                    <Card sx={{m: 1, cursor: 'pointer'}}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={`${baseUrl}/images/${item.mealImage}`}
                            alt="restaurant image"
                        />
                        <CardContent>
                            <Typography>{item.mealName}</Typography>
                            <Typography>{item.restaurantName}</Typography>
                            <Typography>{item.shiftName}</Typography>
                            <Typography>{item.comment}</Typography>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </Slider>
    );
};

export default FastOrdersSection;