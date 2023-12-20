import { InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { useEffect, useRef } from 'react'

const FiberNominationSuccess = () => {
  const { fiberNominationHeader, fiberNominationSubHeader } = useAppData(
    'fiberComing',
    true,
  )
  const node = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const nodeOffset = node?.current?.offsetTop || 320
    window.scrollTo({
      top: nodeOffset - 320,
      behavior: 'smooth',
    })
  }, [node])
  const classes = useStyles()
  return (
    <div className={classes.container}>
      {fiberNominationHeader?.value && (
        <InjectHTML
          tagType="h3"
          styleType="h3"
          className={classes.header}
          value={fiberNominationHeader?.value}
        />
      )}
      {fiberNominationSubHeader?.value && (
        <InjectHTML
          tagType="p"
          styleType="p1"
          color="tertiary"
          className={classes.subheader}
          value={fiberNominationSubHeader?.value}
        />
      )}
      <div ref={node}></div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [breakpoints.down('xs')]: {
      padding: '32px 16px 32px 16px',
    },
  },
  header: {
    color: colors.main.greenishBlue,
  },
  subheader: {
    fontSize: 24,
    textAlign: 'center',
    lineHeight: '32px',
    [breakpoints.down('xs')]: {
      lineHeight: '26px',
      fontSize: '18px',
    },
  },
  button: {
    width: 'fit-content',
  },
}))

export default FiberNominationSuccess
