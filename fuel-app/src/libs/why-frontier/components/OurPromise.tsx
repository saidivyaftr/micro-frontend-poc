import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import {
  Typography,
  FourTiles,
  Button,
  InjectHTML,
} from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { COMPONENT_WRAPPER, OUR_FRONTIER_PROMISE } from 'src/constants'
import { useAppData } from 'src/hooks'

const OurPromise = () => {
  const classes = useStyles()
  const { title, subTitle, tiles, primaryButtonText, primaryButtonValue }: any =
    useAppData('OurPromise', true)

  const list = useMemo(() => {
    if (!tiles?.list) {
      return []
    }
    const tilesList = []
    for (const item of tiles?.list) {
      const payload: any = {
        title: item?.title?.value,
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
    s_objectID = OUR_FRONTIER_PROMISE.replace(
      '{NAME}',
      primaryButtonText?.value,
    )
  }

  return (
    <div id="frontier-promise" className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.titleWrapper}>
          <Typography
            tagType="h2"
            styleType="h3"
            color="tertiary"
            className={classes.title}
          >
            {title?.value}
          </Typography>
          <Typography
            tagType="p"
            styleType="h5"
            fontType="boldFont"
            className={classes.subtitle}
            color="tertiary"
          >
            {subTitle?.value}
          </Typography>
        </div>
        <div className={classes.tilesWrapper}>
          <FourTiles
            type="light"
            textAlign="center"
            tiles={list}
            titleClassName={classes.cardTitle}
            cardClassName={classes.card}
            titleStyleType="h4"
            isClickable={false}
          />
        </div>
        <Button
          className={classes.primaryBtn}
          type="link"
          variant="secondary"
          hoverVariant="secondary"
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
    background: colors.main.brightRed,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '60px 16px',
    [breakpoints.up('md')]: {
      paddingBottom: 74,
    },
  },
  titleWrapper: {
    textAlign: 'center',
    maxWidth: 995,
    margin: 'auto',
  },
  title: {
    marginBottom: 16,
    [breakpoints.down('md')]: {
      fontSize: '1.5rem',
      lineHeight: '2rem',
    },
  },
  subtitle: {
    marginBottom: 16,
    [breakpoints.down('md')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  tilesWrapper: {
    marginTop: 32,
  },
  card: {
    padding: '41px 32px 20px',
    [breakpoints.up('md')]: {
      padding: '41px 32px 36px',
    },
  },
  cardTitle: {
    [breakpoints.down('sm')]: {
      fontSize: 24,
    },
  },
  primaryBtn: {
    display: 'block',
    maxWidth: 400,
    margin: 'auto',
    marginTop: 48,
    [breakpoints.down('xs')]: {
      marginTop: 56,
      maxWidth: '100%',
    },
  },
}))

export default OurPromise
