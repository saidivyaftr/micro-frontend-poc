import { makeStyles } from '@material-ui/core'
import { Typography, InjectHTML } from 'src/blitz'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from 'src/styles/theme/colors'

interface PageProps {
  cartStickyBarContent?: any
}

const ExpertSupport = ({ cartStickyBarContent }: PageProps) => {
  const classes = useStyles()

  const { productExplanationHeadline, productExplanationSubCopy } =
    cartStickyBarContent
  return (
    <div className={classes.wrapper}>
      <div className={classes.redLine} />
      <div className={classes.container}>
        <div className={classes.featureGridWrapper}>
          <Typography styleType="h3" tagType="h3" color="tertiary">
            {productExplanationHeadline?.value}
          </Typography>
          <InjectHTML
            tagType="div"
            color="tertiary"
            styleType="p1"
            value={productExplanationSubCopy?.value}
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    width: '100vw',
    background: colors.main.dark,
  },
  redLine: {
    ...COMPONENT_WRAPPER,
    border: `3px solid ${colors.main.brightRed}`,
  },
  container: {
    ...COMPONENT_WRAPPER,
    width: '100%',
    paddingTop: 80,
    paddingBottom: 80,
    [breakpoints.down('md')]: {
      paddingTop: 40,
      paddingBottom: 40,
    },
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: '1rem',
      paddingTop: 32,
      paddingBottom: 32,
    },
  },
  featureGridWrapper: {
    display: 'inline-grid',
    gridTemplateColumns: '45% auto',
    gridGap: 16,
    alignItems: 'center',
    width: '100%',
    [breakpoints.down('md')]: {
      '& h3': {
        fontSize: '2.2rem',
      },
    },
    [breakpoints.down('sm')]: {
      '& h3': {
        fontSize: '1.8rem',
        lineHeight: '2.8rem',
      },
    },
    [breakpoints.down('xs')]: {
      gridTemplateColumns: 'auto',
    },
  },
  textColor: {
    color: '#fff',
  },
}))

export default ExpertSupport
