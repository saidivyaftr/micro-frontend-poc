import { makeStyles } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
import { InjectHTML } from '@/shared-ui/components'
import clx from 'classnames'
import colors from '@/shared-ui/colors'

const WhatToExpectCard = (props: any) => {
  const {
    title,
    description,
    image,
    points,
    imageAlt,
    imageOnLeft = true,
  } = props
  console.log(image)
  const classes = useStyles()
  return (
    <div className={clx(classes.root, { [classes.cardFlip]: imageOnLeft })}>
      <div className={classes.imageCol}>
        <img className={classes.img} src={image} alt={imageAlt} />
      </div>
      <div
        className={clx(classes.textCol, {
          [classes.leftTextCol]: imageOnLeft,
        })}
      >
        <Typography color="default" styleType="h4" className={classes.title}>
          {title}
        </Typography>
        <InjectHTML
          className={classes.description}
          styleType="p1"
          testId="test-article-title"
          value={description}
        />
        <ul className={classes.ul}>
          {points?.targetItems?.map((point: any) => {
            return (
              <li className={classes.li} key={point.value.value}>
                <Typography color="default" styleType="p1">
                  {point.value.value}
                </Typography>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    maxWidth: '1200px',
    padding: '0 1rem',
    margin: '0px auto 80px auto',
    [breakpoints.down('xs')]: {
      flexDirection: 'column !important',
      margin: '0px auto 3.25rem auto',
    },
  },
  cardFlip: {
    flexDirection: 'row-reverse',
  },
  title: {
    textAlign: 'left',
  },
  img: {
    borderRadius: '2rem',
    maxWidth: '600px',
    width: '100%',
    maxHeight: 400,
    [breakpoints.down('xs')]: {
      width: '100%',
      maxWidth: 343,
      maxHeight: 300,
    },
  },
  imageCol: {
    width: '50%',
    [breakpoints.down('xs')]: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  },
  textCol: {
    width: '50%',
    marginLeft: '48px',
    [breakpoints.down('xs')]: {
      width: '100%',
      marginTop: '2rem',
      marginLeft: '0',
    },
  },
  description: {
    marginTop: '1rem',
  },
  leftTextCol: {
    maxWidth: '480px',
    marginRight: 'auto',
    [breakpoints.down('xs')]: {
      maxWidth: 'unset',
    },
  },
  li: {
    color: colors.main.brightRed,
    marginBottom: '1rem',
  },
  ul: {
    paddingLeft: '1rem',
  },
}))

export default WhatToExpectCard
