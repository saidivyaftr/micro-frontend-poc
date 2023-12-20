import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import colors from './colors'

const typography = {
  fontFamily: [PP_OBJECT_SANS, 'Arial', 'Helvetica', 'sans-serif'].join(),
  color: colors.main.dark,
  h1: {
    fontSize: 42,
    lineHeight: '1.14',
  },
  h2: {
    fontSize: 36,
    lineHeight: '1.16',
  },
  h3: {
    fontSize: 30,
    lineHeight: '1.2',
  },
  h4: {
    fontSize: 24,
  },
  h5: {
    fontSize: 20,
  },
  h6: {
    fontSize: 18,
  },
  subtitle1: {
    fontSize: 18,
  },
  subtitle2: {
    fontSize: 16,
  },
  body1: {
    fontSize: 16,
  },
  body2: {
    fontSize: 14,
  },
  overline: {
    fontSize: 14,
  },
  caption: {
    fontSize: 12,
  },
  button: {
    fontSize: 16,
    fontWeight: 400,
  },
}

export default typography
