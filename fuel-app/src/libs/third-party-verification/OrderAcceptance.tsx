import { makeStyles, Grid } from '@material-ui/core'
import { Button, InjectHTML, Typography } from '@/shared-ui/components'
import APIClient from 'src/api-client'
import { verifySlice } from 'src/redux/slicers'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const OrderAcceptance = (props: any) => {
  const orderAcceptanceData: any = useAppData('orderAcceptance', true)
  const {
    title,
    description,
    accountInformation_title,
    accountInformation_tableData,
    orderInformation_title,
    PreferredCarrier,
    IntraLata,
    InterLata,
    ISP,
    eulaInformation,
    acceptBtn,
    rejectBtn,
    somethingwrong,
  } = orderAcceptanceData
  const classes = useStyles()

  const dispatch = useDispatch()
  const orderData = useSelector(
    (state: State) => state?.verify?.verifyResponse?.order || null,
  )
  const provisioning = orderData?.provisioning || []

  const submitTPVform = async (event: any, decision: any) => {
    event.preventDefault()
    dispatch(verifySlice.actions.setFormErrorMessage(''))

    try {
      const serviceId = props.serviceId
      const token = props.order.accountData

      const payload = {
        decision: decision,
        tokenizedData: token,
      }
      // eslint-disable-line no-eval
      const response = await APIClient.tpvOrderConfirmation(payload, serviceId)
      if (response) {
        DTMClient.triggerEvent(
          {
            events: 'event163',
            eVar2: 'order verification',
            eVar93: 'Order Accepted',
          },
          'tl_o',
          'order verification response',
        )
        window.location.href = '/resources/verification-confirmation'
      } else {
        DTMClient.triggerEvent(
          {
            events: 'event48',
            eVar2: 'order verification',
            eVar48:
              'We could not find an order or there was an error with the information you provided. Please try again.',
          },
          'tl_o',
          'form errors',
        )
        dispatch(verifySlice.actions.setFormErrorMessage(somethingwrong?.value))
      }
    } catch (error: any) {
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: 'order verification',
          eVar88: 'Failed to fetch',
        },
        'tl_o',
        'site errors',
      )
      dispatch(verifySlice.actions.setFormErrorMessage(somethingwrong?.value))
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.grayBackgroundHeader}>
        <Grid container>
          <Grid item md={12} sm={12} className={classes.centerContent}>
            <Typography tagType="h3" styleType="h3" fontType="boldFont">
              {title?.value}
            </Typography>
            <InjectHTML
              addAnchorStyles
              styleType="p1"
              tagType="p"
              fontType="regularFont"
              value={description?.value}
              className={classes.description}
            />
          </Grid>
        </Grid>
        <div className={classes.information}>
          <Typography
            className={classes.heading}
            tagType="h2"
            fontType="regularFont"
          >
            {accountInformation_title?.value}
          </Typography>
          <Grid container>
            <Grid item md={6} sm={6} className={classes.table}>
              <InjectHTML
                tagType="span"
                fontType="boldFont"
                value={
                  accountInformation_tableData?.lists?.[0]?.name?.value + ':'
                }
                className={classes.fieldName}
              />
            </Grid>
            <Grid item md={6} sm={6}>
              <Typography
                tagType="span"
                fontType="regularFont"
                className={classes.content}
              >
                {orderData?.customerName}
              </Typography>
            </Grid>
            <Grid item md={6} sm={6} className={classes.table}>
              <InjectHTML
                tagType="span"
                fontType="boldFont"
                value={
                  accountInformation_tableData?.lists?.[1]?.name?.value + ':'
                }
                className={classes.fieldName}
              />
            </Grid>
            <Grid item md={6} sm={6}>
              <Typography
                tagType="span"
                fontType="regularFont"
                className={classes.content}
              >
                {orderData?.customerBillingAddress}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={12} sm={12}>
              <Typography
                tagType="h1"
                fontType="regularFont"
                className={classes.heading}
              >
                {orderInformation_title?.value}
              </Typography>

              <ul className={classes.list}>
                {provisioning.needsPreferredCarrier && (
                  <li className={classes.content}>
                    {' '}
                    {PreferredCarrier?.value}{' '}
                  </li>
                )}
                {provisioning.needsIntraLata && (
                  <li className={classes.content}> {IntraLata?.value} </li>
                )}
                {provisioning.needsInterLata && (
                  <li className={classes.content}> {InterLata?.value} </li>
                )}
                {provisioning.needsISP && (
                  <li className={classes.content}> {ISP?.value} </li>
                )}
              </ul>

              {eulaInformation?.lists?.map(function (item: any) {
                return (
                  item?.value?.value && (
                    <Typography
                      styleType="p1"
                      tagType="p"
                      fontType="regularFont"
                      className={classes.content}
                    >
                      {item?.value?.value}
                    </Typography>
                  )
                )
              })}
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Grid item>
              <Button
                text={acceptBtn?.value}
                type="button"
                onClick={(e) => submitTPVform(e, 'approve')}
                variant="primary"
              />
            </Grid>
            <Grid item>
              <Button
                text={rejectBtn?.value}
                type="button"
                onClick={(e) => submitTPVform(e, 'reject')}
                className={classes.rejectButton}
                variant="primary"
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 0 2rem',
    fontFamily: 'PP Object Sans',
  },
  grayBackgroundHeader: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    margin: '3rem 0 0',
    padding: '3rem 2rem',
    backgroundColor: colors.main.lightGray,
    maxWidth: '1170px',
    width: '100%',
  },
  centerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  description: {
    maxWidth: '650px',
    fontSize: '2.25rem',
    fontWeight: 500,
    lineHeight: '1.2',
    margin: 'auto',
    color: '#141928',
  },
  information: {
    width: '100%',
    border: '1px solid',
    padding: '2rem',
    maxWidth: '700px',
    background: colors.main.white,
    borderColor: '#dedede',
  },
  heading: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    lineHeight: '1.625rem',
  },
  table: {
    marginBottom: '5px',
  },
  fieldName: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '1.125rem',
    lineHeight: '1.5rem',
  },
  content: {
    textAlign: 'left',
    fontSize: '1.125rem',
    lineHeight: '1.5rem',
    fontFamily: 'PP Object Sans',
  },
  list: {
    marginLeft: '-1em',
    '& li': {
      paddingBottom: '10px',
    },
  },
  rejectButton: {
    backgroundColor: colors.main.gray,
    border: `1px solid ${colors.main.gray}`,
    color: colors.main.black,
    '&:hover': {
      color: `${colors.main.white}`,
    },
  },
}))

export default OrderAcceptance
