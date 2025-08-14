import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { CategoryResponse } from "../../api/generated/model/category-response";
import { Category } from "../../api/index";
import { HttpStatusCode } from "axios";
import { MealResponse } from "../../api/generated/model/meal-response";
import { categoryIconMap } from "../../../src/util";
import MenuListPage from "../../pages/menu/MenuListPage";
import OrderSummary from "../../../src/pages/order/OrderSummary";
import { RestaurantResponse } from "../../../src/api/generated";

interface OrderStepContentProps {
    groupDinner?: boolean;
    selectedRestaurant: RestaurantResponse;
    allRestaurants: RestaurantResponse[];
    fastOrder?: boolean;
    onRestaurantChange: (restaurantId: string) => void;
}

const OrderStepContent: React.FC<OrderStepContentProps> = ({
   groupDinner,
   selectedRestaurant,
   allRestaurants,
   fastOrder,
   onRestaurantChange,
  }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [food, setFood] = useState<MealResponse[] | undefined>(undefined);

    const handleButtonClick = async (index: number) => {
        setSelectedIndex(index);
        const newSelectedSection = selectedRestaurant?.categories?.[index] ?? null;
        await fetchCategories(newSelectedSection);
    };

    const fetchCategories = async (category: CategoryResponse | null) => {
        if (category?.id != null) {
            const response = await Category.getMealsByCategory(category.id);
            if (response.status === HttpStatusCode.Ok) {
                setFood(response.data.meals);
            }
        }
    };

    useEffect(() => {
        if (selectedRestaurant?.categories && selectedRestaurant?.categories.length > 0) {
            fetchCategories(selectedRestaurant.categories[0]);
            setSelectedIndex(0);
        } else {
            setFood(undefined);
        }
    }, [selectedRestaurant]);

    return (
        <>
        {!groupDinner && (<><ButtonGroup
                className="restaurantSwitcher"
                variant="text"
                aria-label="Basic button group"
            >
                {allRestaurants?.map((r) => (
                    <Button
                        key={r.id}
                        onClick={() => onRestaurantChange(r.id ?? "")}
                        className={r.id === selectedRestaurant?.id ? "selectedBtn" : "unselectedBtn"}
                    >
                        {r.name}
                    </Button>
                ))}
            </ButtonGroup><ButtonGroup
                className="menuButtons"
                variant="text"
                aria-label="Basic button group"
            >
                {selectedRestaurant?.categories?.map((section: CategoryResponse, index: number) => {
                    const Icon = categoryIconMap[section.name ?? "default"] || categoryIconMap["default"];
                    return (
                        <Button
                            key={index}
                            onClick={() => handleButtonClick(index)}
                            className={selectedIndex === index ? "selectedBtn" : "unselectedBtn"}
                        >
                            {section.name} <Icon/>
                        </Button>
                    );
                })}
            </ButtonGroup></>
)}
            <div className="grid">
                <MenuListPage meals={food} />
                <OrderSummary
                    restaurantId={selectedRestaurant?.id}
                    shifts={selectedRestaurant?.shifts}
                    fastOrder={fastOrder}
                    groupDinner={groupDinner}
                />
            </div>
        </>
    );
};

export default OrderStepContent;
