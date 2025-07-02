import RestaurantCard from "./restaurant/RestaurantCard.tsx";
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';

const Home = () => {
    const restaurants = [
        {
            id: 1,
            name: 'Amigos',
            description: 'A nice place with delicious food.',
            image: 'src/assets/amigos.png',
            sections: [
                {
                    title: 'Breakfast',
                    food: [{
                        id: "1",
                        image: 'src/assets/amigos.png',
                        title: 'Omlet',
                        description: 'Lepce, pleskavica, marula, pomfrit',
                    },
                        {
                            id: "2",
                            image: 'src/assets/amigos.png',
                            title: 'Salata',
                            description: 'Lepce, pleskavica, marula, pomfrit',
                        },
                        {
                            id: "13",
                            image: 'src/assets/amigos.png',
                            title: 'Tricolore',
                            description: 'Lepce, pleskavica, marula, pomfrit',
                        },
                        {
                            id: "14",
                            image: 'src/assets/amigos.png',
                            title: 'Tricolore',
                            description: 'Lepce, pleskavica, marula, pomfrit',
                        },
                        {
                            id: "15",
                            image: 'src/assets/amigos.png',
                            title: 'Tricolore',
                            description: 'Lepce, pleskavica, marula, pomfrit',
                        },
                        {
                            id: "16",
                            image: 'src/assets/amigos.png',
                            title: 'Tricolore',
                            description: 'Lepce, pleskavica, marula, pomfrit',
                        },
                        {
                            id: "17",
                            image: 'src/assets/amigos.png',
                            title: 'Tricolore',
                            description: 'Lepce, pleskavica, marula, pomfrit',
                        },
                        {
                            id: "18",
                            image: 'src/assets/amigos.png',
                            title: 'Tricolore',
                            description: 'Lepce, pleskavica, marula, pomfrit',
                        }],
                    Icon: BreakfastDiningIcon
                },
                {
                    title: 'Meat',
                    food: [{
                        id: "3",
                        image: 'src/assets/amigos.png',
                        title: 'Burger',
                        description: 'Lepce, pleskavica, marula, pomfrit',
                    },
                        {
                            id: "4",
                            image: 'src/assets/amigos.png',
                            title: 'Pileski stek',
                            description: 'Lepce, pleskavica, marula, pomfrit',
                        }],
                    Icon: KebabDiningIcon
                },
                {
                    title: 'Vegetarian',
                    food: [{
                        id: "5",
                        image: 'src/assets/amigos.png',
                        title: 'Falafel',
                        description: 'Lepce, pleskavica, marula, pomfrit',
                    },
                        {
                            id: "6",
                            image: 'src/assets/amigos.png',
                            title: 'Vege pica',
                            description: 'Lepce, pleskavica, marula, pomfrit',
                        }],
                    Icon: RiceBowlIcon
                }
            ],
            shifts: [
                { title: '11:15', content: 'Outdoor seating and reservation policy.', isFull: false, personImage: 'src/assets/AMD.JPG'},
                { title: '12:00', content: 'Beverages and dessert options.', isFull: true },
                { title: '12:45', content: 'Loyalty programs and special offers.', isFull: false }
            ]
        },
        {
            id: 2,
            name: 'Enriko',
            description: 'Cozy atmosphere and great service.',
            image: 'src/assets/amigos.png',
            sections: [
                {
                    title: 'Breakfast',
                    food: [{
                        id: "7",
                        image: 'src/assets/amigos.png',
                        title: 'Margarite',
                        description: 'Lepce, pleskavica, marula, pomfrit',
                    },
                        {
                            id: "8",
                            image: 'src/assets/amigos.png',
                            title: 'Kapricioza',
                            description: 'Lepce, pleskavica, marula, pomfrit',
                        }],
                    Icon: BreakfastDiningIcon
                },
                {
                    title: 'Meat',
                    food: [{
                        id: "9",
                        image: 'src/assets/amigos.png',
                        title: 'Quatro staggioni',
                        description: 'Lepce, pleskavica, marula, pomfrit',
                    },
                        {
                            id: "10",
                            image: 'src/assets/amigos.png',
                            title: 'Napoletana',
                            description: 'Lepce, pleskavica, marula, pomfrit',
                        }],
                    Icon: KebabDiningIcon
                },
                {
                    title: 'Vegetarian',
                    food: [{
                        id: "11",
                        image: 'src/assets/amigos.png',
                        title: 'Cezar',
                        description: 'Lepce, pleskavica, marula, pomfrit',
                    },
                        {
                            id: "12",
                            image: 'src/assets/amigos.png',
                            title: 'Tricolore',
                            description: 'Lepce, pleskavica, marula, pomfrit',
                        }],
                    Icon: RiceBowlIcon
                }
            ],
            shifts: [
                { title: '11:30', content: 'Outdoor seating and reservation policy.', isFull: false },
                { title: '12:15', content: 'Beverages and dessert options.', isFull: false },
                { title: '13:00', content: 'Loyalty programs and special offers.', isFull: true }
            ]
        },
        // Add more restaurants as needed
    ];

    return (
        <div className="restaurant-list">
            {restaurants.map((restaurant) => (
                <RestaurantCard
                    key={restaurant.id}
                    name={restaurant.name}
                    description={restaurant.description}
                    image={restaurant.image}
                    sections={restaurant.sections}
                    shifts={restaurant.shifts}
                />
            ))}
        </div>
    );
};

export default Home;
