export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#51ACE4",
                secondary: "#3A81B3",
                third: "#d0ebff",
                dark: "#0C2D48",
                light: "#B1D4E0",
                "gray-0": "#e0e0e0"
            },
            width: {
                100: "25rem" /* 400px */,
                112: "28rem" /* 448px */,
                128: "32rem" /* 512px */,
                144: "36rem" /* 576px */,
                160: "40rem" /* 640px */,
                176: "44rem" /* 704px */,
                192: "48rem" /* 768px */,
                208: "52rem" /* 832px */,
                224: "56rem" /* 896px */,
                240: "60rem" /* 960px */,
                256: "64rem" /* 1024px */
            },
            fontFamily: {
                inherit: "inherit"
            }
        }
    },
    plugins: [],
    corePlugins: {
        "no-tailwindcss": false
    }
}
