import { makeStyles } from '@material-ui/core'
import { Button } from '@/shared-ui/components'
import { TwoColumnLayout, Typography } from '@/shared-ui/components'
import { RightArrowIcon } from '@/shared-ui/react-icons'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'

const FrontierLifeLine = () => {
  const classes = useStyles()
  const { initialTitle, title, description, linkUrl, image } = useAppData(
    'FrontierLifeLine',
    true,
  )

  const NonImageContent = () => (
    <div id="two-gig" className={classes.NonImageContainer}>
      <Typography
        tagType="h6"
        color="secondary"
        className={classes.initialTitle}
      >
        {initialTitle?.value}
      </Typography>
      <Typography
        tagType="h2"
        className={classes.title}
        styleType="h4"
        color="secondary"
      >
        {title?.value}
      </Typography>
      <Typography tagType="p" styleType="p1" color="tertiary">
        {description?.value}
      </Typography>
      <Button
        type="link"
        variant="lite"
        href={linkUrl?.url}
        className={classes.rightArrowButton}
        text={<RightArrowIcon />}
        title={title?.value}
      />
    </div>
  )

  return (
    <div className={classes.root}>
      <TwoColumnLayout
        image={image?.src}
        title={title?.value}
        content={<NonImageContent />}
        reverse={true}
        roundedBorders={true}
        imageWrapperClassName={classes.image}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    maxWidth: '1200px',
    margin: 'auto',
    [breakpoints.down('sm')]: {
      padding: '1rem',
    },
  },
  image: {
    background: colors.main.midnightExpress,
    '& img': { maxHeight: 'unset' },
  },
  NonImageContainer: {
    marginRight: 'auto',
    padding: '5.625rem 5.625rem 5.625rem 4.625rem',
    display: 'flex',
    background: colors.main.midnightExpress,
    flexDirection: 'column',
    justifyContent: 'center',
    [breakpoints.down('sm')]: {
      padding: 16,
    },
  },
  title: {
    [breakpoints.down('xs')]: {
      fontSize: '1.5rem',
      lineHeight: '2rem',
    },
  },

  rightArrowButton: {
    display: 'contents',
    color: colors.main.white,
  },
  initialTitle: {
    fontSize: '.875rem',
    lineHeight: '.875rem',
    textTransform: 'uppercase',
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },

  legalText: {
    marginTop: '1rem',
  },
}))

export default FrontierLifeLine
