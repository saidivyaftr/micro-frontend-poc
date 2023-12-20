import { makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {
  TwoColumnLayout,
  Typography,
  Button,
  InjectHTML,
} from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import { acpSlice } from 'src/redux/slicers'
import { State } from 'src/redux/types'
import colors from '@/shared-ui/colors'
import { formSingleLineAddress } from 'src/utils/addressHelpers'

const MoveARoo = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { heading, description, buttonUrl, buttonText, image }: any =
    useAppData('MoveARoo', true)

  const selectedAddress = useSelector(
    (state: State) => state?.acp?.selectedAddress,
  )

  const singleLineAddress =
    selectedAddress?.address != null
      ? formSingleLineAddress(selectedAddress?.address, true)
      : ''

  const editAddressLinkText = {
    value: 'Edit Address',
  }

  const handleEdit = () => {
    dispatch(acpSlice.actions.setStep('acp-form'))
    dispatch(acpSlice.actions.setSelectedAddress(undefined))
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
      <div className={classes.addressWrapper}>
        <Typography tagType="p" styleType="h5" fontType="boldFont">
          {singleLineAddress}
        </Typography>
        <button onClick={handleEdit} className={classes.editBtn}>
          <Typography
            fontType="regularFont"
            styleType="h5"
            className={classes.editAddressBtnText}
          >
            {editAddressLinkText?.value}
          </Typography>
        </button>
      </div>
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
    margin: '5rem auto',
    [breakpoints.down('sm')]: {
      margin: '3rem auto',
    },
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
  },
  root: {
    margin: 0,
  },
  heading: {
    textTransform: 'none',
    [breakpoints.down('xs')]: {
      lineHeight: '44px',
    },
  },
  addressWrapper: {
    marginTop: '2rem',
    marginBottom: '5rem',
    display: 'flex',
    alignItems: 'center',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'start',
      '& p': {
        fontSize: 18,
      },
    },
  },
  editAddressLink: {
    '& a': {
      textDecoration: 'underline',
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
  },
  twoColInnerWrapper: {
    padding: '0',
  },
  twoColContainer: {
    [breakpoints.down('md')]: {
      padding: '0 16px',
    },
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
  editBtn: {
    background: 'transparent',
    border: 0,
    marginLeft: 8,
    cursor: 'pointer',
    [breakpoints.down('xs')]: {
      marginLeft: 0,
      padding: 0,
    },
  },
  editAddressBtnText: {
    textDecoration: 'underline',
    '&:hover': {
      color: colors.main.brightRed,
    },
    [breakpoints.down('xs')]: {
      fontSize: 18,
    },
  },
}))

export default MoveARoo
