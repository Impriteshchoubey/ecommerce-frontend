import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increamentQuantity,
  decrementQuantity,
  deleteItem,
} from "../redux/bazarSlice";

const CartItem = () => {
  const productData = useSelector((state) => state.bazar.productData);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-6">
      {productData.map((item) => (
        <div
          key={item._id}
          className="flex flex-col sm:flex-row gap-6 bg-white p-4 rounded-xl shadow"
        >
          {/* IMAGE */}
          <img
            src={item.image}
            alt={item.title}
            className="w-full sm:w-28 h-40 sm:h-28 object-cover rounded-lg"
          />

          {/* DETAILS */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h2>
              <p className="text-gray-600 mt-1">
                Price: ₹{item.price}
              </p>
              <p className="text-gray-800 font-medium mt-1">
                Total: ₹{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-4 mt-4">
              {/* QUANTITY CONTROLS */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => dispatch(decrementQuantity(item))}
                  className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  −
                </button>

                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md font-medium min-w-[32px] text-center">
                  {item.quantity}
                </span>

                <button
                  onClick={() => dispatch(increamentQuantity(item))}
                  className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  +
                </button>
              </div>

              {/* REMOVE */}
              <button
                onClick={() => dispatch(deleteItem(item._id))}
                className="ml-auto text-red-500 hover:text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
