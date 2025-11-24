import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { asyncregisteruser } from "../actions/userActions";
import { useDispatch } from "react-redux";

const Register = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch()
    const RegisterHandler = (user) => {
        console.log("Form data:", user)
        console.log("Dispatching asyncregisteruser...")
        dispatch(asyncregisteruser(user))
        console.log("Dispatch called")
    }
    return (
        <div className='min-h-[80vh] flex items-center justify-center'>
            <form onSubmit={handleSubmit(RegisterHandler)} className='flex flex-col gap-4 w-96 bg-gray-900 p-8 rounded-lg'>
                <h2 className='text-2xl font-bold text-white mb-3'>Register</h2>
                <input
                    {...register("username")}
                    type="text"
                    placeholder='Username'
                    className='px-4 py-3 rounded bg-white text-black border-2 border-gray-600 focus:outline-none focus:border-blue-500'
                />
                <input
                    {...register("password")}
                    type="password"
                    placeholder='Password'
                    className='px-4 py-3 rounded bg-white text-black border-2 border-gray-600 focus:outline-none focus:border-blue-500'
                />
                <button className='px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700'>
                    Register
                </button>
                <p className="flex justify-center items-center gap-x-2">Already have an account? <Link className="text-blue-300" to="/login">Login</Link></p>
            </form>
        </div>
    )
}

export default Register