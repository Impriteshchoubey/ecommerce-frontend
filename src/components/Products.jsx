import React from "react";
import ProductCard from "./ProductCard";

const Products = ({ products }) => {
  return (
    <section id="shop" className="py-16 bg-gray-50">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Our Products
        </h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Explore our wide range of quality products curated just for you
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
        {products.map((item) => (
          <div
            key={item._id}
            className="transform transition-transform duration-300 hover:scale-105"
          >
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
