import { apiRequest } from "./backendAPI";

export const getMenuItemsAll = async (payload) => {
    const url = "/menu-items-all/";
    return await apiRequest({
        url: url,
        method: "POST",
        payload: payload,
    });
}

export const getMenuItems = async () => {
    const url = "/menu_item/";
    return await apiRequest({
        url: url,
        method: "GET",
    });
}

export const addMenuItem = async (menuItem) => {
    const url = "/menu_item/";
    return await apiRequest({
        url: url,
        method: "POST",
        payload: menuItem,
    });
};

export const deleteMenuItem = async (id) => {
    const url = `/menu_item/${id}/`;
    return await apiRequest({
        url: url,
        method: "DELETE",
    });
};

export const updateMenuItem = async (id, menuItem) => {
    const url = `/menu_item/${id}/`;
    return await apiRequest({
        url: url,
        method: "PATCH",
        payload: menuItem,
    });
};

