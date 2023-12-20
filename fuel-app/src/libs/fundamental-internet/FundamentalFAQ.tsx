import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Accordion, Typography } from '@/shared-ui/components'
import { useAppData } from '../../hooks'

const FundamentalFAQ = () => {
  const classes = useStyles()
  const { faqItems, title, schema, maxCap, showMoreText, showLessText } =
    useAppData('faqList', true)
  const faqList = faqItems?.faqs || []

  const FIFaqList = useMemo(() => {
    return faqList?.map(({ title, description }: any) => ({
      title: title?.value || '',
      description: description?.value || '',
    }))
  }, [faqList])

  if (faqList?.length === 0) {
    return null
  }

  return (
    <div className={classes.root}>
      <Typography tagType="h2" styleType="h3" className={classes.sectionTitle}>
        {title?.value || ''}
      </Typography>
      <Accordion
        list={FIFaqList}
        descriptionClassName={classes.accordionDescription}
        shouldTruncate
        maxCap={maxCap?.value}
        showMoreText={showMoreText?.value}
        showLessText={showLessText?.value}
      />
      {schema?.value != null && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schema?.value }}
        />
      )}
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    maxWidth: '1132px',
    margin: 'auto',
    padding: '80px 16px',
    [breakpoints.down('xs')]: {
      padding: '0px 16px 40px',
    },
  },
  sectionTitle: {
    marginBottom: '32px',
    marginLeft: '15px',
    [breakpoints.down('xs')]: {
      textAlign: 'center',
      marginLeft: '0',
      marginBottom: '8px',
    },
  },
  accordionDescription: {
    marginTop: 0,
    padding: 16,
    '& a': {
      textDecoration: 'underline',
    },
    '& p': {
      margin: '0!important',
    },
  },
}))

export default FundamentalFAQ
