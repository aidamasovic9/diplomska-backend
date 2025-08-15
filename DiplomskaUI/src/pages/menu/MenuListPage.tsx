import * as React from "react";

import '../../styles/MenuSection.css';
import MenuItem from "./MenuItem.tsx";
import { MealResponse } from '../../api/generated/model/meal-response.ts';

type MenuListPageProps = {
    meals: MealResponse[] | undefined;
};

const MenuListPage: React.FC<MenuListPageProps> = ({meals}: MenuListPageProps) => {
    return (
        <div className='menuDiv'>
            {meals?.map(item => <MenuItem initialItem={item} key={item.id}/>)}
        </div>
    );
};

export default MenuListPage;