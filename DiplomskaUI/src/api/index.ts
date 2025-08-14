import { RestaurantApi } from '../api/generated/api/restaurant-api';
import { UserApi } from '../api/generated/api/user-api';
import { CategoryApi } from '../api/generated/api/category-api.ts'
import { OrderApi } from '../api/generated/api/order-api'
import axiosInstance from '../api/axiosInstance.ts';
import {DinnerProposalApi} from "../api/generated/api/dinner-proposal-api.ts";

export const API_BASE_URL = 'http://localhost:8080/api';

export const Restaurant = new RestaurantApi(undefined, API_BASE_URL, axiosInstance);
export const User = new UserApi(undefined, API_BASE_URL, axiosInstance);
export const Category = new CategoryApi(undefined, API_BASE_URL, axiosInstance);
export const Order = new OrderApi(undefined, API_BASE_URL, axiosInstance);
export const DinnerProposal = new DinnerProposalApi(undefined, API_BASE_URL, axiosInstance);