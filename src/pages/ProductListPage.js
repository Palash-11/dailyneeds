import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../Api/productsApi";

function ProductListPage({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("-created_at");
  const navigate = useNavigate();

  useEffect(() => {
    getProducts(search, ordering).then((data) => setProducts(data));
  }, [search, ordering]);

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Products</h1>

      {/* Search, Filter & Go to Cart Section */}
      <div className="mb-6 flex gap-2 items-center">
        <input
          className="border p-2 rounded w-full max-w-xs"
          placeholder="Search products"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={ordering}
          onChange={(event) => setOrdering(event.target.value)}
        >
          <option value="-created_at">Newest</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
        </select>

        <button
          type="button"
          className="ml-2 bg-gray-700 p-2 text-white rounded text-sm hover:bg-gray-800 transition"
          onClick={() => navigate("/cart")}
        >
          Go to Cart
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <div
            className="border p-3 rounded-lg overflow-hidden shadow-sm flex flex-col justify-between bg-white"
            key={product.id}
          >
            <div>
              {product.image ? (
                <img
                  className="h-40 w-full object-cover rounded"
                  src={product.image}
                  alt={product.name}
                />
              ) : (
                <div className="flex h-40 items-center justify-center bg-gray-100 text-gray-400 rounded">
                  No Image
                </div>
              )}

              <h2 className="mt-2 font-bold text-lg">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.category_name}</p>
              <p className="font-semibold text-blue-600 mt-1">
                ${product.price}
              </p>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              <button
                type="button"
                className="bg-green-600 text-white p-2 rounded text-sm font-medium hover:bg-green-700 transition"
                onClick={() => addToCart(product)}
              >
                Add To Cart
              </button>

              <button
                type="button"
                className="border border-blue-600 text-blue-600 p-2 rounded text-sm font-medium hover:bg-blue-50 transition"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ProductListPage;