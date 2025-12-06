import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { asyncloadproducts } from "../actions/productActions"
import { addtocart } from "../store/reducers/cartSlice"

const Products = () => {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.product.products)
    const [imageErrors, setImageErrors] = useState({})

    useEffect(() => {
        dispatch(asyncloadproducts())
    }, [])

    const handleAddToCart = (product) => {
        dispatch(addtocart(product));
        alert("Product added to cart!");
    };

    const handleImageError = (productId) => {
        setImageErrors(prev => ({
            ...prev,
            [productId]: true
        }));
    };

    const getPlaceholderImage = () => {
        return "https://via.placeholder.com/300x300/374151/9CA3AF?text=No+Image";
    };

    console.log("Products:", products)
    const renderproduct = products.map((product) => {
        return (
            <div
                className="bg-gray-800 rounded overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20"
                key={product.id}
            >
                <div className="bg-white p-4 h-[30vh] flex items-center justify-center">
                    <img
                        className="w-full h-full object-contain"
                        src={imageErrors[product.id] ? getPlaceholderImage() : product.image}
                        alt={product.title}
                        onError={() => handleImageError(product.id)}
                    />
                </div>

                <div className="p-4">
                    <h1 className="text-white font-semibold text-lg mb-2 line-clamp-2 h-14">
                        {product.title}
                    </h1>

                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {product.description.slice(0, 100)}...
                    </p>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                        <p className="text-green-400 font-bold text-xl">
                            ${product.price}
                        </p>
                        <button 
                            onClick={() => handleAddToCart(product)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Add to Cart
                        </button>
                    </div>

                    <Link
                        to={`/product/${product.id}`}
                        className="block text-center text-blue-400 hover:text-blue-300 mt-3 text-sm"
                    >
                        More Info →
                    </Link>
                </div>
            </div>
        )
    })

    return products.length > 0 ? (
        <div className="min-h-screen bg-gray-900 p-8">
            <h1 className="text-3xl font-bold text-white mb-8">Our Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {renderproduct}
            </div>
        </div>
    ) : (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <p className="text-white text-xl">Loading products...</p>
        </div>
    )

}

export default Products