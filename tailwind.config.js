/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'panel': '#F7F7F7',
                'modal-gray': '#FCFCFD',
                yellow: '#FFF0D8',
                "light-yellow": "#FFF8EE",
                primary: {
                    '100': '#E6EDEC',
                    '200': '#CCDBD9',
                    '300': '#99B8B3',
                    '400': '#66948C',
                    '500': '#337166',
                    '600': '#004D40',
                    '650': '#014F42',
                    '700': '#003E33',
                    '800': '#002E26',
                    '900': '#001F1A',
                    '1000': '#000F0D',
                },
                jungle:{
                    '25':'#E9FBF8',
                    '50':'#CDEEE8',
                    '100':'#A5DED4',
                    '200':'#70C8B9',
                    '500':'#258675',
                    '600':'#187565',
                    '700':'#196154',
                    '800':'#125347',
                },
                blue:{
                    '10':'#F0F9FF',
                    '20':'#026AA2'
                },
                red:{
                    '10':'#B93815',
                    '20':'#FFF4ED'
                },
                fire: {
                    '50': '#F1E2C7',
                    '100': '#FAEDE8',
                    '200': '#F6DCD2',
                    '300': '#EDB8A5',
                    '400': '#E39577',
                    '500': '#DA714A',
                    '600': '#D14E1D',
                    '700': '#A73E17',
                    '800': '#7D2F11',
                    '900': '#541F0C',
                    '1000': '#2A1006',
                },
                orange: {
                    '100': '#FDEAD7',
                    '600': '#E04F16',
                    '700': '#B93815',
                },
                'black85': 'rgba(0,0,0,0.85)',
                'light-gray' : '#EEEEEE',
                error:{
                    '400':'#F97066',
                    '500':'#F04438',
                },
                'secondary' : '#053B59',
                'orderStatus':{
                    '100':'#FEC84B',
                    '150':'#FFFAEB',
                    '200':'#FF9C66',
                    '250':'#FFF4ED',
                    '300':'#2E90FA',
                    '350':'#EFF8FF',
                    '400':'#258675',
                    '450':'#CDEEE8',
                    '500':'#FDA29B',
                    '550':'#FEF3F2',
                },
            },
            boxShadow: {
                'header': '0px 4px 10px rgba(0, 0, 0, 0.02)',
                'popular': '0px 4px 12px rgba(0, 0, 0, 0.04)',
                'progress': '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
                'sidebar': '0px 0px 12px rgba(0, 0, 0, 0.16)',
                'info-card': '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
                'new-button': '0px 1px 2px rgba(16, 24, 40, 0.05)',
                'offer' : '0px 4px 8px rgba(0, 0, 0, 0.04)'
            },
            backgroundImage: {
                'footer-sidebar': "url('./assets/images/png/footer-sidebar.svg')",
                'banner-frame': "url('./assets/images/png/banner-frame.png')",
                'product-frame': "url('./assets/images/png/food-frame.svg')",
                'category-frame': "url('./assets/images/png/category-frame.svg')",
                'category-item': "url('./assets/images/png/category-item.svg')",
                'active-category-item': "url('./assets/images/png/active-category-item.svg')",
                'splash-loading': "url('./assets/images/png/splash-loading.svg')",
            },
            backgroundSize: {
                'full' : '100% 100%'
            },
            height: {
                'inherit' : 'inherit'
            },
            minHeight: {
                10: '40px',
                18: '72px',
                36:'144px',
            },
            minWidth: {
                80: '320px',
            },
            maxHeight: {
                26: '104px',
                34: '34px',
                'inherit' : 'inherit'
            },
            maxWidth: {
                12: '48px',
                20: '80px',
                26: '104px',
                34: '34px',
                72: '288px',
                78:'312px',
                90:'360px',
                100: '400px',
                150: '600px',
                200: '800px',
                'tablet-content': '768px'
            },
            borderRadius:{
                50:'50px'
            },
            spacing: {
                1.5: '6px',
                3.5: '14px',
                4.5: '18px',
                5.5:'22px',
                6.5: '26px',
                18: '72px',
                22: '88px',
                26: '104px',
                34: '136px',
                38: '152px !important',
                62: '248px',
                76:'293px',
                78:'312px',
                113: '452px',
                120: '480px',
                141: '566px',
                180: '180px',
                200: '800px',
                '70h': '70vh',
                '90h': '90vh',
            },
            screens: {
                '3xl': '1860px',
                '2xl': '1440px',
                'smlg': '800px',
                'lg': '1120px',
            },
        },
    },
    plugins: [],
}

