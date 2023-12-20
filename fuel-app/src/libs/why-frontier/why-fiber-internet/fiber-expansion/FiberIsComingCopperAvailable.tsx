import { useEffect, useState } from 'react'
import { Button, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import { useAppData } from 'src/hooks'

const FiberIsComingCopperAvailable = ({ selectedAddress }: any) => {
  const {
    fiberComingSuccessHeader,
    fiberComingSuccessSubHeader,
    fiberComingSuccessButton,
  } = useAppData('fiberComing', true)
  const [isDisabled, setIsDisabled] = useState(true)
  const { addressKey, samRecords } = selectedAddress
  const { controlNumber, environment } = samRecords[0]
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
      {fiberComingSuccessHeader?.value && (
        <InjectHTML
          tagType="h3"
          styleType="h3"
          color="secondary"
          value={fiberComingSuccessHeader?.value}
        />
      )}
      {fiberComingSuccessSubHeader?.value && (
        <InjectHTML
          tagType="p"
          styleType="p1"
          color="tertiary"
          className={classes.subheader}
          value={fiberComingSuccessSubHeader?.value}
        />
      )}
      {fiberComingSuccessButton?.text && (
        <>
          {!isDisabled && (
            <Button
              className={classes.button}
              href={`${fiberComingSuccessButton?.link}/?a=${addressKey}&c=${controlNumber}&e=${environment}`}
              text={fiberComingSuccessButton?.text}
              type="link"
              hoverVariant="secondary"
            />
          )}

          {isDisabled && (
            <Button
              className={classes.button}
              type="button"
              text={fiberComingSuccessButton?.text}
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
    textAlign: 'center',
    margin: '16px 0 32px 0',
    [breakpoints.down('xs')]: {
      fontSize: 18,
    },
  },
  button: {
    width: 'fit-content',
  },
}))

export default FiberIsComingCopperAvailable
