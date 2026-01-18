import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/bazarSlice";
import { toast } from "react-toastify";

const Product = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setDetails(location.state.item);
  }, [location]);

  return (
    <div className="mt-24 max-w-5xl mx-auto">
      <img src={details.image} className="h-80 mx-auto" />
      <h2 className="text-2xl font-bold">{details.title}</h2>
      <p>${details.price}</p>
      <p>{details.description}</p>

      <button
        onClick={() =>
          dispatch(
            addToCart({
              _id: details._id,
              title: details.title,
              image: details.image,
              price: details.price,
              quantity: qty,
              description: details.description,
            })
          ) && toast.success("Added to cart")
        }
        className="bg-black text-white px-6 py-2 mt-4"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
