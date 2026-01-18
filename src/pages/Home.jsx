import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Products from "../components/Products";

const Home = () => {
  const response = useLoaderData();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(response.data);
  }, [response]);

  return (
    <>
      <Banner />
      <Products products={products} />
    </>
  );
};

export default Home;
