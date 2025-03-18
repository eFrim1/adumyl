import axios from "axios";

const getCsrfTokenFromCookies = () => {
    const cookies = document.cookie.split('; ');
    const csrfCookie = cookies.find((cookie) => cookie.startsWith('csrftoken='));
    return csrfCookie ? csrfCookie.split('=')[1] : null;
};

export const apiRequest = async ({
                                     url,
                                     method = "GET",
                                     payload = null,
                                     customHeaders = {},
                                 }) => {
    const csrfToken = getCsrfTokenFromCookies(); // Ensure CSRF token handling

    if (!csrfToken) {
        throw new Error("CSRF token is missing. Please refresh the page.");
    }

    try {
        const response = await axios({
            url,
            method,
            data: payload,
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
                ...customHeaders, // Merge custom headers
            },
            withCredentials: true, // Include cookies in the request
        });

        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error(`Unexpected response with status ${response.status}`);
        }
    } catch (error) {
        // Generalized error handling
        if (error.response) {
            const errorMessage = error.response.data.error || "An error occurred.";
            throw new Error(`Error ${error.response.status}: ${errorMessage}`);
        } else if (error.request) {
            throw new Error("No response from the server. Please try again later.");
        } else {
            throw new Error("Request error. Please check your input and try again.");
        }
    }
};
