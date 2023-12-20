import { makeStyles } from '@material-ui/core'
import { InjectHTML, Typography } from '@/shared-ui/components'
import useAppData from '@/shared-ui/hooks/useAppData'
import colors from '@/shared-ui/colors'
import { IShopComponents } from './types'
const YTVStreaming = ({ styles }: IShopComponents) => {
  const classes = useStyles()
  const { title, subTitle, logo }: any = useAppData('YTVStreaming', true)
  const YtvStreamingData = useAppData('YTVStreaming')
  if (!YtvStreamingData) {
    return null
  }
  return (
    <div data-testid="YTVStreaming" className={classes.root} style={styles}>
      <div className={classes.container}>
        <div className={classes.leftContainer}>
          <img
            data-testid="img"
            src={logo?.src}
            alt={logo?.alt}
            className={classes.img}
          />
        </div>
        <div data-testid="title" className={classes.rightContainer}>
          {title?.value && (
            <div data-testid="title">
              <InjectHTML
                tagType="h3"
                styleType="h3"
                value={title.value}
                className={classes.titleClass}
              />
            </div>
          )}
          {subTitle?.value && (
            <div data-testid="subtitle">
              <Typography tagType="h6" styleType="h6">
                {subTitle?.value}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: colors.main.grey,
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    [breakpoints.down('sm')]: {
      display: 'block',
      textAlign: 'center',
    },
  },
  img: {
    [breakpoints.down('xs')]: {
      width: '80px',
      height: '104px',
      marginBottom: '1rem',
    },
  },
  leftContainer: { flex: 0.2 },
  rightContainer: {
    flex: 0.8,
    gap: '1rem',
    paddingLeft: '30px',
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.down('xs')]: {
      marginTop: 0,
      paddingLeft: 0,
    },
  },
  titleClass: {
    '& a': {
      '&:hover': {
        color: colors.main.brightRed,
        textDecoration: 'underline',
      },
    },
    [breakpoints.down('xs')]: {
      '& a': {
        textDecoration: 'underline',
      },
    },
  },
}))
export default YTVStreaming
