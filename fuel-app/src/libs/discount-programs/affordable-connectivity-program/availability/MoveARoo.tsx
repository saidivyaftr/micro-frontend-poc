import { makeStyles } from '@material-ui/core'
import {
  TwoColumnLayout,
  Typography,
  Button,
  InjectHTML,
} from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'

import colors from '@/shared-ui/colors'

const MoveARoo = () => {
  const classes = useStyles()

  const { heading, description, buttonUrl, buttonText, image }: any =
    useAppData('MoveARoo', true)

  //ToDo : Routing to this page must integrate the addess
  const address = {
    value: '123 Main St. Anywhere',
  }
  const editAddressLink = {
    value: '&nbsp;<a href="sa">Edit Address</a>',
  }

  const NonImageContent = () => (
    <div className={classes.NonImageContainer}>
      <div className={classes.NonImageWrapper}>
        {description?.value && (
          <Typography
            tagType="p"
            styleType="h6"
            className={classes.description}
            color="tertiary"
          >
            {description?.value}
          </Typography>
        )}
        {buttonText?.value && buttonUrl?.url && (
          <Button
            type="link"
            href={buttonUrl?.url}
            text={buttonText?.value}
            className={classes.btnLearn}
            hoverVariant="secondary"
          />
        )}
      </div>
    </div>
  )
  return (
    <div className={classes.wrapper}>
      {heading?.value && (
        <InjectHTML
          tagType="h1"
          styleType="h1"
          fontType="boldFont"
          value={heading?.value}
          className={classes.heading}
        />
      )}
      <Typography
        tagType="p"
        styleType="h5"
        fontType="boldFont"
        className={classes.address}
      >
        {address?.value}
      </Typography>
      <InjectHTML
        tagType="span"
        styleType="h5"
        fontType="mediumFont"
        className={classes.editAddressLink}
        value={editAddressLink?.value}
      />
      <TwoColumnLayout
        imageWrapperClassName={classes.imageWrapper}
        image={image?.src}
        title={image?.alt}
        content={<NonImageContent />}
        reverse={true}
        mobileReverse={true}
        className={classes.root}
        roundedBorders={true}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,

    '& img': {
      maxWidth: '392px',
      height: 'unset',
      [breakpoints.up('md')]: {
        margin: '7.5rem',
      },
      [breakpoints.down('md')]: {
        padding: '4rem 1rem 3rem 1rem',
      },
    },
    margin: '5rem auto',
    [breakpoints.down('sm')]: {
      padding: '0',
      marginBottom: '3rem',
    },
  },
  root: { margin: 0 },
  heading: {
    textTransform: 'none',
  },
  address: {
    marginTop: '2rem',
    marginBottom: '5rem',
    display: 'inline-block',
    [breakpoints.down('md')]: {
      marginBottom: '4rem',
    },
  },
  editAddressLink: {
    '& a': { textDecoration: 'underline' },
  },
  NonImageContainer: {
    backgroundColor: colors.main.white,
    marginRight: 'auto',
    width: '100%',
  },

  NonImageWrapper: {
    backgroundColor: colors.main.dark,
    height: '100%',
    [breakpoints.up('md')]: {
      padding: '3rem 6.9rem 4.5rem 0rem',
    },
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  imageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.main.dark,
  },

  description: {
    [breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  btnLearn: {
    marginTop: '3rem',
    fontSize: '1.125rem',
    width: 'fit-content',
    [breakpoints.down('sm')]: {
      width: 'unset',
      marginBottom: '4rem',
    },
  },
}))

export default MoveARoo
