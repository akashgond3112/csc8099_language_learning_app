import { Dispatch } from "redux"
import { setIsLoggedIn, setRefreshToken, setToken, } from "../slice/auth-slice"
import axios from "../../utils/Utillities";
import setCookie from "../../utils/Utillities";
import deleteCookie from "../../utils/Utillities";
import { setFirstLanguage, setFirstLanguageImageUrl, setImageUrl, setSecondLanguage, setSecondLanguageImageUrl } from "../slice/nav-slice";
import { setLocalStorageItems, clearLocalStorageItems } from "../../utils/Utillities"
import { AxiosInstance } from "axios";
import { NavigateFunction } from "react-router-dom";


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

export const getUserInfo = (isMounted: boolean, controller: AbortController, axiosprivate: AxiosInstance, location: any, navigate: NavigateFunction) => {

    return async (dispatch: Dispatch) => {

        const getUserDetails = async () => {

            try {

                const response = await axiosprivate.get(`/api/v1/auth/userinfo`, {
                    signal: controller.signal,
                });

                const result: any = response.data;

                return result;

            } catch (err) {
                console.error("Something went wrong", err);
                navigate("/", { state: { from: location }, replace: true });
                throw err; // Propagate the error to the calling function
            }
        };

        try {
            const data = isMounted && await getUserDetails();
            
            if (isMounted) {

                if (data.nativeLanguage) dispatch(setFirstLanguage(data.nativeLanguage))
                if (data.nativeLanguageImageUrl) dispatch(setFirstLanguageImageUrl(data.nativeLanguageImageUrl))
                if (data.targetLanguage) dispatch(setSecondLanguage(data.targetLanguage))
                if (data.targetLanguageImageUrl) dispatch(setSecondLanguageImageUrl(data.targetLanguageImageUrl))
                if (data.imageUrl) dispatch(setImageUrl(data.imageUrl))


                /* Set local storage */
                /* Set the value in local storage as well*/
                setLocalStorageItems(undefined, undefined, undefined, data.userId, data.email);
            }
        } catch (err) {
            console.log(err);

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
