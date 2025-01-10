import {apiRequest} from "./backendAPI";

export const getOrderHistory = async (payload) => {
    const url = "/order_history/";
    return await apiRequest({
        url: url,
        method: "POST",
        payload: payload,
    });
}

export const fetchOrders = async () => {
    const url = "/orders/";
    return await apiRequest({
        url: url,
        method: "GET",
    });
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
    const url = `/orders/${orderId}/`;
    return await apiRequest({
        url: url,
        method: "PATCH",
        payload: { status },
    });
};