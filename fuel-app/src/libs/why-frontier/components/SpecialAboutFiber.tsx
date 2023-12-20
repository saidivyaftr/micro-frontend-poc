import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import {
  Typography,
  FourTiles,
  Button,
  InjectHTML,
} from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { COMPONENT_WRAPPER, SPECIAL_ABOUT_FIBER } from 'src/constants'
import { useAppData } from 'src/hooks'

const SpecialAboutFiber = () => {
  const classes = useStyles()
  const { title, subTitle, tiles, primaryButtonText, primaryButtonValue }: any =
    useAppData('SpecialAboutFiber', true)

  const list = useMemo(() => {
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
  const onButtonClick = () => {
    //@ts-ignore
    s_objectID = SPECIAL_ABOUT_FIBER.replace('{NAME}', primaryButtonText?.value)
  }
  return (
    <div id="special-about-fiber" className={classes.root}>
      <div className={classes.wrapper}>
        <Typography tagType="h2" styleType="h3" className={classes.h2Title}>
          {title?.value}
        </Typography>
        <Typography className={classes.title} styleType="p1">
          {subTitle?.value}
        </Typography>
        <div className={classes.tilesWrapper}>
          <FourTiles
            type="dark"
            textAlign="left"
            tiles={list}
            titleStyleType="h5"
            titleClassName={classes.tileTitle}
            descriptionClassName={classes.description}
            isClickable={false}
          />
        </div>
        <Button
          className={classes.primaryBtn}
          type="link"
          text={primaryButtonText?.value}
          href={primaryButtonValue?.url}
          onClick={onButtonClick}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: colors.main.lightGray,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    paddingBottom: 80,
    paddingTop: 60,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  h2Title: {
    textAlign: 'center',
    marginBottom: 16,
    [breakpoints.down('sm')]: {
      fontSize: '1.5rem',
      lineHeight: '2rem',
    },
  },
  tileCard: {
    paddingBottom: 60,
  },
  tilesWrapper: {
    marginTop: 32,
  },
  tileTitle: {
    [breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    },
  },
  description: { fontSize: '1.125rem', lineHeight: '1.625rem' },
  primaryBtn: {
    display: 'block',
    maxWidth: 278,
    margin: 'auto',
    marginTop: 48,
    marginBottom: 0,
    [breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
}))

export default SpecialAboutFiber
