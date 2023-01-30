import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";


export const recvPlans = () => {
    return axios({
    method: 'get',
    url: `${API_BASE_URL}/goals`,
    headers: {
        Authorization: TOKEN()
    },
    })
    .then((res) => {
        return res.data.data
    })
}

