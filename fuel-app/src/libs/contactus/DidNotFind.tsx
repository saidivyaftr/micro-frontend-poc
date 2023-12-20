import { makeStyles } from '@material-ui/core'
import { COMPONENT_WRAPPER } from 'src/constants'
import { Typography, Button } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useWindowDimensions, useAppData } from 'src/hooks'

const DidNotFind = () => {
  const classes = useStyles()
  const { width } = useWindowDimensions()
  const isMobile = width <= 768
  const didNotFind = useAppData('didNotFind', true)
  if (Object.keys(didNotFind)?.length === 0) {
    return null
  }
  const { backgroundColor, text, callText, callNumber } = didNotFind

  return (
    <div
      className={classes.wrapper}
      style={{
        backgroundColor: backgroundColor.value,
      }}
    >
      <div className={classes.root}>
        {!isMobile ? (
          <Typography styleType="h5" tagType="h2" className={classes.title}>
            {`${text?.value} ${callText?.value} ${callNumber?.value}`}
          </Typography>
        ) : (
          <Typography styleType="h5" tagType="h2" className={classes.title}>
            {text?.value}
          </Typography>
        )}

        {isMobile && (
          <a href={`tel:${callNumber.value.replace(/-/g, '')}`}>
            <Button
              type="button"
              variant="tertiary"
              text={`${callText?.value} ${callNumber?.value}`}
              className={classes.btn}
            />
          </a>
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    backgroundColor: colors.main.greenishBlue,
    padding: `25px 1rem`,
  },
  root: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      gap: 0,
      padding: 0,
    },
  },
  title: {
    [breakpoints.down('xs')]: {
      fontSize: 18,
    },
  },
  btn: {
    width: 'max-content',
    fontSize: 18,
    [breakpoints.down('xs')]: {
      marginTop: 24,
      width: '100%',
    },
  },
}))

export default DidNotFind
