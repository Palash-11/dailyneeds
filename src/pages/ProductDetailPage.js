import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../Api/productsApi";

function ProductDetailPage({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(id).then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <main className="p-4 max-w-4xl mx-auto">
      {/* Navigation Buttons (Top) */}
      <div className="mb-4">
        <button
          type="button"
          className="mb-4 bg-gray-200 p-2 rounded text-sm hover:bg-gray-300 transition"
          onClick={() => navigate("/products")}
        >
          Back To Products
        </button>

        <button
          type="button"
          className="ml-2 mt-4 bg-gray-700 p-2 text-white rounded text-sm hover:bg-gray-800 transition"
          onClick={() => navigate("/cart")}
        >
          Go to cart
        </button>
      </div>

      {/* Product Image and Details */}
      <div className="grid md:grid-cols-2 gap-6 bg-white p-4 rounded-lg border">
        <div>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-200 h-72 object-contain rounded"
            />
          ) : (
            <div className="flex h-80 items-center justify-center bg-gray-100 text-gray-400 rounded">
              No Image
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-sm text-gray-500 mb-2">{product.category_name}</p>
            <p className="text-xl font-bold text-blue-600 mb-4">${product.price}</p>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              {product.description}
            </p>
          </div>

          {/* Add To Cart Button (Bottom) */}
          <button
            type="button"
            className="mt-4 bg-green-600 hover:bg-green-700 p-2 text-white font-medium rounded transition"
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetailPage;