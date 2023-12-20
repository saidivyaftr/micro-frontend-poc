import { InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import { useAppData } from 'src/hooks'
import { useEffect, useRef } from 'react'

const NominateYourAreaThanksGreaterThan2 = () => {
  const { nominateThanks1Header, nominateThanks1SubHeader } = useAppData(
    'availability',
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
      {nominateThanks1Header?.value && (
        <InjectHTML
          tagType="h2"
          styleType="h4"
          color="secondary"
          className={classes.header}
          value={nominateThanks1Header?.value}
        />
      )}
      {nominateThanks1SubHeader?.value && (
        <InjectHTML
          tagType="h2"
          styleType="h4"
          color="tertiary"
          className={classes.subheader}
          value={nominateThanks1SubHeader?.value}
        />
      )}
      <div ref={node}></div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    textAlign: 'center',
  },
  header: {
    margin: 'auto',
    marginBottom: 32,
    marginTop: 32,
    fontSize: '45px',
    [breakpoints.down('xs')]: {
      fontSize: '24px',
      lineHeight: '32px',
    },
  },
  subheader: {
    margin: 'auto',
    marginBottom: 32,
    [breakpoints.down('xs')]: {
      fontSize: '18px',
      lineHeight: '26px',
    },
  },
}))

export default NominateYourAreaThanksGreaterThan2
