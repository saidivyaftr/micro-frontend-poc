import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Accordion, InjectHTML } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { FAQ_EXPAND, SITE_INTERACTION } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const FiberStreamingFAQ = () => {
  const classes = useStyles()
  const { listItems, heading } = useAppData('faq', true)
  if (!heading) {
    return null
  }
  const faqList = listItems?.list || []
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const FIFaqList = useMemo(() => {
    return faqList?.map(({ title, content }: any) => ({
      title: title?.value || '',
      description: content?.value || '',
    }))
  }, [faqList])

  const handleQuestion = (isExpanded: boolean, title: any) => {
    if (!isExpanded) return
    const description = FAQ_EXPAND.replace(
      '{TITLE}',
      `streaming-faq:${title.toLowerCase()}`,
    )
    DTMClient.triggerEvent(
      { events: 'event14', eVar14: description },
      'tl_o',
      SITE_INTERACTION,
    )
  }
  return (
    <div className={classes.root} data-testid="FiberStreamingFAQ">
      {heading?.value && (
        <InjectHTML
          data-testid="faqTitle"
          styleType="h3"
          className={classes.faqTitle}
          value={heading?.value}
        />
      )}
      <div className={classes.faqContainer}>
        <Accordion
          list={FIFaqList}
          descriptionClassName={classes.accordionDescription}
          accordionClickHandler={handleQuestion}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '1140px',
    margin: '60px auto',
    padding: '0 20px',
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
    },
  },
}))

export default FiberStreamingFAQ
