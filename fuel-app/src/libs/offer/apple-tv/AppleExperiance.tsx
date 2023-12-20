import { makeStyles } from '@material-ui/core'
import { TwoColumnLayout, Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'

const AppleExperiance = () => {
  const classes = useStyles()
  const { title, description, rightImage, logo }: any = useAppData(
    'appleExperianceData',
    true,
  )
  if (title?.value == null) {
    return null
  }
  const renderContent = () => {
    return (
      <div id="apple-experiance-content" className={classes.content}>
        {logo?.src && (
          <img
            className={classes.apple4k}
            src={logo?.src}
            alt={logo?.alt}
            loading="lazy"
          />
        )}
        {title?.value && (
          <Typography tagType="h3" className={classes.title} styleType="h3">
            {title?.value}
          </Typography>
        )}
        {description?.value && (
          <Typography
            tagType="p"
            className={classes.description}
            styleType="h5"
          >
            {description?.value}
          </Typography>
        )}
      </div>
    )
  }

  return (
    <div className={classes.wrapper}>
      <TwoColumnLayout
        content={renderContent()}
        image={rightImage?.src}
        webpImage={rightImage?.webp}
        title={rightImage?.alt}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    [breakpoints.up('md')]: {
      padding: '60px 0px',
      '& .gridItemContent': {
        maxWidth: '46%',
        flexBasis: '46%',
      },
      '& .gridItemImage': {
        flexBasis: '54%',
        maxWidth: '54%',
        '& img': {
          maxHeight: '100%',
        },
      },
    },
  },
  lefty: {},
  righty: {},
  content: {
    marginTop: '5.5625rem',
    marginRight: '4rem',
    [breakpoints.down('md')]: {
      marginTop: '2rem',
      marginRight: '1rem',
      marginLeft: '1rem',
    },
  },
  apple4k: {
    width: '110px',
  },
  title: {
    marginTop: '2rem',
  },
  description: {
    marginTop: '1rem',
    [breakpoints.up('md')]: {
      maxWidth: '470px',
    },
  },
}))

export default AppleExperiance
