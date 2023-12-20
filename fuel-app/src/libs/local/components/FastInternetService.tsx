import { makeStyles } from '@material-ui/core'
import { CardAndImage } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'

const FastInternetService = (data: any) => {
  const {
    heading,
    copy,
    imageMobile,
    imageTablet,
    altText,
    toolTipContent,
    legalText,
  }: any = data?.data || {}
  const classes = useStyles()

  if (!data || Object.keys(data)?.length === 0) {
    return null
  }

  return (
    <div className={classes.root} data-testid="fast-internet-service">
      <div className={classes.wrapper}>
        <CardAndImage
          heading={heading?.value}
          copy={copy?.value}
          imageMobile={imageMobile?.src}
          imageTablet={imageTablet?.src}
          altText={altText?.value}
          className={classes.content}
          titleClassName={classes.heading}
          legalText={legalText}
          tooltipContent={toolTipContent}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: colors.main.white,
    padding: '1.5rem 1rem',
    [theme.breakpoints.up('sm')]: {
      padding: '5.75rem 1rem',
    },
  },
  wrapper: {
    margin: '0 auto',
    maxWidth: 1100,
  },
  heading: {
    paddingBottom: '1rem',
  },
  content: {
    marginRight: 'unset !important',
    '& sup': {
      lineHeight: 0,
    },
    '& a': {
      minWidth: 'unset',
      textDecoration: 'underline',
      fontFamily: 'PP OBJECT SANS MEDIUM',
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
  },
}))

export default FastInternetService
