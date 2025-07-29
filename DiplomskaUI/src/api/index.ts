import { RestaurantApi } from '../api/generated/api/restaurant-api';
import { UserApi } from '../api/generated/api/user-api';
import { MealApi } from '../api/generated/api/meal-api'
import { OrderApi } from '../api/generated/api/order-api'
import axiosInstance from '../api/axiosInstance.ts';

export const API_BASE_URL = 'http://localhost:8080/api';

export const Restaurant = new RestaurantApi(undefined, API_BASE_URL, axiosInstance);
export const User = new UserApi(undefined, API_BASE_URL, axiosInstance);
export const Meal = new MealApi(undefined, API_BASE_URL, axiosInstance);
export const Order = new OrderApi(undefined, API_BASE_URL, axiosInstance);