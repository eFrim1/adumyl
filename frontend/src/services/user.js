import {apiRequest} from "./backendAPI";

export const updateProfile = async (payload) => {
    const url = "/user/"
    return await apiRequest({
        url: url,
        method: "PATCH",
        payload: payload
    });
};

export const updatePassword = async (payload) => {
    const url = "/change_password/"
    return await apiRequest({
        url: url,
        method: "PUT",
        payload: payload
    });
}

export const getUser = async () => {
    const url = "/user/"
    return await apiRequest({
        url: url,
        method: "GET",
    });
}

