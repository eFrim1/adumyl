import {apiRequest} from "./backendAPI";

export const fetchOrderById = async (id) => {
    const url = `/orders/${id}/`;
    return await apiRequest({
        url: url,
        method: "POST",
    });
};

export const fetchOrderHistory = async () => {
    const url = "/orders-all/";
    return await apiRequest({
        url: url,
        method: "GET",
    });
};

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

export const addOrder = async (payload) => {
    const url = '/orders/';
    return await apiRequest({
        url: url,
        method: "POST",
        payload: payload,
    });
}

export const addOrderItem = async (payload) => {
    const url = "/order-items/"; // Replace with your actual endpoint
    return await apiRequest({
        url: url,
        method: "POST",
        payload: payload,
    });
};