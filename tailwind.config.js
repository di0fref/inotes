module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontSize:{
                "base": 13
            },
            colors:{
                lb: "rgb(27, 35, 48)",
                lg: "rgba(255, 255, 255, 0.7)"
            },
            width: {
                "75": "18.75rem",
                "160": "40rem"
            },
        },
    },
    plugins: [],
}
