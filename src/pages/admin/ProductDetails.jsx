import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { asyncloadproducts, asyncupdateproduct } from "../../actions/productActions";
import { addtocart } from "../../store/reducers/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products);
  const currentUser = useSelector((state) => state.user.data);

  const product = products?.find((product) => product.id == id);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: ""
  });

  const [imageError, setImageError] = useState(false);
  const [previewImageError, setPreviewImageError] = useState(false);

  // Check if user is admin (you can modify this logic based on your user structure)
  const isAdmin = currentUser?.role === "admin" || currentUser?.isAdmin;

  useEffect(() => {
    if (products.length === 0) {
      dispatch(asyncloadproducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    if (product) {
      setEditForm({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        image: product.image || "",
        category: product.category || ""
      });
      // Reset image errors when product changes
      setImageError(false);
      setPreviewImageError(false);
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset image error when image URL changes
    if (name === 'image') {
      setPreviewImageError(false);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      await dispatch(asyncupdateproduct(id, editForm));
      setIsEditing(false);
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product");
    }
  };

  const handleAddToCart = () => {
    dispatch(addtocart(product));
    alert("Product added to cart!");
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handlePreviewImageError = () => {
    setPreviewImageError(true);
  };

  const getPlaceholderImage = () => {
    return "https://via.placeholder.com/400x400/374151/9CA3AF?text=No+Image";
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Product not found</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          className="text-blue-400 hover:text-blue-300 mb-6 flex items-center"
        >
          ← Back to Products
        </button>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="mb-6 flex gap-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-lg transition-colors ${isEditing
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
            >
              {isEditing ? 'Cancel Edit' : 'Edit Product'}
            </button>

            {isEditing && (
              <button
                onClick={handleUpdateProduct}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Save Changes
              </button>
            )}
          </div>
        )}

        <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="bg-white rounded-lg p-6 flex items-center justify-center">
              {isEditing ? (
                <div className="w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={editForm.image}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter image URL"
                  />
                  {editForm.image && (
                    <div className="mt-4">
                      <img
                        src={previewImageError ? getPlaceholderImage() : editForm.image}
                        alt="Preview"
                        className="w-full h-64 object-contain"
                        onError={handlePreviewImageError}
                      />
                      {previewImageError && (
                        <p className="text-red-500 text-sm mt-2">
                          Image failed to load. Using placeholder.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-96 flex items-center justify-center">
                  <img
                    src={imageError ? getPlaceholderImage() : product.image}
                    alt={product.title}
                    className="w-full h-full object-contain"
                    onError={handleImageError}
                  />
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="text-white">
              {/* Title */}
              {isEditing ? (
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-bold mb-2">
                    Product Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              ) : (
                <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              )}

              {/* Category */}
              {isEditing ? (
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-bold mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={editForm.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              ) : (
                <p className="text-blue-400 text-sm uppercase tracking-wide mb-4">
                  {product.category}
                </p>
              )}

              {/* Price */}
              {isEditing ? (
                <div className="mb-6">
                  <label className="block text-gray-300 text-sm font-bold mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={editForm.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              ) : (
                <p className="text-green-400 text-4xl font-bold mb-6">
                  ${product.price}
                </p>
              )}

              {/* Description */}
              {isEditing ? (
                <div className="mb-6">
                  <label className="block text-gray-300 text-sm font-bold mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              ) : (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Description</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              {!isEditing && (
                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button className="border border-gray-600 hover:border-gray-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                    Add to Wishlist
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Product Info */}
        {!isEditing && (
          <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-white text-xl font-semibold mb-4">Product Information</h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <p><span className="font-semibold">Product ID:</span> {product.id}</p>
                <p><span className="font-semibold">Category:</span> {product.category}</p>
              </div>
              <div>
                <p><span className="font-semibold">Price:</span> ${product.price}</p>
                <p><span className="font-semibold">Availability:</span> In Stock</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;