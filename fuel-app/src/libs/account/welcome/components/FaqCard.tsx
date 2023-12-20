import { CardWithTitle } from '@/shared-ui/components/Card/Card'
import useAppData from '@/shared-ui/hooks/useAppData'
import { makeStyles } from '@material-ui/core'
import { Typography } from 'src/blitz'
import { Accordion } from '@/shared-ui/components'
import { useMemo } from 'react'

const FaqCard = () => {
  const classes = useStyles()
  const { title: faqTitle, faqItems } = useAppData('faqList', true) || {}
  const faqList = faqItems?.faqs || []
  const FaqListArr = useMemo(() => {
    return faqList?.map(({ title, description }: any) => ({
      title: title?.value || '',
      description: description?.value || '',
    }))
  }, [faqList])

  return (
    <CardWithTitle className={classes.cardContainer}>
      <>
        <Typography styleType="h5">{faqTitle?.value}</Typography>
        <div>
          <Accordion list={FaqListArr} />
        </div>
      </>
    </CardWithTitle>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  cardContainer: {
    [breakpoints.up('md')]: {
      padding: 48,
    },
  },
}))

export default FaqCard
