import { makeStyles } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
import APIClient from 'src/api-client'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from '@/shared-ui/colors'
import { Divider } from '@material-ui/core'
import { Button } from '@/shared-ui/components'
import { useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import { Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useAppData } from 'src/hooks'
import moment from 'moment'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { usePageLoadEvents } from 'src/hooks'
import { CCPA_MODAL, VISITOR } from 'src/constants'
export interface IModalProps extends React.HTMLAttributes<HTMLElement> {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  showConfirmation: React.Dispatch<React.SetStateAction<boolean>>
}

const CCPAModal: React.FunctionComponent<IModalProps> = ({
  setModalOpen,
  showConfirmation,
}) => {
  const [isReview, setIsReview] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const { data } = useSelector((state: any) => state.ccpa)
  const classes = useStyles()
  const {
    rightToReviewText,
    rightToDelete,
    requestSubmittedText,
    noPriorRequestsText,
    makeSelectionText,
    submitRequestBtnText,
    deleteReviewText,
  } = useAppData('rightToDeleteAndReview', true)
  const { title } = useAppData('hero', true)
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: CCPA_MODAL,
      eVar22: VISITOR,
    },
  })

  const handleSubmit = () => {
    if (data?.token) {
      if (isReview && isDelete) {
        reviewDeleteRequest()
      } else if (isReview) {
        reviewRequest()
      } else if (isDelete) {
        deleteRequest()
      }
    }
  }

  const reviewRequest = async () => {
    DTMClient.triggerEvent({
      events: 'event151,event14',
      eVar14: 'ccpa:close modal',
      pageURL: window.location.href,
    })
    await APIClient.ccpaReview(data.token)
    closeModal()
  }

  const deleteRequest = async () => {
    DTMClient.triggerEvent({
      events: 'event152,event14',
      eVar14: 'ccpa:close modal',
      pageURL: window.location.href,
    })
    await APIClient.ccpaDelete(data.token)
    closeModal()
  }

  const reviewDeleteRequest = async () => {
    DTMClient.triggerEvent({
      events: 'event151,event152,event14',
      eVar14: 'ccpa:close modal',
      pageURL: window.location.href,
    })
    await APIClient.ccpaReviewDelete(data.token)
    closeModal()
  }

  const closeModal = () => {
    setModalOpen(false)
    showConfirmation(true)
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Typography className={classes.alignCenter} styleType="h4" tagType="h4">
          {title?.value}
        </Typography>
        <Typography className={classes.alignCenter} tagType="p">
          {makeSelectionText?.value}
        </Typography>
        <Divider className={classes.divider} />
        <Grid container spacing={2}>
          <Grid className={classes.gridCheckboxItem} item xs={2}>
            <Checkbox
              checked={isReview}
              onChange={() => setIsReview(!isReview)}
              name="Request Review"
              disabled={data?.reviewRequests?.length > 1}
            />
          </Grid>
          <Grid className={classes.gridItem} item xs={10}>
            <Typography
              className={
                data?.reviewRequests?.length == 2 ? classes.grayText : ''
              }
            >
              {rightToReviewText?.value}
            </Typography>
            {data?.reviewRequests?.length > 0 ? (
              <>
                {data.reviewRequests.slice(-2).map((val: any, i: number) => {
                  return (
                    <Typography
                      key={`review-request-item-${i}`}
                      className={classes.emptyStatus}
                    >
                      {`${requestSubmittedText?.value} ${moment(
                        val.createdOn,
                      ).format('MM/DD/YYYY')}`}
                    </Typography>
                  )
                })}
              </>
            ) : (
              <Typography className={classes.emptyStatus}>
                {noPriorRequestsText?.value}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid className={classes.gridCheckboxItem} item xs={2}>
            <Checkbox
              checked={isDelete}
              onChange={() => setIsDelete(!isDelete)}
              name={deleteReviewText?.value}
            />
          </Grid>
          <Grid className={classes.gridItem} item xs={10}>
            <Typography>{rightToDelete?.value}</Typography>
            <Typography className={classes.emptyStatus}>
              {data?.deleteRequests?.at(-1)
                ? requestSubmittedText?.value +
                  ' ' +
                  moment(data.deleteRequests.at(-1).createdOn).format(
                    'MM/DD/YYYY',
                  )
                : noPriorRequestsText?.value}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <div className={classes.alignCenter}>
          <Button
            type="button"
            onClick={handleSubmit}
            className={classes.btn}
            text={submitRequestBtnText?.value}
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: colors.main.white,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '2.5rem 16px',
  },
  btn: {
    marginTop: 16,
    marginBottom: 24,
    width: 'max-content',
    [breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  alignCenter: {
    textAlign: 'center',
  },
  divider: {
    margin: '40px 0',
  },
  emptyStatus: {
    color: colors.main.green,
  },
  gridItem: {
    padding: '8px',
  },
  gridCheckboxItem: {
    padding: '0 8px !important',
  },
  grayText: {
    color: colors.main.gray,
  },
}))

export default CCPAModal
