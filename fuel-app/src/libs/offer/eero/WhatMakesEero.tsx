import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Typography, FourTiles, InjectHTML } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'

const WhatMakesEero = () => {
  const classes = useStyles()
  const { title, tiles }: any = useAppData('WhatMakesEero', true)
  const slides = useMemo(() => {
    if (!tiles?.list) {
      return []
    }
    const tilesList = []
    for (const item of tiles?.list) {
      const payload: any = {
        title: item?.title?.value,
        description: item?.description?.value,
        icon: <InjectHTML value={item?.icon?.value} />,
      }
      tilesList.push(payload)
    }
    return tilesList
  }, [tiles])

  if (!tiles?.list) {
    return null
  }
  return (
    <div
      id="what-makes-eero"
      className={classes.root}
      data-testid="what-makes-eero"
    >
      <div className={classes.wrapper}>
        <Typography tagType="h3" styleType="h3" className={classes.h2Title}>
          {title?.value}
        </Typography>
        <FourTiles
          type="light"
          textAlign="left"
          tiles={slides}
          titleStyleType="h5"
          descriptionClassName={classes.description}
          isClickable={false}
          cardClassName={classes.cardStyles}
          roundedBorders={true}
          iconClassName={classes.iconStyles}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: colors.main.brightRed,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    paddingBottom: 120,
    paddingTop: 67,
    [breakpoints.down('xs')]: {
      padding: '2.5rem 1rem',
    },
  },
  h2Title: {
    textAlign: 'center',
    color: colors.main.white,
    paddingBottom: 48,
    [breakpoints.down('xs')]: {
      paddingBottom: 32,
    },
  },
  description: {
    fontSize: '1.125rem',
    lineHeight: '1.625rem',
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  cardStyles: {
    [breakpoints.down('xs')]: {
      padding: '32px 32px 16px 32px',
    },
  },
  iconStyles: {
    minHeight: 44,
    [breakpoints.down('xs')]: {
      minHeight: 'auto',
    },
  },
}))

export default WhatMakesEero
