import { Typography, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import {
  PP_OBJECT_SANS,
  PP_OBJECT_SANS_BOLD,
} from 'src/constants/fontFamilyNames'

const ModalContent = (props: any) => {
  const classes = useStyles()
  const { data } = props
  const { heading, subHeading, steps } = data

  return (
    <div className={classes.root}>
      <Typography className={classes.title} tagType="span" styleType="p1">
        {heading?.value}
      </Typography>
      <InjectHTML className={classes.subTitle} value={subHeading?.value} />
      <div className={classes.steps}>
        {steps &&
          steps?.list.map((item: any, index: string) => (
            <div key={index} className={classes.step}>
              <div className={classes.stepIndex}>{index + 1}</div>
              <div>{item?.step?.value}</div>
            </div>
          ))}
      </div>
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '0.625rem 6rem 3rem 6rem',
    [breakpoints.down('sm')]: {
      padding: '1.7rem .9rem',
    },
  },
  steps: {
    display: 'flex',
    flexDirection: 'column',
    gap: '.5rem',
  },
  title: {
    fontFamily: PP_OBJECT_SANS_BOLD,
    fontSize: '1.874rem',
    lineHeight: '2.375',
    [breakpoints.down('sm')]: {
      fontSize: '1.25rem',
      lineHeight: '1.75',
      fontWeight: 700,
    },
  },
  subTitle: {
    fontWeight: 400,
    fontSize: '1.125rem',
    lineHeight: '1.625rem',
    [breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  step: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '1.125rem',
    fontFamily: PP_OBJECT_SANS,
    lineHeight: '1.625rem',
    gap: '.3rem',
    [breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  stepIndex: {
    fontFamily: PP_OBJECT_SANS_BOLD,
    color: colors.main.brightRed,
    fontSize: '1rem',
    width: '.5rem',
    margin: '0 .6rem',
  },
}))
export default ModalContent
