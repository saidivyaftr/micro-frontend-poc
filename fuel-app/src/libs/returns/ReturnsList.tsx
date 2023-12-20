import { Button, InjectHTML, Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import {
  COMPONENT_WRAPPER,
  CTA_BUTTON,
  EQUIPMENT_RETURN_LIST,
  SITE_INTERACTION,
  VISITOR,
} from 'src/constants'
import colors from '@/shared-ui/colors'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import { useAppData, usePageLoadEvents } from '../../hooks'
import { equipmentReturnFindSlice } from 'src/redux/slicers'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'

const ReturnsList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { title, description, continueButtonLabel, tableData } = useAppData(
    'returnsList',
    true,
  )

  const { equipmentData } = useSelector(
    (state: State) => state?.equipmentReturnFind,
  )

  const handleSubmit = async (event: any) => {
    dispatch(equipmentReturnFindSlice.actions.setStep('EQUIPMENT_ADDRESS'))
    event.preventDefault()
  }

  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: EQUIPMENT_RETURN_LIST,
      eVar22: VISITOR,
    },
  })

  return (
    <div className={classes.wrapper}>
      <div className={classes.section}>
        <Typography styleType="h4" tagType="h2" className={classes.header}>
          {title?.value}
        </Typography>
        <InjectHTML
          addAnchorStyles
          styleType="p1"
          value={description?.value}
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
        <div className={classes.btnContainer}>
          <Button
            type="submit"
            variant="primary"
            onClick={handleSubmit}
            className={classes.btn}
            text={continueButtonLabel.value}
            eventObj={{
              events: 'event14',
              eVar14: `${CTA_BUTTON}:returns-list`,
            }}
            interactionType={SITE_INTERACTION}
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    textAlign: 'left',
  },
  header: {
    marginTop: '1.5rem',
    fontSize: '2.25rem',
    lineHeight: '2.5rem',
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

  section: {
    padding: '4.25rem 0',
    textAlign: 'left',
    margin: '0 auto',
    maxWidth: '75%',
    [breakpoints.down('xs')]: {
      padding: '2rem 0',
    },
  },
  description: {
    padding: '1.25rem 0',
    maxWidth: 'auto',
    margin: 'auto',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '1rem',
    paddingTop: '1.25rem',
    margin: 'auto',
    [breakpoints.down('sm')]: {
      border: 'none',
    },
  },
  btn: {
    marginTop: 16,
    marginBottom: 24,
    width: 'max-content',
  },
  tableContainer: {
    width: '100%',
    borderCollapse: 'collapse',
    whiteSpace: 'nowrap',
    '& tr': {
      border: `1px solid ${colors.main.borderLightGray}`,
    },
    '& tr:not(:last-child)': {
      marginBottom: '1rem',
    },
  },

  tableCell: {
    padding: '1rem 1rem 1rem 1rem',
    fontFamily: PP_OBJECT_SANS,
    border: `1px solid ${colors.main.borderLightGray}`,
    '& h6': {
      margin: 0,
    },

    [breakpoints.down('xs')]: {
      fontSize: '14px',
    },
  },
  tableBody: {
    backgroundColor: colors.main.grey,
  },
}))

export default ReturnsList
