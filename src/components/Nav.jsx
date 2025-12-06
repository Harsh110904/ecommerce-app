import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/reducers/userSlice'

const Nav = () => {
    const user = useSelector((state) => state.user.data)
    const cartItems = useSelector((state) => state.cart.carts)
    const dispatch = useDispatch()

    const handleLogout = () => {
        localStorage.removeItem("user")
        dispatch(logout())
    }

    const isAdmin = user?.role === "admin" || user?.isAdmin

    return (
        <nav className='flex justify-between items-center py-5 px-10'>
            <div className='flex items-center gap-x-10'>
                <NavLink to="/" className="text-white hover:text-blue-400">Home</NavLink>
                <NavLink to="/products" className="text-white hover:text-blue-400">Products</NavLink>
                {isAdmin && (
                    <NavLink to="/admin/create-product" className="text-green-400 hover:text-green-300">
                        Create Product
                    </NavLink>
                )}
            </div>
            
            <div className='flex items-center gap-x-6'>
                {user && (
                    <div className='flex items-center gap-x-4'>
                        <span className='text-gray-300'>
                            Cart ({cartItems.length})
                        </span>
                        <div className='text-white'>
                            Welcome, {user.username}
                            {isAdmin && <span className='text-yellow-400 ml-2'>(Admin)</span>}
                        </div>
                        <button 
                            onClick={handleLogout}
                            className='text-red-400 hover:text-red-300'
                        >
                            Logout
                        </button>
                    </div>
                )}
                {!user && (
                    <div className='flex gap-x-4'>
                        <NavLink to="/login" className="text-white hover:text-blue-400">Login</NavLink>
                        <NavLink to="/register" className="text-white hover:text-blue-400">Register</NavLink>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Nav