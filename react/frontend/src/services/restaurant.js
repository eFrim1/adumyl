import {apiRequest} from "./backendAPI";

export const createRestaurant = async (payload) => {
    const url = "/restaurant/"
    return await apiRequest({
        url: url,
        method: "POST",
        payload: payload
    });
}

export const getRestaurant = async () => {
    const url = "/restaurant/";
    return await apiRequest({
        url: url,
        method: "GET",
    });
};

export const updateRestaurant = async (payload) => {
    const url = "/restaurant/"
    return await apiRequest({
        url: url,
        method: "PATCH",
        payload: payload
    });
}