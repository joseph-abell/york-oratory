import Typography from 'typography';

const typography = new Typography({
    headerFontFamily: ['Engravers', 'Palatino', 'Palatino Linotype', 'Book Antiqua', 'serif'],
    bodyFontFamily: ['Montserrat', 'sans-serif'],
    baseFontSize: '18px',
    overrideStyles: () => ({
        '.header': {
            fontFamily: 'Engravers, serif',
            textTransform: 'uppercase',
        },
        '.BurgerBox': {
            marginTop: '8px',
        },
        '.BurgerBox .BurgerInner': {
            boxShadow: `1px 1px 1px rgba(0, 0, 0, 0.35) `,
        },
        '.BurgerBox .BurgerInner:before': {
            boxShadow: `1px 1px 1px rgba(0, 0, 0, 0.35) `,
        },
        '.BurgerBox .BurgerInner:after': {
            boxShadow: `1px 1px 1px rgba(0, 0, 0, 0.35) `,
        },
        '.BurgerActive .BurgerBox .BurgerInner': {
            backgroundColor: '#8c181f',
            boxShadow: 'none',
        },
        '.BurgerActive .BurgerBox .BurgerInner:before': {
            backgroundColor: '#8c181f',
            boxShadow: 'none',
        },
        '.BurgerActive .BurgerBox .BurgerInner:after': {
            backgroundColor: '#8c181f',
            boxShadow: 'none',
        },
        a: {
            color: '#8c181f',
            textDecoration: 'none'
        },
        'h2, h1': {
            fontWeight: 'normal',
        },
        strong: {
            fontWeight: 500,
        },
        button: {
            backgroundColor: '#8c181f',
            color: '#fff',
            border: 0,
            borderRadius: '3px',
            padding: '5px 10px',
            cursor: 'pointer',
            fontSize: '0.8rem'
        }
    })
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
    typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
