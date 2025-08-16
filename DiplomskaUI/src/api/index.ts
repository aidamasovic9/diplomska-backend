import { RestaurantApi } from '../api/generated/api/restaurant-api';
import { UserApi } from '../api/generated/api/user-api';
import { CategoryApi } from '../api/generated/api/category-api.ts'
import { OrderApi } from '../api/generated/api/order-api'
import axiosInstance from '../api/axiosInstance.ts';
import {DinnerProposalApi} from "../api/generated/api/dinner-proposal-api.ts";
import {MealApi} from "../api/generated/api/meal-api.ts";
import {AuthenticationApi} from "../api/generated/api/authentication-api.ts";
import {Configuration} from "../api/generated";

export const API_BASE_URL = 'http://localhost:8080/api';
const apiConfig = new Configuration({
    accessToken: () => sessionStorage.getItem("token") || "",
});

export const Restaurant = new RestaurantApi(apiConfig, API_BASE_URL, axiosInstance);
export const User = new UserApi(apiConfig, API_BASE_URL, axiosInstance);
export const Category = new CategoryApi(apiConfig, API_BASE_URL, axiosInstance);
export const Order = new OrderApi(apiConfig, API_BASE_URL, axiosInstance);
export const DinnerProposal = new DinnerProposalApi(apiConfig, API_BASE_URL, axiosInstance);
export const Meal = new MealApi(apiConfig, API_BASE_URL, axiosInstance);
export const Auth = new AuthenticationApi(apiConfig, API_BASE_URL, axiosInstance);