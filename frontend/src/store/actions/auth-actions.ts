import { Dispatch } from "redux"
import { setIsLoggedIn, setRefreshToken, setToken, } from "../slice/auth-slice"
import axios from "../../utils/Utillities";
import setCookie from "../../utils/Utillities";
import deleteCookie from "../../utils/Utillities";
import { setFirstLanguage, setFirstLanguageImageUrl, setImageUrl, setSecondLanguage, setSecondLanguageImageUrl } from "../slice/nav-slice";
import { setLocalStorageItems, clearLocalStorageItems } from "../../utils/Utillities"


export const postRegister = (userRegister: object) => {
    return async (dispatch: Dispatch) => {
        try {
            const url: string = `/api/v1/user/register`;
            const data = await axios.post(url, userRegister);
            if (data.status === 201) {

                const isLoggedInValue: boolean = true;

                dispatch(setIsLoggedIn(isLoggedInValue));
                dispatch(setToken(data.data.access_token));
                dispatch(setRefreshToken(data.data.refresh_token));

                /* Set the value in local storage as well*/
                setLocalStorageItems(data.data.access_token, data.data.refresh_token, isLoggedInValue.toString());
                /* Set the tokens in cookies */
                setCookie("access_token", data.data.access_token);
                setCookie("refresh_token", data.data.refresh_token);

            } else {
                throw new Error(data.data);
            }
        } catch (error) {
            return error;
        }
    }

};

export const postLogIn = (userCredentials: object) => {

    return async (dispatch: Dispatch) => {
        try {
            const url: string = `/api/v1/auth/login`;
            const data = await axios.post(url, userCredentials);

            if (data.status === 200) {

                const isLoggedInValue: boolean = true;

                dispatch(setToken(data.data.access_token));
                dispatch(setRefreshToken(data.data.refresh_token));
                dispatch(setIsLoggedIn(true));

                /* Set the value in local storage as well*/
                setLocalStorageItems(data.data.access_token, data.data.refresh_token, isLoggedInValue.toString());
                /* Set the tokens in cookies */
                setCookie("access_token", data.data.access_token);
                setCookie("refresh_token", data.data.refresh_token);

            } else {
                throw new Error(data.data);
            }
        } catch (error) {
            return error;
        }
    }
}

export const getUserInfo = (token: string) => {
    console.log("token : ", token);

    return async (dispatch: Dispatch) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const url: string = `/api/v1/auth/userinfo`;
            const data = await axios.get(url, config);
            if (data.status === 200) {
                if (data.data.nativeLanguage) dispatch(setFirstLanguage(data.data.nativeLanguage))
                if (data.data.nativeLanguageImageUrl) dispatch(setFirstLanguageImageUrl(data.data.nativeLanguageImageUrl))
                if (data.data.targetLanguage) dispatch(setSecondLanguage(data.data.targetLanguage))
                if (data.data.targetLanguageImageUrl) dispatch(setSecondLanguageImageUrl(data.data.targetLanguageImageUrl))
                if (data.data.imageUrl) dispatch(setImageUrl(data.data.imageUrl))


                /* Set local storage */
                /* Set the value in local storage as well*/
                setLocalStorageItems(undefined, undefined, undefined, data.data.userId, data.data.email);
            } else {
                throw new Error(data.data);
            }
        } catch (error) {
            return error;
        }
    }

};


export const updateUserInfo = (token: string, userProfile: object) => {
    return async (dispatch: Dispatch) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const url: string = `${process.env.REACT_APP_BASE_USER_URL}/api/v1/user/profile`;
            const data = await axios.patch(url, userProfile, config);
            if (data.status === 200) {
                if (data.data.nativeLanguage) dispatch(setFirstLanguage(data.data.nativeLanguage))
                if (data.data.nativeLanguageImageUrl) dispatch(setFirstLanguageImageUrl(data.data.nativeLanguageImageUrl))
                if (data.data.targetLanguage) dispatch(setSecondLanguage(data.data.targetLanguage))
                if (data.data.targetLanguageImageUrl) dispatch(setSecondLanguageImageUrl(data.data.targetLanguageImageUrl))
                if (data.data.imageUrl) dispatch(setImageUrl(data.data.imageUrl))
            } else {
                throw new Error(data.data);
            }
        } catch (error) {
            return error;
        }
    }

};


export const postLogout = (token: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const url: string = `${process.env.REACT_APP_BASE_USER_URL}/api/v1/auth/logout`;
            const data = await axios.post(url, null, config);
            if (data.status === 200) {
                dispatch(setToken(""));
                dispatch(setRefreshToken(""));
                dispatch(setIsLoggedIn(false));
                dispatch(setFirstLanguage(""))
                dispatch(setFirstLanguageImageUrl(""))
                dispatch(setSecondLanguage(""))
                dispatch(setSecondLanguageImageUrl(""))
                dispatch(setImageUrl(""));
                clearLocalStorageItems();
                deleteCookie("access_token");
                deleteCookie("refresh_token");
            } else {
                throw new Error(data.data);
            }
        } catch (error) {
            return error;
        }
    }

};


