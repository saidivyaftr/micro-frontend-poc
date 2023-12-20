import { useMemo, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { Accordion, InjectHTML } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER } from 'src/constants'
import { accordionClickHandler } from './AnalyticsUtlis'

const YoutubeTvFAQ = () => {
  const classes = useStyles()
  const { faqItems, title, schema } = useAppData('FAQ', true)
  const faqList = faqItems?.list || []
  const [First, setFirst] = useState<boolean>(true)

  const handleClick = (isExpanded: boolean, title: any) => {
    if (isExpanded && First) {
      accordionClickHandler(isExpanded, title)
      setFirst(false)
    }
  }

  const YTTVFaqList = useMemo(() => {
    return faqList?.map(({ title, description }: any) => ({
      title: title?.value || '',
      description: description?.value || '',
    }))
  }, [faqList])

  return (
    <div className={classes.root} data-testid="YoutubeTvFAQ">
      {title?.value && (
        <InjectHTML
          data-testid="faqTitle"
          tagType="h3"
          styleType="h3"
          className={classes.faqTitle}
          value={title?.value}
        />
      )}
      <div className={classes.faqContainer}>
        <Accordion
          list={YTTVFaqList}
          descriptionClassName={classes.accordionDescription}
          accordionClickHandler={handleClick}
          shouldTruncate
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
    ...COMPONENT_WRAPPER,
    margin: '60px auto',
  },
  faqTitle: {
    textAlign: 'center',
    maxWidth: 960,
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

export default YoutubeTvFAQ
