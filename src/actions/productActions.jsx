import axios from "../api/axiosconfig";
import { loadproduct } from "../store/reducers/productSlice";

export const asyncloadproducts = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/products")
        dispatch(loadproduct(data));
    } catch (error) {
        console.log(error)
    }
}
export const asynccreateproduct = (product) => async (dispatch, getState) => {
    try {
        const res = await axios.post("/products", product)
        dispatch(asyncloadproducts())
    } catch (error) {
        console.log(error)
    }
}

export const asyncupdateproduct = (id, updatedProduct) => async (dispatch) => {
    try {
        const res = await axios.put(`/products/${id}`, updatedProduct)
        dispatch(asyncloadproducts()) // Reload all products to get updated data
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}