import React from "react";
import { MemoryRouter, useNavigate, BrowserRouter as Router } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductCard from "../components/ProductCard";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe("Product card Component", () => {
    const product = {
        category: ["Skirt", "Long", "Formal"],
        colors: ["Green", "Purple", "Gray", "Beige", "Pink"],
        description: "Daily work skirt - Pastel colors",
        id: "07d90d98-42df-48be-926e-3010108fcc91",
        image: {
            options: ["https://res.cloudinary.com/dmppn3noc/image/upload/v1715200987/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/h%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%20%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/%E1%84%8B%E1%85%A9%E1%86%B8%E1%84%89%E1%85%A7%E1%86%AB1_hnq6qi.png", "https://res.cloudinary.com/dmppn3noc/image/upload/v1715200834/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/h%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%20%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/%E1%84%8B%E1%85%A9%E1%86%B8%E1%84%89%E1%85%A7%E1%86%AB2_rkelev.png", "https://res.cloudinary.com/dmppn3noc/image/upload/v1715200792/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/h%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%20%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/%E1%84%8B%E1%85%A9%E1%86%B8%E1%84%89%E1%85%A7%E1%86%AB3_w5lleg.png", "https://res.cloudinary.com/dmppn3noc/image/upload/v1715200803/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/h%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%20%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/%E1%84%8B%E1%85%A9%E1%86%B8%E1%84%89%E1%85%A7%E1%86%AB4_x1z8wv.png", "https://res.cloudinary.com/dmppn3noc/image/upload/v1715200804/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/h%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%20%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/%E1%84%8B%E1%85%A9%E1%86%B8%E1%84%89%E1%85%A7%E1%86%AB5_fyljpo.png"],
            product: ["https://res.cloudinary.com/dmppn3noc/image/upload/v1715200727/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/h%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%20%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/h%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB_%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B31_quq3ep.jpg", "https://res.cloudinary.com/dmppn3noc/image/upload/v1715200646/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/h%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%20%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/h%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB_%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B32_w34jui.jpg", "https://res.cloudinary.com/dmppn3noc/image/upload/v1715200645/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/h%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%20%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/h%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB_%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B33_pmtpdv.jpg", "https://res.cloudinary.com/dmppn3noc/image/upload/v1715200654/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/h%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%20%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/h%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB_%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B34_zka170.jpg", "https://res.cloudinary.com/dmppn3noc/image/upload/v1715200650/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/h%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%20%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/h%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB_%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B35_ziohwd.jpg", "https://res.cloudinary.com/dmppn3noc/image/upload/v1715200728/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/h%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%20%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/h%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB_%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B36_gnfl5c.jpg", "https://res.cloudinary.com/dmppn3noc/image/upload/v1715200652/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/h%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%20%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B3/h%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB_%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A5%E1%84%90%E1%85%B37_cehxmv.jpg"],
        },
        price: 130,
        quantity: 1,
        size: ["S", "M", "L", "XL"],
        title: "H Line Skirt",
        trend: ["New", "Best"],
    };

    test("renders Product card component", () => {
        render(
            <MemoryRouter>
                <ProductCard product={product} />
            </MemoryRouter>
        );

        expect(screen.getByText("H Line Skirt")).toBeInTheDocument();
        expect(screen.getByText("Skirt")).toBeInTheDocument();

        product.trend.forEach((tag) => {
            expect(screen.getByText(tag)).toBeInTheDocument();
        });
    });

    test("navigates to product details page on click", () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        render(
            <Router>
                <ProductCard product={product} />
            </Router>
        );

        // Click on the card
        fireEvent.click(screen.getByAltText("H Line Skirt"));

        // Check if navigate was called with correct arguments
        expect(mockNavigate).toHaveBeenCalledWith(`/products/${product.id}`, { state: { product } });
    });
});
