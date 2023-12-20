import { useEffect, useState } from 'react'
import { Button, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import { useAppData } from 'src/hooks'

const BuildingFiberCopperAvailable = ({ selectedAddress }: any) => {
  const {
    buildingFiberSuccessHeader,
    buildingFiberSuccessSubHeader,
    buildingFiberSuccessButton,
  } = useAppData('buildingFiber', true)
  const [isDisabled, setIsDisabled] = useState(true)
  const { addressKey, samRecords } = selectedAddress
  const { controlNumber, environment } = samRecords[0]
  const DOTCOM_URL = process.env.DOTCOM_URL || ''
  useEffect(() => {
    if (addressKey && controlNumber && environment) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [addressKey, controlNumber, environment])

  const classes = useStyles()
  return (
    <>
      {buildingFiberSuccessHeader?.value && (
        <InjectHTML
          tagType="h3"
          styleType="h3"
          color="secondary"
          value={buildingFiberSuccessHeader?.value}
        />
      )}
      {buildingFiberSuccessSubHeader?.value && (
        <InjectHTML
          tagType="p"
          styleType="p1"
          color="tertiary"
          className={classes.subheader}
          value={buildingFiberSuccessSubHeader?.value}
        />
      )}
      {buildingFiberSuccessButton?.text && (
        <>
          {!isDisabled && (
            <Button
              className={classes.button}
              href={`${DOTCOM_URL}${buildingFiberSuccessButton?.link.slice(
                1,
              )}/?a=${addressKey}&c=${controlNumber}&e=${environment}`}
              text={buildingFiberSuccessButton?.text}
              type="link"
              hoverVariant="secondary"
            />
          )}

          {isDisabled && (
            <Button
              className={classes.button}
              type="button"
              text={buildingFiberSuccessButton?.text}
              disabled
            />
          )}
        </>
      )}
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subheader: {
    fontSize: 24,
    margin: 0,
    marginTop: 16,
    [breakpoints.down('xs')]: {
      fontSize: 18,
    },
  },
  button: {
    marginTop: 32,
    width: 'fit-content',
    display: 'block',
    margin: 'auto',
  },
}))

export default BuildingFiberCopperAvailable
