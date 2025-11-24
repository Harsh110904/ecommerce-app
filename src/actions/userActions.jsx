import axios from "../api/axiosconfig";
import { loaduser } from "../store/reducers/userSlice";

export const asyncregisteruser = (user) => async (dispatch) => {
    try {
        const res = await axios.post("/users", user)
        dispatch(loaduser(res.data))
    } catch (error) {
        console.log(error)
    }
}
export const asyncloginuser = (user) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/users?username=${user.username}&password=${user.password}`)

        if (data.length > 0) {
            console.log("Login successful:", data[0]);
            localStorage.setItem("user", JSON.stringify(data[0]))
            dispatch(loaduser(data[0]))
        } else {
            console.log("Invalid credentials")
        }
    } catch (error) {
        console.log(error);
    }
}
export const asynclogoutser = (user) => async (dispatch, getState) => {
    try {

        localStorage.setItem("user", null)
    } catch (error) {
        console.log(error);
    }
}
export const asynccuurentuser = (user) => async (dispatch, getState) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) dispatch(loaduser(user))
        else console.log("User not Logged in")
    } catch (error) {
        console.log(error);
    }
}



