// import { axiosPrivate } from "../utils/Utillities";
import { createAxiosInstance } from "../utils/Utillities";
import { useEffect } from "react"
import useRefreshToken from "./useRefreshToken";
import { useAppSelector } from "../hooks/utils";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { token } = useAppSelector((state) => state.auth);

    const axiosPrivate = createAxiosInstance(token !== null ? token : "");

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(

            config => {
                if (!config.headers[`Authorization`]) {
                    config.headers[`Authorization`] = `Bearer ${token}`;
                }

                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response
            .use(
                response => response,
                async (error) => {
                    const prevRequest = error?.config;
                    if (error?.response?.status === 403 && !prevRequest?.sent) {
                        prevRequest.sent = true;
                        const newAccessToken = await refresh();
                        prevRequest.headers[`Authorization`] = `Bearer ${newAccessToken}`;
                        axiosPrivate(prevRequest)
                    }
                    return Promise.reject(error);
                }
            );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }

    }, [token, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate