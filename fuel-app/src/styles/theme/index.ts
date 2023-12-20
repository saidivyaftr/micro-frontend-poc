import { createTheme } from '@material-ui/core'
import shadows from './shadows'
import typography from './typography'
import colors from './colors'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 340,
      sm: 768,
      md: 1024,
      lg: 1140,
      xl: 1920,
    },
  },
  palette: {
    background: {
      paper: colors.main.white,
    },
    primary: {
      contrastText: colors.main.white,
      main: colors.main.primaryRed,
    },
    secondary: {
      contrastText: colors.main.white,
      main: colors.main.darkBlue,
    },
    text: {
      primary: colors.main.midnightExpress,
      secondary: colors.main.darkBlue,
    },
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        '&:hover': {
          backgroundColor: colors.main.darkRed,
          color: colors.main.white,
          border: '1px solid',
          borderColor: colors.main.darkRed,
        },
      },
      outlinedPrimary: {
        backgroundColor: colors.main.white,
        '&:hover': {
          backgroundColor: colors.main.primaryRed,
          color: colors.main.white,
        },
      },
      containedSecondary: {
        '&:hover': {
          backgroundColor: colors.main.white,
          color: colors.main.darkBlue,
          borderColor: colors.main.darkBlue,
          border: '1px solid',
        },
      },
      outlinedSecondary: {
        backgroundColor: colors.main.white,
        '&:hover': {
          backgroundColor: colors.main.darkBlue,
          color: colors.main.white,
        },
      },
    },
    MuiInputBase: {
      input: {
        background: colors.main.white,
      },
    },
    MuiFormLabel: {
      root: {
        color: colors.main.dark,
      },
      asterisk: {
        color: colors.main.primaryRed,
        '&$error': {
          color: colors.main.primaryRed,
        },
      },
    },
    MuiSelect: {
      filled: {
        '&:focus': {
          backgroundColor: colors.main.white,
        },
      },
    },
  },
  typography,
  shadows,
})

export default theme
