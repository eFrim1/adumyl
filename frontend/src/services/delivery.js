import {apiRequest} from "./backendAPI";

export const registerCourier = async (vehicle) => {
    const url = "/courier/";
    return await apiRequest({
        url: url,
        method: "POST",
        payload: { vehicle },
    });
};

// Fetch delivery requests
export const fetchDeliveryRequests = async () => {
    const url = "/delivery-requests/";
    return await apiRequest({
        url: url,
        method: "GET",
    });
};

// Accept a delivery request
export const acceptDeliveryRequest = async (orderId) => {
    const url = `/delivery-requests/${orderId}/`;
    return await apiRequest({
        url: url,
        method: "PATCH",
    });
};

export const getCourier = async() => {
    const url = "/courier/";
    return await  apiRequest({
        url: url,
        method: "GET",
    });
}