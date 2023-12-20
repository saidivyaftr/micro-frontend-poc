import { Button, InjectHTML, Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import {
  COMPONENT_WRAPPER,
  CTA_BUTTON,
  EQUIPMENT_RETURN_REVIEW,
  SITE_ERROR,
  SITE_INTERACTION,
  VISITOR,
} from 'src/constants'
import colors from '@/shared-ui/colors'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import APIClient from 'src/api-client'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import { useAppData, usePageLoadEvents } from '../../hooks'
import { equipmentReturnFindSlice } from 'src/redux/slicers'
import { useEffect, useState } from 'react'
import {
  PP_OBJECT_SANS,
  PP_OBJECT_SANS_BOLD,
} from 'src/constants/fontFamilyNames'
import { WarningOutline } from '@/shared-ui/react-icons/index'

const ReturnsReview = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(false)
  const [isError, setAPIError] = useState<boolean>(false)
  const [shippingLabel, setShippingLabel] = useState<boolean>(false)
  const { equipmentData, getServicesAPIData, formData } = useSelector(
    (state: State) => state?.equipmentReturnFind,
  )

  const {
    description1,
    description2,
    description3,
    title,
    continueButtonLabel,
    editButtonLabel,
    addressTitle,
    addressValue,
    tableData,
    accountAddressTitle,
    errorMessage,
  } = useAppData('returnsReview', true) || {}

  useEffect(() => {
    if (
      formData.addressLineOne === '' &&
      formData.city === '' &&
      formData.state === '' &&
      formData.zipCode === '' &&
      formData.addressLineTwo === ''
    ) {
      setShippingLabel(true)
    } else {
      setShippingLabel(false)
    }
  }, [formData])

  const dispatch = useDispatch()

  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: EQUIPMENT_RETURN_REVIEW,
      eVar22: VISITOR,
    },
  })
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setLoading(true)
    try {
      const payload: any = {
        orderNumber: equipmentData?.data?.orderNumber,
        alternateAddress: {
          addressLine1: formData?.addressLineOne?.value,
          addressLine2: formData?.addressLineTwo?.value,
          city: formData?.city?.value,
          state: formData?.state?.value,
          zipcode: formData?.zipCode?.value,
        },
      }
      const response = await APIClient.equipmentsFindPost(
        getServicesAPIData.data[0].id,
        payload,
      )
      if (response) {
        await dispatch(
          equipmentReturnFindSlice.actions.setStep('EQUIPMENT_SUBMIT_SUCCESS'),
        )
        setLoading(false)
      }
    } catch (error: any) {
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: 'returns-review',
          eVar88: 'Failed to return Equipment Mailer',
        },
        'tl_o',
        SITE_ERROR,
      )
      setLoading(false)
      setAPIError(true)
      const errorStatus: any = error?.response?.status
      const errorMessageData = errorMessage + errorStatus
      dispatch(equipmentReturnFindSlice.actions.onFailure(errorMessageData))
    }
  }

  const handleEditSubmit = async (e: any) => {
    e.preventDefault()
    await dispatch(equipmentReturnFindSlice.actions.setFormData(formData))
    await dispatch(
      equipmentReturnFindSlice.actions.setStep('EQUIPMENT_ADDRESS'),
    )
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.section}>
        <InjectHTML
          styleType="h4"
          tagType="h2"
          value={title?.value}
          className={classes.header}
        />
        <InjectHTML
          addAnchorStyles
          styleType="p3"
          value={description1?.value}
          className={classes.description}
        />
        <InjectHTML
          addAnchorStyles
          styleType="p3"
          value={description2?.value}
          className={classes.description}
        />
        <InjectHTML
          addAnchorStyles
          styleType="p3"
          value={description3?.value}
          className={classes.description}
        />
        <div className={classes.tableWrapper}>
          <table className={classes.tableContainer}>
            <thead>
              <tr>
                {tableData?.targetItems?.map((heading: any, index: number) => (
                  <th
                    key={`return-list-${index}`}
                    className={`${classes.tableCell}`}
                  >
                    <Typography
                      tagType="h6"
                      fontType="boldFont"
                      className={classes.rowCell}
                    >
                      {heading?.title?.value}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={classes.tableBody}>
              {equipmentData?.data?.equipmentForReturn?.map(
                (equipment: any, index: number) => (
                  <tr key={`return-list-${index}`}>
                    <td className={classes.tableCell}>{equipment?.mfr}</td>
                    <td className={classes.tableCell}>{equipment?.model}</td>
                    <td className={classes.tableCell}>
                      {equipment?.serialNumber}
                    </td>
                    <td className={classes.tableCell}>{equipment?.status}</td>
                    <td className={classes.tableCell}>
                      {equipment?.unreturnedCharge}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
        <br></br>

        {shippingLabel ? (
          <>
            <Typography
              styleType="p1"
              tagType="p"
              className={classes.addressTitle}
            >
              {accountAddressTitle?.value}
            </Typography>
          </>
        ) : (
          <>
            <Typography
              styleType="p1"
              tagType="p"
              className={classes.addressTitle}
            >
              {addressTitle?.value}
            </Typography>
          </>
        )}
        <Typography
          styleType="p3"
          tagType="p"
          className={classes.addressContent}
        >
          {formData?.addressLineOne?.value}
        </Typography>
        <Typography
          styleType="p3"
          tagType="p"
          className={classes.addressContent}
        >
          {formData?.addressLineTwo?.value}
        </Typography>
        <Typography
          styleType="p3"
          tagType="p"
          className={classes.addressContent}
        >
          <>
            <span> {formData?.city?.value}</span>
            <span>,</span> <span>{formData?.state?.value}</span>
          </>
        </Typography>
        <Typography
          styleType="p3"
          tagType="p"
          className={classes.addressContent}
        >
          {formData?.zipCode?.value}
        </Typography>
        <InjectHTML
          addAnchorStyles
          styleType="p1"
          value={addressValue?.value}
          className={classes.addDesc}
        />
        <div className={classes.btnContainer}>
          <Button
            type="submit"
            variant="secondary"
            onClick={(event) => handleEditSubmit(event)}
            className={classes.btn}
            text={editButtonLabel?.value}
            eventObj={{
              events: 'event14',
              eVar14: `${CTA_BUTTON}:returns-review-edit`,
            }}
            interactionType={SITE_INTERACTION}
          />
          <Button
            type="submit"
            variant="primary"
            onClick={(event) => handleSubmit(event)}
            className={classes.btn}
            text={continueButtonLabel?.value}
            isBusy={loading}
            eventObj={{
              events: 'event14',
              eVar14: `${CTA_BUTTON}:returns-review-submit`,
            }}
            interactionType={SITE_INTERACTION}
          />
        </div>
        {isError && (
          <Typography>
            <span className={classes.errorContainer}>
              <WarningOutline height={24} width={24} />
              <Typography styleType="p2" className={classes.errorMessage}>
                {errorMessage?.value}
              </Typography>
            </span>
          </Typography>
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    textAlign: 'left',
  },
  errorMessage: {
    fontFamily: PP_OBJECT_SANS_BOLD,
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'top',
    gap: 4,
  },
  tableBody: {
    background: colors.main.grey,
  },
  tableWrapper: {
    [breakpoints.down(900)]: {
      overflowX: 'scroll',
    },
  },
  rowCell: {
    [breakpoints.down('xs')]: {
      fontSize: '14px',
    },
  },

  header: {
    marginTop: '1.5rem',
    fontSize: '2.25rem',
    fontFamily: PP_OBJECT_SANS_BOLD,
    lineHeight: '2.5rem',
  },

  section: {
    padding: '4.25rem 0',
    textAlign: 'left',
    margin: '0 auto',
    maxWidth: '75%',
    [breakpoints.down('sm')]: {
      padding: '2rem 0',
    },
  },

  description: {
    paddingTop: '1.25rem',
    maxWidth: 'auto',
    margin: 'auto',
    '& span': {
      fontFamily: PP_OBJECT_SANS_BOLD,
    },
    [breakpoints.down('xs')]: {
      fontSize: '0.875rem',
    },
  },

  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '2rem',
    marginTop: '1rem',
    [breakpoints.down('sm')]: {
      gap: 0,
      flexDirection: 'column',
    },
  },

  btn: {
    marginTop: 10,
    marginBottom: 15,
    width: 'max-content',
  },

  tableContainer: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '30px',
    whiteSpace: 'nowrap',
    '& tr': {
      border: `1px solid ${colors.main.borderLightGray}`,
    },
  },

  tableCell: {
    border: `1px solid ${colors.main.borderLightGray}`,
    fontFamily: PP_OBJECT_SANS,
    padding: '1rem 1rem',
    '& h6': {
      margin: 0,
    },
    [breakpoints.down('xs')]: {
      fontSize: '14px',
    },
  },

  addressTitle: {
    marginTop: '20px',
    marginBottom: '10px',
    fontSize: '1.5rem',
    fontFamily: PP_OBJECT_SANS_BOLD,
  },

  addressContent: {
    margin: 0,
  },

  addDesc: {
    paddingBottom: '1.25rem',
    margin: 'auto',
    borderBottom: `1px solid ${colors.main.borderLightGray}`,
  },
}))

export type EQUIPMENT_PAYLOAD = {
  orderNumber: {
    alternateAddress: {
      addressLine1: ''
      city: ''
      state: ''
      zipcode: ''
    }
  }
}

export default ReturnsReview
