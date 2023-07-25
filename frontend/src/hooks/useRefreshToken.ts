import axios from "../utils/Utillities"

const useRefreshToken = () => {

    const refresh = async () => {

        const response = await axios.get("/api/v1/auth/refresh-token", {
            withCredentials: true
        })

        console.log("New Toke : ", response.data.access_token);

        return response.data.access_token;

    }

    return refresh;

}

export default useRefreshToken


