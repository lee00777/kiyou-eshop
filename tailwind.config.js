/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                brand: "#E5AAA3",
                trend: "#E8CDC9",
                trendfont: "#9E9087",
                description: "#877B73",
                button: "#C7918A",
                trendbtn: "#F5F1F0",
                trendbtnfont: "#d19992",
                background: "#F6F4EE",
                clearBtn: "#2F7BEC",
            },
            animation: {
                loading: "spin 3s linear infinite",
            },
        },
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
