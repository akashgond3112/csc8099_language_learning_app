import axios from "axios";

export function setLocalStorageItems(
    access_token?: string | undefined,
    refresh_token?: string | undefined,
    isLoggedIn?: string | undefined,
    userId?: string | undefined,
    userEmailId?: string | undefined,
) {
    if (access_token !== undefined) localStorage.setItem("access_token", access_token);
    if (refresh_token !== undefined) localStorage.setItem("refresh_token", refresh_token);
    if (isLoggedIn !== undefined) localStorage.setItem("isLoggedIn", isLoggedIn);
    if (userId !== undefined) localStorage.setItem("userId", userId);
    if (userEmailId !== undefined) localStorage.setItem("userEmailId", userEmailId);

}


export function clearLocalStorageItems() {
    localStorage.setItem("access_token", "");
    localStorage.setItem("refresh_token", "");
    localStorage.setItem("isLoggedIn", "");
    localStorage.setItem("userId", "");
    localStorage.setItem("userEmailId", "");
}

export default axios.create({
    baseURL: process.env.REACT_APP_BASE_USER_URL
});

export const axiosPrivate = axios.create({
    baseURL: process.env.REACT_APP_BASE_USER_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const createAxiosInstance = (token: string) => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BASE_USER_URL,
        headers: {
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        }
    });

    return instance;
};

// Function to set a cookie with a specified name, value, and expiration date
export function setCookie(name: string, value: string) {
    const expirationDate = new Date(); // Set the expiration date
    expirationDate.setDate(expirationDate.getDate() + 7); // Expires in 7 days


    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; path=/`;
}

// Function to delete a cookie by setting its expiration date to a past time
export function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Example usage:
deleteCookie('access_token');
deleteCookie('refresh_token');

