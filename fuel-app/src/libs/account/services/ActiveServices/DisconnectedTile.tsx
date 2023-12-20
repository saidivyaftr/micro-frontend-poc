/* eslint-disable @typescript-eslint/indent */
import colors from '@/shared-ui/colors'
import { makeStyles } from '@material-ui/core/styles'
import { Button, InjectHTML } from '@/shared-ui/components'
import { ErrorTriangeOutline } from '@/shared-ui/react-icons/index'
import useWindowDimensions from '@/shared-ui/hooks/useWindowDimensions'

const DisconnectedTile = ({
  status,
  textData,
}: {
  status: string
  textData: any
}) => {
  const classes = useStyles()
  const { width } = useWindowDimensions()
  const isMobileView = width < 768
  const replaceDynamicValues = (str: string) => {
    // TODO - Update this Date() with data from API
    const updatedStr = str.replace('@@DATE@@', Date().toString())
    return updatedStr
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <ErrorTriangeOutline height="32px" width="32px" />
        <InjectHTML
          styleType={'p2'}
          color={'default'}
          className={classes.title}
          value={
            status === 'scheduled to disconnect'
              ? replaceDynamicValues(
                  isMobileView
                    ? textData?.scheduledForDisconnectMobile?.value
                    : textData?.scheduledForDisconnect?.value,
                )
              : replaceDynamicValues(textData?.disconnected30Days?.value)
          }
        />
        {isMobileView && status === 'scheduled to disconnect' && (
          <>
            <Button
              type="link"
              variant="primary"
              text={`${textData?.call?.value} ${textData?.serviceContactNumbercustomer?.value}`}
              href={`tel:${textData.serviceContactNumbercustomer?.value}`}
              hoverVariant="primary"
            />
            <div className={classes.bussinessCustomer}>
              <InjectHTML
                styleType={'p2'}
                color={'default'}
                value={textData?.businessCustomer?.value}
                className={classes.bussinessCustomerText}
              />
              <InjectHTML
                styleType={'p2'}
                color={'default'}
                fontType="boldFont"
                value={`${textData?.call?.value} <a href='tel:${textData?.serviceContactNumberbusiness?.value}'>${textData?.serviceContactNumberbusiness?.value}</a>`}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: { paddingBottom: 32 },
  wrapper: {
    background: colors.main.blushRed,
    border: `2px solid ${colors.main.darkRed}`,
    borderRadius: 16,
    padding: 32,
  },
  title: {
    marginTop: 16,
  },
  bussinessCustomer: {
    display: 'flex',
    paddingTop: 16,
    justifyContent: 'center',
  },
  bussinessCustomerText: {
    marginRight: 6,
  },
}))
export default DisconnectedTile
