import {apiRequest} from "./backendAPI";

export const getOrderHistory = async (payload) => {
    const url = "/order_history/";
    return await apiRequest({
        url: url,
        method: "POST",
        payload: payload,
    });
}