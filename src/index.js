import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import MyCart from "./pages/MyCart";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import NewProduct from "./pages/NewProduct";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import reportWebVitals from "./reportWebVitals";
import ProtectedRoute from "./pages/ProtectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BestProducts from "./pages/BestProducts";
import NewArrivalProducts from "./pages/NewArrivalProducts";
import Sales from "./pages/Sales";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                path: "/",
                element: <Home />,
                errorElement: <NotFound />,
            },
            {
                path: "/products",
                element: <AllProducts />,
                errorElement: <NotFound />,
            },
            // admin만 볼수있게 만들기 (url창에서 쳐도 못들어오게 하기)
            {
                path: "/products/new",
                element: (
                    <ProtectedRoute requiredAdmin={true}>
                        <NewProduct />
                    </ProtectedRoute>
                ),
                errorElement: <NotFound />,
            },
            {
                path: "/products/:id",
                element: <ProductDetail />,
                errorElement: <NotFound />,
            },
            // 로그인 한사람만 볼수있게 만들기. 로그인하지 않았으면 Home으로 redirect하기
            {
                path: "/carts",
                element: (
                    <ProtectedRoute>
                        <MyCart />
                    </ProtectedRoute>
                ),
                errorElement: <NotFound />,
            },
            {
                path: "/best",
                element: <BestProducts />,
                errorElement: <NotFound />,
            },
            {
                path: "/new",
                element: <NewArrivalProducts />,
                errorElement: <NotFound />,
            },
            {
                path: "/sales",
                element: <Sales />,
                errorElement: <NotFound />,
            },
            {
                path: "/products/skirts",
                element: <AllProducts category={"Skirt"} />,
                errorElement: <NotFound />,
            },
            {
                path: "/products/dresses",
                element: <AllProducts category={"Dress"} />,
                errorElement: <NotFound />,
            },
            {
                path: "/products/pants",
                element: <AllProducts category={"Pants"} />,
                errorElement: <NotFound />,
            },
            {
                path: "/products/shirts",
                element: <AllProducts category={"Shirt"} />,
                errorElement: <NotFound />,
            },
            {
                path: "/products/cardigans",
                element: <AllProducts category={"Cardigan"} />,
                errorElement: <NotFound />,
            },
            {
                path: "/products/outers",
                element: <AllProducts category={"Outer"} />,
                errorElement: <NotFound />,
            },
            {
                path: "/products/accessories",
                element: <AllProducts category={"Accessory"} />,
                errorElement: <NotFound />,
            },
        ],
        errorElement: <NotFound />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

reportWebVitals();
