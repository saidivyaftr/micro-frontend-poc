import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { FourTiles, Button, InjectHTML } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER, SPECIAL_ABOUT_FIBER } from 'src/constants'
import {
  AutoPayIcon,
  BillAccountIcon,
  BillIcon,
} from '@/shared-ui/react-icons/index'

const RenderIcon = ({ iconName }: { iconName: string }) => {
  switch (iconName) {
    case 'BillIcon':
      return <BillIcon />
    case 'AutoPayIcon':
      return <AutoPayIcon />
    case 'BillAccountIcon':
      return <BillAccountIcon />
    default:
      return null
  }
}

const ThreeTiles = () => {
  const classes = useStyles()
  const { title, tiles, primaryButtonText, primaryButtonValue }: any =
    useAppData('ThreeTiles', true)

  const list = useMemo(() => {
    if (!tiles?.list) {
      return []
    }
    const tilesList = []
    for (const item of tiles?.list) {
      const payload: any = {
        title: item?.title?.value,
        description: item?.description?.rendered,
        icon: <RenderIcon iconName={item?.icon?.value?.field?.value} />,
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
    <div className={classes.root}>
      <InjectHTML
        tagType="h2"
        styleType="h3"
        className={classes.title}
        value={title.value}
      />
      <FourTiles
        type="light"
        textAlign="left"
        tiles={list}
        titleStyleType="h5"
        isClickable={false}
        descriptionStyleType="p1"
        tilesWrapperClassName={classes.tilesWrapperStyles}
        mobileOneCol
      />

      {primaryButtonText?.value && (
        <Button
          className={classes.primaryBtn}
          type="link"
          text={primaryButtonText?.value}
          href={primaryButtonValue?.value}
          onClick={onButtonClick}
        />
      )}
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    margin: 'auto',
    paddingTop: '80px',
    maxWidth: '1232px',
    [breakpoints.down('sm')]: {
      paddingTop: '40px',
    },
  },

  title: {
    textAlign: 'center',
    marginBottom: 32,
    '& red': {
      color: colors.main.brightRed,
    },
    [breakpoints.down('xs')]: {
      textAlign: 'left',
    },
  },
  tilesWrapper: {
    columnGap: 0,
  },
  cardStyles: {
    padding: `2rem 3.5rem`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  tilesWrapperStyles: {
    padding: '0 1rem',
    '& svg': {
      marginLeft: '5px',
      marginBottom: '1rem',
    },
    [breakpoints.down('xs')]: {
      padding: 0,
    },
  },

  primaryBtn: {
    display: 'block',
    maxWidth: 278,
    margin: 'auto',
    marginTop: 48,
    marginBottom: 0,
    [breakpoints.down('xs')]: {
      marginTop: 40,
    },
  },
}))

export default ThreeTiles
