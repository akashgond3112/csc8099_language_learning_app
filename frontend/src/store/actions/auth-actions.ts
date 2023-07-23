import { Dispatch } from "redux"
import { setIsLoggedIn, setRefreshToken, setToken } from "../slice/auth-slice"
import axios from "axios";
import { setFirstLanguage, setFirstLanguageImageUrl, setImageUrl, setSecondLanguage, setSecondLanguageImageUrl } from "../slice/nav-slice";
import { setLocalStorageItems, clearLocalStorageItems } from "../../utils/Utillities"


export const postRegister = (userRegister: object) => {
    return async (dispatch: Dispatch) => {
        try {
            const url: string = `${process.env.REACT_APP_BASE_USER_URL}/api/v1/user/register`;
            const data = await axios.post(url, userRegister);
            if (data.status === 201) {

                const accessTokenValue: string = data.data.get("access_token");
                const refreshTokenValue: string = data.data.get("refresh_token");
                const isLoggedInValue: boolean = true;

                dispatch(setToken(accessTokenValue));
                dispatch(setRefreshToken(refreshTokenValue));
                dispatch(setIsLoggedIn(isLoggedInValue));

                /* Set the value in local storage as well , so that in case page get refreshed, next the default value will get set by redux in intial sate */
                setLocalStorageItems(accessTokenValue, refreshTokenValue, isLoggedInValue.toString());
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
            const url: string = `${process.env.REACT_APP_BASE_USER_URL}/api/v1/auth/login`;
            const data = await axios.post(url, userCredentials);

            if (data.status === 200) {

                const accessTokenValue: string = data.data.access_token;
                const refreshTokenValue: string = data.data.refresh_token;
                const isLoggedInValue: boolean = true;

                console.log(accessTokenValue);
                console.log(refreshTokenValue);


                dispatch(setToken(accessTokenValue));
                dispatch(setRefreshToken(refreshTokenValue));
                dispatch(setIsLoggedIn(isLoggedInValue));

                /* Set the value in local storage as well , so that in case page get refreshed, next the default value will get set by redux in intial sate */
                setLocalStorageItems(accessTokenValue, refreshTokenValue, isLoggedInValue.toString());
            } else {
                throw new Error(data.data);
            }
        } catch (error) {
            return error;
        }
    }
}

export const getUserInfo = (token: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const url: string = `${process.env.REACT_APP_BASE_USER_URL}/api/v1/auth/userinfo`;
            const data = await axios.get(url, config);
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
            const data = await axios.post(url, config);
            if (data.status === 200) {
                dispatch(setToken(""));
                dispatch(setRefreshToken(""));
                dispatch(setIsLoggedIn(false));
                dispatch(setFirstLanguage(""))
                dispatch(setSecondLanguage(""))
                dispatch(setImageUrl(""));
                clearLocalStorageItems();
            } else {
                throw new Error(data.data);
            }
        } catch (error) {
            return error;
        }
    }

};


