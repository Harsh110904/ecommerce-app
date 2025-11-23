import axios from "../api/axiosconfig";
import { loaduser } from "./reducers/userSlice";

export const asyncgetproducts = () => async (dispatch, getState) => {
    try {
        const res = await axios.get("/products")
        dispatch(loaduser(res.data))
    } catch (error) {
        console.log(error)
    }
}


