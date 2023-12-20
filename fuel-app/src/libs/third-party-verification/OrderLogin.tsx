import { makeStyles } from '@material-ui/core'
import { InjectHTML, Typography } from '@/shared-ui/components'
import OrderLoginForm from './OrderLoginForm'
import { useAppData } from 'src/hooks'
import { useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import OrderAcceptance from './OrderAcceptance'
import Head from 'next/head'

const OrderLogin = () => {
  const orderLoginData = useAppData('verify', true)
  const orderAcceptanceData = useAppData('orderAcceptance', true)
  const { headerEntry, subHeaderEntry, metaTitle, metaDescription } =
    orderLoginData
  const classes = useStyles()
  const { verifyResponse } = useSelector((state: State) => state?.verify)

  return (
    <>
      <Head>
        {(orderAcceptanceData?.metaTitle || metaTitle) && (
          <meta
            name="title"
            content={
              verifyResponse?.serviceId && verifyResponse?.order
                ? orderAcceptanceData.metaTitle?.value
                : metaTitle?.value
            }
            key="title"
          />
        )}
        {(orderAcceptanceData?.metaDescription || metaDescription) && (
          <meta
            name="description"
            content={
              verifyResponse?.serviceId && verifyResponse?.order
                ? orderAcceptanceData.metaDescription.value
                : metaDescription?.value
            }
            key="description"
          />
        )}
      </Head>
      {verifyResponse?.serviceId && verifyResponse?.order ? (
        <OrderAcceptance
          serviceId={verifyResponse.serviceId}
          order={verifyResponse.order}
        />
      ) : (
        <div className={classes.root}>
          <div className={classes.grayBackgroundHeader}>
            <Typography styleType="h3" tagType="h3" fontType="boldFont">
              {headerEntry?.value}
            </Typography>
            <InjectHTML
              addAnchorStyles
              styleType="p1"
              fontType="regularFont"
              value={subHeaderEntry?.value}
              className={classes.orderLoginSubheader}
            />
            <OrderLoginForm />
          </div>
        </div>
      )}
    </>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: '0 0 2rem',
  },
  grayBackgroundHeader: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    margin: '3rem 0 0',
    padding: '3rem 2rem',
    backgroundColor: '#f4f4f4',
    maxWidth: '1170px',
    width: '100%',
  },
  orderLoginSubheader: {
    fontSize: '2.25rem',
    fontWeight: 500,
    lineHeight: '1.2',
    marginBottom: '2rem',
    marginTop: '20px',
    color: '#141928',
    '& p': {
      fontSize: '1.6rem' + 0.4,
    },
    maxWidth: '580px',
    ['@media screen and (max-width: 500px)']: {
      maxWidth: '520px',
      textAlign: 'center',
    },
  },
}))

export default OrderLogin
