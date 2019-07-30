import Typography from "typography"

const typography = new Typography({
  headerFontFamily: ['Palatino', 'Palatino Linotype', 'Book Antiqua', 'serif'],
  bodyFontFamily: ['Palatino', 'Palatino Linotype', 'Book Antiqua', 'serif'],
  baseFontSize: '18px',
  overrideStyles: () => ({
    h1: {
      fontStyle: 'italic'
    },
    h2: {
      fontStyle: 'italic'
    },
    h3: {
      fontStyle: 'italic'
    },
    a: {
      color: '#a00',
      textDecoration: 'none'
    }
  })
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
