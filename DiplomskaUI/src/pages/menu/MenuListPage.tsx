import * as React from "react";

import '../../styles/MenuSection.css';
import MenuItem from "./MenuItem.tsx";

interface MenuItemsProps {
    items: {
        id: string;
        image: string;
        title: string;
        description: string;
    }[];
}

const MenuListPage: React.FC<MenuItemsProps> = ({items}) => {
    return (
        <div className='menuDiv'>
            {items.map(item => <MenuItem item={item}/>)}
        </div>
    );
};

export default MenuListPage;