import { makeStyles } from '@material-ui/core'
import { Typography, InjectHTML } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useEffect, useRef } from 'react'

const MovingToState = (data: any) => {
  const compData = data?.data || {}
  const classes = useStyles()
  const containerRef = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      const targetElement: any = containerRef?.current
      if (targetElement?.style?.setProperty) {
        targetElement.style.setProperty(
          '--bg-desktop',
          `url(${compData?.desktopBackgroundImage?.src})`,
        )
        targetElement.style.setProperty(
          '--bg-mobile',
          `url(${compData?.mobileBackgroundImage?.src})`,
        )
      }
    }, 200)
  }, [containerRef])

  if (!data || Object.keys(data)?.length === 0) {
    return null
  }

  if (!data || Object.keys(data)?.length === 0) {
    return null
  }

  return (
    <>
      <div id="moving_to_state" ref={containerRef} className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.tile}>
            <Typography tagType="h2" styleType="h4">
              {compData?.heading?.value}
            </Typography>
            <InjectHTML
              tagType="p"
              styleType="p1"
              className={classes.subHeading}
              value={compData?.subHeading?.value}
            />
          </div>
        </div>
      </div>
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    display: 'flex',
    height: '100%',
    backgroundImage: 'var(--bg-desktop)',
    backgroundPosition: '70%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    [breakpoints.down('sm')]: {
      backgroundImage: 'var(--bg-mobile)',
      backgroundPosition: 'unset',
    },
  },
  container: {
    maxWidth: 1200,
    width: '100%',
    boxSizing: 'content-box',
    margin: '0 auto',
    display: 'flex',
    padding: '7.5rem 0',
    [breakpoints.down('sm')]: {
      padding: '1.5rem 0',
    },
  },
  tile: {
    maxWidth: '500px',
    padding: '4.5rem 2.5rem',
    backgroundColor: colors.main.white,
    borderRadius: '32px',
    [breakpoints.down('sm')]: {
      marginTop: '350px',
      padding: '2rem',
      margin: '1rem',
    },
  },
  subHeading: {
    paddingTop: '1rem',
    '& a': {
      textDecoration: 'underline',
      fontFamily: 'PP OBJECT SANS MEDIUM',
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
  },
}))

export default MovingToState
