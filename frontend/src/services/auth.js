import {apiRequest} from "./backendAPI";

export const loginUser = async (payload) => {
    const url = "/auth/login/"
    return await apiRequest({
        url: url,
        method: "POST",
        payload: payload
    });
};

export const registerUser = async (payload) => {
    const url = "/auth/signup/"
    return await apiRequest({
        url: url,
        method: "POST",
        payload: payload
    });
}