import React from "react";
import { BsArrowBarRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/bazarSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`/product/${product._id}`, {
      state: { item: product },
    });
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: 1,
        description: product.description,
      })
    );
    toast.success("Added to cart");
  };

  return (
    <div className="relative bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Product Image */}
      <div
        className="cursor-pointer overflow-hidden rounded-t-xl"
        onClick={handleDetails}
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-64 w-full object-cover transform transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-2">
        <h2
          className="text-gray-800 font-semibold text-lg cursor-pointer hover:text-indigo-600 truncate"
          onClick={handleDetails}
          title={product.title}
        >
          {product.title}
        </h2>
        <p className="text-gray-600 font-medium text-sm">₹{product.price}</p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-2 flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Add to Cart <BsArrowBarRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
