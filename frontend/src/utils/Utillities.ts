
export function setLocalStorageItems(
    access_token: string,
    refresh_token: string,
    isLoggedIn: string,
    userId?: string | undefined
) {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("isLoggedIn", isLoggedIn);

    if (userId !== undefined) {

        localStorage.setItem("userId", userId);
    }
}


export function clearLocalStorageItems() {
    localStorage.setItem("access_token", "");
    localStorage.setItem("refresh_token", "");
    localStorage.setItem("isLoggedIn", "");
    localStorage.setItem("userId", "");
}

