import { makeStyles } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
import WhatToExpectCard from './WhatToExpectCard'
import { useAppData } from 'src/hooks'

const WhatToExpect = () => {
  console.log(useAppData('WhatToExpect', true))
  const { title, items }: any = useAppData('WhatToExpect', true)
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography color="default" styleType="h3" className={classes.title}>
        {title?.value}
      </Typography>
      <div>
        {items.targetItems.map((item: any, i: number) => {
          return (
            <WhatToExpectCard
              key={item.title.value}
              title={item?.title?.value}
              description={item?.description?.value}
              image={item?.image?.value}
              imageAlt={item?.image?.alt}
              points={item?.points}
              imageOnLeft={i % 2 === 1}
            />
          )
        })}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    marginTop: '2.75rem',
    borderTop: '1px solid #C4C5C9',
    maxWidth: '1200px',
    margin: 'auto',
    [breakpoints.down('xs')]: {
      marginTop: '3.75rem',
    },
  },
  title: {
    maxWidth: '976px',
    textAlign: 'center',
    margin: '2.5rem auto 60px auto',
    padding: '0 1rem',
    [breakpoints.down('xs')]: {
      marginTop: '1rem',
    },
  },
}))

export default WhatToExpect
