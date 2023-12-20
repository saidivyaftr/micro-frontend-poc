import { makeStyles } from '@material-ui/core'
import { Button } from '@/shared-ui/components'
import { TwoColumnLayout, Typography } from '@/shared-ui/components'
import { RightArrowIcon } from '@/shared-ui/react-icons'
import { CTA_BUTTON, SITE_INTERACTION } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'

const LifeLineServices = () => {
  const classes = useStyles()
  const {
    initialTitle,
    title,
    description,
    linkUrl,
    image,
    subTextTitle,
    subTextCcontent,
  } = useAppData('FrontierLifeLine', true)

  const NonImageContent = () => (
    <div id="two-gig" className={classes.NonImageContainer}>
      <Typography
        tagType="h6"
        color="tertiary"
        className={classes.initialTitle}
      >
        {initialTitle?.value}
      </Typography>
      <Typography
        tagType="h2"
        className={classes.title}
        styleType="h3"
        color="tertiary"
      >
        {title?.value}
      </Typography>
      <Typography
        tagType="p"
        className={classes.description}
        styleType="p1"
        color="tertiary"
      >
        {description?.value}
      </Typography>
      <Button
        type="link"
        variant="lite"
        href={linkUrl?.url}
        className={classes.rightArrowButton}
        text={<RightArrowIcon />}
        triggerEvent={true}
        eventObj={{ events: 'event14', eVar14: CTA_BUTTON }}
        interactionType={SITE_INTERACTION}
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
        gridClassName={classes.grid}
        roundedBorders={true}
        imageWrapperClassName={classes.image}
      />
      <div className={classes.declineBlock}>
        {subTextTitle?.value && (
          <Typography
            tagType="div"
            styleType="p2"
            className={classes.declineTitle}
          >
            {subTextTitle?.value}
          </Typography>
        )}
        {subTextCcontent?.value && (
          <Typography
            tagType="span"
            styleType="legal"
            className={classes.declineContent}
          >
            {subTextCcontent?.value}
          </Typography>
        )}
      </div>
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
  declineBlock: {
    paddingTop: 16,
    marginTop: 32,
    marginBottom: '2rem',
    borderTop: `1px solid ${colors.main.borderGrey}`,
    [breakpoints.down('sm')]: {
      marginTop: 16,
      marginBottom: 64,
    },
  },
  NonImageContainer: {
    marginRight: 'auto',
    padding: '5.625rem 4.5rem 5.625rem 2rem',
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
  declineTitle: {
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  declineContent: {
    fontSize: '12px !important',
    lineHeight: '14px !important',
  },
  description: {
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  rightArrowButton: {
    display: 'contents',
    color: colors.main.white,
    '& svg': {
      marginLeft: 0,
    },
  },
  grid: {
    [breakpoints.up('md')]: {
      '& > div:nth-of-type(2)': {
        maxWidth: '47%',
      },
      '& > div:first-of-type': {
        minWidth: '53%',
      },
    },
  },
  initialTitle: {
    fontSize: '.875rem',
    lineHeight: '.875rem',
    textTransform: 'uppercase',
    marginBottom: '1rem',
    [breakpoints.down('xs')]: {
      margin: `2rem 0 0.5rem 0`,
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  checkList: {
    marginBottom: 8,
    '& svg': {
      marginRight: 16,
    },
  },
  legalText: {
    marginTop: '1rem',
  },
}))

export default LifeLineServices
