import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Accordion, InjectHTML } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
const FiberInternetFAQ = () => {
  const classes = useStyles()
  const { faqItems, title, schema } = useAppData('faqList', true)
  const faqList = faqItems?.faqs || []

  const FIFaqList = useMemo(() => {
    return faqList?.map(({ title, description }: any) => ({
      title: title?.value || '',
      description: description?.value || '',
    }))
  }, [faqList])

  return (
    <div className={classes.root} data-testid="FiberInternetFAQ">
      {title?.value && (
        <InjectHTML
          data-testid="faqTitle"
          tagType="h2"
          styleType="h3"
          className={classes.faqTitle}
          value={title?.value}
        />
      )}
      <div className={classes.faqContainer}>
        <Accordion
          list={FIFaqList}
          borderUnderDescription={true}
          descriptionClassName={classes.accordionDescription}
        />
      </div>
      {schema?.value != null && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schema?.value }}
        />
      )}
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    margin: '0 auto',
    padding: '5rem 1rem 3.125rem 1rem',
  },
  faqTitle: {
    textAlign: 'center',
    maxWidth: 600,
    margin: 'auto',
  },
  faqContainer: {
    maxWidth: '840px',
    margin: '30px auto',
  },
  accordionDescription: {
    marginTop: 0,
    padding: 16,
    '& a': {
      textDecoration: 'underline',
    },
    '& p': {
      margin: '0!important',
      marginBottom: '16px!important',
    },
  },
}))

export default FiberInternetFAQ
