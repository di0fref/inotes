const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontSize:{
                's': ['.85rem', "1.25rem"],
            },
            transitionProperty: {
                'height': 'height'
            },
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                lb: "rgb(27, 35, 48)",
                lg: "rgba(255, 255, 255, 0.7)",
                pg: "rgb(30,41,62)",
                "light-gray": '#f3f4f6',
                "dark-gray": "#3f434a"

            },
            width: {
                "75": "18.75rem",
                "76": "20rem",
                "160": "40rem"
            },
            margin: {
                "76": "20rem",
            },
            inset: {
                "75": "18.75rem",
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
