import { useState, useEffect } from 'react'
import { useAppData } from 'src/hooks'
import { Button, Typography } from '@/shared-ui/components'
import { GreenCircleCheckOverlay } from '@/shared-ui/react-icons'
import colors from '@/shared-ui/colors'
import { makeStyles } from '@material-ui/core'
import CopyToClickboard from './CopyToClickboard'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { SITE_INTERACTION, MULTIFAMILY_PAGE } from 'src/constants'

type PropType = {
  signerName: string
  signerEmail: string
  propertyName: string
  premiseAddress: string
  residentialUnits: string
  phoneNumber: string
}

const SignPAL = ({
  signerName,
  signerEmail,
  propertyName,
  premiseAddress,
  residentialUnits,
  phoneNumber,
}: PropType) => {
  const classes = useStyles()
  const [url, setUrl] = useState<string>('')
  const {
    submissonSent,
    title,
    description,
    selectText,
    buttonText,
    instructionText,
  } = useAppData('signPAL', true) || {}

  const copyLink = () => {
    navigator.clipboard.writeText(url)
  }
  const generateUrl = () => {
    const params = `&signer_UserName=${signerName.trim()}&signer_Email=${signerEmail.trim()}&propertyName=${propertyName.trim()}&residentialUnits=${residentialUnits.trim()}&signerName=${signerName.trim()}&signerEmail=${signerEmail.trim()}&phoneNumber=${phoneNumber.trim()}`
    const address = `&premiseAddress=${encodeURIComponent(premiseAddress)}`

    return (
      encodeURI(`${process.env.NEXT_PUBLIC_DOCUSIGN_URL}${params}`) + address
    )
  }
  useEffect(() => {
    setUrl(generateUrl())
  }, [signerName, signerEmail, propertyName, premiseAddress, residentialUnits])

  const handleSubmit = () => {
    DTMClient.triggerEvent(
      {
        pageName: MULTIFAMILY_PAGE,
        events: 'event14',
        eVar14: 'MDU:Sign Document',
      },
      'tl_o',
      SITE_INTERACTION,
    )
    window.open(url, '_blank')
  }

  return (
    <div className={classes.signPalContainer}>
      <div className={classes.contentWrapper}>
        <div className={classes.checkIconWrapper}>
          <GreenCircleCheckOverlay />
        </div>
        <Typography
          styleType="h6"
          tagType="div"
          className={classes.submissonSent}
        >
          {submissonSent?.value}
        </Typography>
        <Typography styleType="h5" tagType="div">
          {title?.value}
        </Typography>
        <Typography styleType="p2" tagType="p">
          {description?.value}
        </Typography>
        <Typography styleType="p2" tagType="p">
          {selectText?.value}
        </Typography>
        <Button
          type="link"
          variant="primary"
          onClick={handleSubmit}
          className={classes.buttonPrimary}
          text={buttonText?.value}
        />
        <Typography styleType="p2" tagType="p">
          {instructionText?.value}
        </Typography>
        <div className={classes.copyContainer}>
          <span className={classes.signUrl}>{url}</span>
          <span className={classes.copyIconWrapper} onClick={copyLink}>
            <CopyToClickboard copy={url} />
          </span>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  signPalContainer: {
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'PP Object Sans',
    padding: '48px 64px',
  },
  contentWrapper: {
    width: '1000px',
    borderRadius: '16px',
    height: '500px',
    padding: '64px',
    border: 'none',
    backgroundColor: colors.main.newBackgroundGray,
    boxSizing: 'content-box',
  },
  submissonSent: {
    marginBottom: '16px',
  },
  title: {
    fontSize: '24px',
    lineHeight: '32px',
    fontFamily: 'PP Object Sans bold',
  },
  buttonPrimary: {
    marginTop: '16px',
    marginBottom: '32px',
    borderRadius: '64px',
    [breakpoints.up('sm')]: {
      lineHeight: '26px',
    },
  },
  copyContainer: {
    borderRadius: '16px',
    backgroundColor: colors.main.white,
    display: 'inline-flex',
    height: '48px',
    width: '400px',
    padding: '0 16px',
    alignItems: 'center',
  },
  signUrl: {
    fontSize: '16px',
    lineHeight: '24px',
    height: '24px',
    width: '360px',
    margin: '12px 16px 12px 0',
    overflow: 'hidden',
  },
  checkIconWrapper: {
    borderRadius: '32px',
    backgroundColor: colors.main.white,
    display: 'inline-flex',
    padding: '16px',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '16px',
  },
  copyIconWrapper: {
    cursor: 'pointer',
    height: '24px',
  },
}))
export default SignPAL
