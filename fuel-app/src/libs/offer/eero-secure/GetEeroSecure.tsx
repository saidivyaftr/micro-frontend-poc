import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Typography, FourTiles } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData, useChatState } from 'src/hooks'
import { MessageIcon } from '@/shared-ui/react-icons'
const GetEeroSecure = () => {
  const classes = useStyles()
  const { setChatState } = useChatState()
  const { title, tiles }: any = useAppData('getEeroSecure', true)

  const renderData = (index: any) => {
    if (
      tiles.list[index].playStoreButtonImage?.src &&
      tiles.list[index].appStoreButtonImage?.src
    ) {
      return (
        <div
          className={classes.appWrapper}
          data-testid="getEeroSecure-AppButtons"
        >
          <a href={tiles.list[index].playStoreButtonUrl?.url}>
            <img
              className={classes.appStoreImage}
              src={tiles.list[index].playStoreButtonImage?.src}
              alt={tiles.list[index].playStoreButtonImage?.alt}
            />
          </a>
          <a href={tiles.list[index].appStoreButtonUrl?.url}>
            <img
              className={classes.appStoreImage}
              src={tiles.list[index].appStoreButtonImage?.src}
              alt={tiles.list[index].appStoreButtonImage?.alt}
            />
          </a>
        </div>
      )
    }
    return <></>
  }
  const list = useMemo(() => {
    if (!tiles?.list) {
      return []
    }
    const tilesList = []
    for (const item of tiles?.list) {
      const payload: any = {
        title: item?.title?.value,
        description: item?.description?.value,
        button: {
          text: item?.button?.value ? (
            <span className={classes.messageBtnText}>
              <MessageIcon /> {item?.button?.value}
            </span>
          ) : (
            ''
          ),
          onClick: () => setChatState(true),
        },
        icon: <Typography styleType="h1">{item?.icon?.value}</Typography>,
      }
      tilesList.push(payload)
    }
    return tilesList
  }, [tiles])

  if (!tiles?.list) {
    return null
  }

  return (
    <div id="apply-acp" className={classes.root} data-testid="getEeroSecure">
      <div className={classes.wrapper}>
        {title?.value && (
          <Typography
            data-testid="getEeroSecure-Title"
            tagType="h2"
            color="tertiary"
            styleType="h3"
            className={classes.title}
          >
            {title?.value}
          </Typography>
        )}
        <div className={classes.tilesWrapper}>
          <FourTiles
            type="light"
            textAlign="left"
            tiles={list}
            titleStyleType="h5"
            roundedBorders={true}
            cardClassName={classes.cardClassName}
            descriptionClassName={classes.descriptionClassName}
            buttonClassName={classes.buttonClassName}
            isClickable={false}
            tilesWrapperClassName={classes.fourTileWrapper}
            renderData={renderData}
            descriptionStyleType="p1"
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: colors.main.dark,
    marginTop: 80,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    paddingBottom: 80,
    paddingTop: 60,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginBottom: '2rem',
  },
  buttonClassName: {
    width: 'fit-content',
    [breakpoints.down('md')]: {
      fontSize: '1rem',
    },
  },
  cardClassName: {
    display: 'flex',
    flexDirection: 'column',
  },
  descriptionClassName: {
    flex: '1',
    '& a': {
      textDecoration: 'underline',
      fontFamily: 'PP Object Sans Medium',
      display: 'inline',
      '&:hover': { color: colors.main.brightRed },
    },
  },
  messageBtnText: { display: 'flex', justifyContent: 'center', gap: '1rem' },
  messageBtn: {
    textTransform: 'uppercase',
    width: 'fit-content',
    margin: 'auto',
    [breakpoints.down('sm')]: {
      padding: '0.625rem',
    },
  },
  tilesWrapper: {
    maxWidth: '100%',
    marginTop: 32,
    marginBottom: '3rem',
  },
  fourTileWrapper: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    [breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
  appWrapper: {
    display: 'flex',
    width: '100%',
    '& sub': {
      marginRight: '1rem',
    },
  },

  appStoreImage: {
    marginRight: '1rem',
    maxHeight: '53px',
    width: 'auto',
    cursor: 'pointer',
    [breakpoints.down('xs')]: {
      maxHeight: '2rem',
    },
  },
}))

export default GetEeroSecure
