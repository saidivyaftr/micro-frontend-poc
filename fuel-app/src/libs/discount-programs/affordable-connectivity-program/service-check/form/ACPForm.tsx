import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import {
  Button,
  Typography,
  InfoModal,
  InjectHTML,
} from '@/shared-ui/components'
import SubscriberInfo from './SubscriberInfo'
import LegalInfo from './LegalInfo'
import BenefitQualifiedPersonFrom from './BenefitQualifiedPerson'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useFormik } from 'formik'
import { IFormValues, IsetSubmitting } from './types'
import colors from '@/shared-ui/colors'
import validationSchema from './formValidator'
import initialValues from './initialValues'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import { ACP_FORM_SUBMIT, ACP_FORM_VIEW, SITE_INTERACTION } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { acpSlice, submitForm } from 'src/redux/slicers/acp'
import { useRouter } from 'next/router'
import useAppData from '@/shared-ui/hooks/useAppData'

const ApplicationForm = () => {
  const classes = useStyles()
  const { caption } = useAppData('legalInfoFormData', true)
  const submitModal = useSelector((state: State) => state?.acp?.submitModal)
  const dispatch = useDispatch()
  const { query } = useRouter()
  const accountUUID = query?.accountUUID

  useEffect(() => {
    formik?.setFieldValue('accountUUID', accountUUID)
  }, [accountUUID])

  useEffect(() => {
    // trigger analytics on acp form view
    DTMClient.triggerEvent(
      {
        events: 'event1',
        eVar2: ACP_FORM_VIEW,
      },
      'tl_o',
      SITE_INTERACTION,
    )
  }, [])

  const handleOnSubmit = async (
    values: IFormValues,
    { setSubmitting }: IsetSubmitting,
  ) => {
    setSubmitting(true)
    DTMClient.triggerEvent(
      {
        events: ['event14'],
        eVar14: ACP_FORM_SUBMIT,
      },
      'tl_o',
    )
    try {
      await dispatch(submitForm(values))
      DTMClient.triggerEvent(
        {
          events: ['event2'],
          eVar2: ACP_FORM_VIEW,
        },
        'tl_o',
      )
    } catch (e: any) {
      DTMClient.triggerEvent(
        {
          events: ['event88'],
          eVar88: JSON.parse(e?.data?.message),
        },
        'tl_o',
      )
    }
    setSubmitting(false)
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleOnSubmit,
  })

  const isFormValid = Object.keys(formik.touched).length > 0 && formik.isValid
  return (
    <>
      <InfoModal
        isOpen={Boolean(submitModal?.showModal)}
        isLoading={Boolean(submitModal?.isLoading)}
        isClosable={true}
        title={submitModal?.title || ''}
        subTitle={submitModal?.subTitle || ''}
        onClose={() => dispatch(acpSlice.actions.setSubmitModal(undefined))}
        isFooterCloseButton={submitModal?.isFooterCloseButton || false}
        buttonName={submitModal?.buttonName || ''}
        modalContentClassName={
          submitModal?.modalContentClassName ? classes.modalContent : ''
        }
      />
      <div className={classes.formWrapper}>
        <form onSubmit={formik.handleSubmit} noValidate>
          <SubscriberInfo {...formik} />
          {!parseInt(formik.values.hasApplicationId) && (
            <BenefitQualifiedPersonFrom {...formik} />
          )}
          <LegalInfo formik={formik} />
          <InjectHTML value={caption?.value} className={classes.caption} />
          <Button
            text={'Submit application'}
            type="submit"
            className={classes.button}
            variant="primary"
            disabled={!isFormValid || formik.isSubmitting}
          />
        </form>
      </div>
      <div className={classes.requiredWrapper}>
        <span className={classes.required}>*</span>
        <Typography tagType="p" styleType="p2">
          Required field
        </Typography>
      </div>
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  formWrapper: {
    ...COMPONENT_WRAPPER,
    maxWidth: 1000,
    paddingTop: 80,
    paddingBottom: 16,
  },
  innerForm: {
    marginBottom: 32,
  },
  button: {
    width: 265,
    padding: '0rem',
    marginTop: 32,
    marginBottom: '10rem',
    [breakpoints.down('xs')]: {
      width: '100%',
      marginBottom: '5rem',
    },
  },
  requiredWrapper: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& p': {
      margin: 0,
    },
    '& span:after': {
      content: '*',
      position: 'relative',
      top: 5,
      marginRight: 5,
    },
  },
  required: {
    color: colors.main.brightRed,
    fontSize: 32,
  },
  modalContent: {
    [breakpoints.down('xs')]: {
      margin: 0,
      width: '100%',
      borderRadius: 0,
      height: '100%',
    },
    '& a': {
      textDecoration: 'underline',
      fontWeight: 600,
    },
  },
  caption: {
    marginTop: 64,
  },
}))

export default ApplicationForm
