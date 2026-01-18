import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Product from "./components/Product";
import PaymentSuccess from "./pages/PaymentSuccess"; // NEW
import Header from "./components/Header";
import Footer from "./components/Footer";
import productsData from "./api/Api";

const Layout = () => (
  <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-slate-200 flex flex-col">
    <Header />
    
    {/* MAIN CONTENT */}
    <main className="flex-1">
      <Outlet />
    </main>

    <Footer />
    <ScrollRestoration />
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="light"
    />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home />, loader: productsData },
      { path: "/cart", element: <Cart /> },
      { path: "/login", element: <Login /> },
      { path: "/product/:id", element: <Product /> },
      { path: "/payment-success", element: <PaymentSuccess /> }, // NEW ROUTE
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
