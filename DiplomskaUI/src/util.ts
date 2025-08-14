import KebabDiningIcon from '@mui/icons-material/KebabDining';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import FastFoodIcon from "@mui/icons-material/FastFood";
import {COMMENT, EAT_IN_OR_TAKE_AWAY, SHIFT, USER} from '../src/fieldNames.ts';
import { MealResponse } from '../src/api/generated/model/meal-response.ts';
import { OrderRequest } from '../src/api/generated/model/order-request.ts';
import { FastOrderObject } from '../src/api/generated/model/fast-order-object.ts';
import {GroupDinnerProposalRequest, OrderResponse, UserResponse} from "../src/api/generated";


export const categoryIconMap: Record<string, React.ElementType> = {
    meat: KebabDiningIcon,
    pasta: LocalPizzaIcon,
    breakfast: BreakfastDiningIcon,
    vegetarian: RiceBowlIcon,
    default: FastFoodIcon,
};

export type OrderFormValues = {
    [SHIFT]: string;
    [EAT_IN_OR_TAKE_AWAY]: string;
    [COMMENT]: string;
    [USER]: UserResponse;
};

export const prepareOrderRequest = (
    values: OrderFormValues,
    orderItem: MealResponse,
    restaurantId: string
): OrderRequest =>
    ({
        restaurantId: restaurantId,
        shiftId: values.shift,
        mealId: orderItem.id,
        comment: values.comment,
        eatInTakeAway: values.eatInOrTakeAway,

    } as OrderRequest);

export const prepareOrderRequestFromFastOrder = (
    orderItem: FastOrderObject,
): OrderRequest =>
    ({
        restaurantId: orderItem.restaurantId,
        shiftId: orderItem.shiftId,
        mealId: orderItem.mealId,
        comment: orderItem.comment,
        fastOrder: true,
        eatInTakeAway: orderItem.eatInTakeAway,

    } as OrderRequest);

export const prepareProposeGroupDinnerRequest = (
    orderItem: OrderResponse,
    restaurantId: string,
    invitedPersonIds: string[]
): GroupDinnerProposalRequest =>
    ({
         restaurantId: restaurantId,
         shiftId: orderItem.shiftId,
        invitedPersonIds: invitedPersonIds,
        } as GroupDinnerProposalRequest);
