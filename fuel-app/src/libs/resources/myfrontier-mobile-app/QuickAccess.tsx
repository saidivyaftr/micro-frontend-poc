import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { FourTiles, InjectHTML } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from '@/shared-ui/colors'
const QuickAccess = () => {
  const classes = useStyles()
  const { tiles } = useAppData('quickAccessLinks', true)

  const list = useMemo(() => {
    if (!tiles?.targetItems) {
      return []
    }
    const tilesList = tiles?.targetItems?.map((item: any) => ({
      title: item?.title?.value,
      description: item?.description?.value,
      icon: <InjectHTML value={item?.svgIcon?.rendered} />,
    }))
    return tilesList
  }, [tiles])

  return (
    <div className={classes.root} data-testid="quick-access">
      <FourTiles
        type="light"
        textAlign="left"
        tiles={list}
        tilesWrapperClassName={classes.wrapperStyles}
        titleClassName={classes.titleStyles}
        descriptionClassName={classes.descriptionStyles}
        isClickable={false}
        cardClassName={classes.cardStyles}
        iconClassName={classes.iconStyle}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    [breakpoints.down('sm')]: {
      padding: 16,
    },
  },
  wrapperStyles: {
    columnGap: '0',
    [breakpoints.down('xs')]: {
      '& > div': {
        border: 'none',
        borderBottom: `solid 0.0625rem  ${colors.main.borderGrey} !important`,
        '&:last-child': {
          border: 'none !important',
        },
      },
    },
  },
  titleStyles: {
    marginTop: 0,
    fontSize: 30,
    lineHeight: '38px',
    marginBottom: '1rem',
    [breakpoints.down('sm')]: {
      fontSize: 20,
      lineHeight: '28px',
    },
  },
  descriptionStyles: {
    fontSize: 18,
    lineHeight: '26px',
    marginBottom: 0,
    [breakpoints.down('sm')]: {
      fontSize: 16,
      lineHeight: '24px',
    },
  },
  cardStyles: {
    padding: '1rem',
    [breakpoints.up('sm')]: {
      padding: '0 2rem',
      '&:first-of-type': {
        padding: '0 2rem 0 0',
      },
      '&:last-of-type': {
        padding: '0 0 0 2rem',
      },
    },
  },
  iconStyle: {
    marginBottom: '2.25rem !important',
    height: 40,
  },
}))

export default QuickAccess
