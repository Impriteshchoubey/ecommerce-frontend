import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Header = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const productData = useSelector((state) => state.bazar.productData);
  const userInfo = useSelector((state) => state.bazar.userInfo);

  return (
    <header className="fixed w-full bg-white shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center p-4 md:px-8">
        {/* Logo */}
        <h2
          onClick={() => navigate("/")}
          className="text-2xl md:text-3xl font-extrabold text-indigo-600 cursor-pointer hover:text-indigo-800 transition-colors duration-200"
        >
          eBazaar
        </h2>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          <Link
            to="/"
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="hover:text-indigo-600 transition-colors duration-200 relative"
          >
            Cart
            <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2">
              {productData.length}
            </span>
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-1 hover:text-indigo-600 transition-colors duration-200"
          >
            <AiOutlineUser size={22} />
            {userInfo ? userInfo.name : "Login"}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-indigo-600 transition-colors duration-200"
          onClick={() => setMenu(!menu)}
        >
          <HiOutlineMenuAlt3 size={28} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {menu && (
        <div className="md:hidden bg-white shadow-md py-4 flex flex-col items-center gap-4 animate-slide-down">
          <Link
            to="/"
            onClick={() => setMenu(false)}
            className="text-gray-700 hover:text-indigo-600 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/cart"
            onClick={() => setMenu(false)}
            className="text-gray-700 hover:text-indigo-600 transition-colors duration-200"
          >
            Cart ({productData.length})
          </Link>
          <Link
            to="/login"
            onClick={() => setMenu(false)}
            className="text-gray-700 hover:text-indigo-600 transition-colors duration-200"
          >
            {userInfo ? userInfo.name : "Login"}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
