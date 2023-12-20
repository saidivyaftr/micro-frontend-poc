import { makeStyles } from '@material-ui/core'
import { FourTiles, InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'
import { useMemo } from 'react'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
const BeforeTheStorm: React.FC = () => {
  const classes = useStyles()
  const data = useAppData('beforeTheStorm', true)
  const { title, list, description } = data

  const tiles = useMemo(() => {
    if (!list) {
      return []
    }
    const tilesList = list?.targetItems?.map((item: any) => {
      return {
        title: item?.title?.value,
        description: item?.description?.value,
      }
    })
    return tilesList
  }, [list])

  return (
    <div data-testid="before-the-storm" className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.innerWrapper}>
          {title?.value && (
            <InjectHTML
              data-testid="before-the-storm-title"
              tagType="h2"
              styleType="h3"
              fontType="boldFont"
              color="tertiary"
              className={classes.title}
              value={title?.value}
            />
          )}
          {description?.value && (
            <InjectHTML
              tagType="p"
              styleType="p1"
              color="tertiary"
              fontType="regularFont"
              value={description?.value}
            />
          )}
        </div>
        <div className={classes.tilesWrapper}>
          <FourTiles
            titleTagType="h3"
            type="light"
            textAlign="left"
            tiles={tiles}
            titleStyleType="h5"
            titleClassName={classes.tileTitle}
            descriptionStyleType="p1"
            descriptionClassName={classes.description}
            isClickable={false}
            cardClassName={classes.cardStyles}
          />
        </div>
      </div>
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: colors.main.midnightExpress,
    padding: '5rem 0',
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
  },
  innerWrapper: {
    textAlign: 'center',
  },
  title: {
    marginBottom: '1rem',
  },
  tilesWrapper: {
    marginTop: '2rem',
  },
  tileTitle: {
    marginTop: 16,
    marginBottom: 16,
    [breakpoints.down('xs')]: {
      marginTop: 0,
    },
  },

  description: {
    display: 'inline',
    '& a': {
      fontFamily: PP_OBJECT_SANS_MEDIUM,
      textDecoration: 'underline',
      display: 'unset',
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
  },
  cardStyles: {
    borderRadius: '2rem',
    display: 'flex',
    flexDirection: 'column',
    borderRight: 'unset',
    padding: '40px 32px 40px 32px',
    [breakpoints.down('xs')]: {
      padding: '16px 32px',
    },
  },
}))

export default BeforeTheStorm
