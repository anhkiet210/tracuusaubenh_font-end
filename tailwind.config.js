/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
    mode: 'jit',
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './Layout/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                banner: "url('../img/banner/2.jpg')",
                titleBg: "url('../img/title_bg.png')",
                newsLetterBg: "url('../img/bg_newsletter.jpg')",
                bgLogin: "url('../img/bg-login.jpg')",
            },
            keyframes: {
                appear: {
                    '0%': { transform: 'translate(-50%,-50%)', opacity: '0' },
                    '50%': { transform: 'translate(-25%, -25%)', opacity: '0.3' },
                    '100%': { transform: 'translate(0, 0)', opacity: '1' },
                },
                toLeft: {
                    '0%': { transform: 'translateX(50%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                toTop: {
                    '0%': { transform: 'translateY(50%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                converging: {
                    '0%': { transform: 'scale(5)', opacity: '0', filter: 'blur(50px)' },
                    '100%': { transform: 'scale(1)', opacity: '1', filter: 'blur(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                bloom: {
                    '0%': { height: '0px', opacity: '0' },
                    '100%': { height: 'auto', opacity: '1' },
                },
            },
            animation: {
                'appear-hand': 'appear 0.4s linear',
                'toLeft-hand': 'toLeft 0.4s linear',
                'toTop-hand': 'toTop 0.4s linear',
                'converging-hand': 'converging 1s linear',
                'fadeIn-hand': 'fadeIn 0.4s linear',
                'bloom-hand': 'bloom 0.4s linear',
            },
            colors: {
                // ...colors,
                primary: '#6cfd83',
                primary1: '#059669',
                white: '#ffffff',
                error: '#ff3333',
            },
            container: {
                center: true,
            },
            fontFamily: {
                qwitcher: ['Qwitcher Grypen', 'cursive'],
            },
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
};
