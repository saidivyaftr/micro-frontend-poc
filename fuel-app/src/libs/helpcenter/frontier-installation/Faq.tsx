import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Accordion, InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER, FAQ_EXPAND, SITE_INTERACTION } from 'src/constants'
import { useAppData } from 'src/hooks'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const FrontierInstallationFAQ = () => {
  const classes = useStyles()
  const faqData = useAppData('faqData', true)

  const {
    faqItems,
    title,
    schema,
    maxCap,
    description,
    showMoreText,
    showLessText,
  } = faqData

  const FIFaqList = useMemo(() => {
    return faqItems?.list?.map(({ title, description }: any) => ({
      title: title?.value || '',
      description: description?.value || '',
    }))
  }, [faqItems])

  if (Object.keys(faqData)?.length === 0) {
    return null
  }

  const accordionClickHandler = (isExpanded: boolean, title: any) => {
    if (!isExpanded) return
    const description = FAQ_EXPAND.replace(
      '{TITLE}',
      `faq:${title.toLowerCase()}`,
    )
    DTMClient.triggerEvent(
      { events: 'event14', eVar14: description },
      'tl_o',
      SITE_INTERACTION,
    )
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.root} data-testid="FrontierInstallationFAQ">
        {title?.value && (
          <InjectHTML
            addAnchorStyles
            data-testid="faqTitle"
            tagType="h2"
            styleType="h4"
            className={classes.faqTitle}
            value={title?.value}
          />
        )}
        {description?.value && (
          <InjectHTML
            addAnchorStyles
            data-testid="faqDescription"
            styleType="p1"
            className={classes.faqDescription}
            value={description?.value}
          />
        )}
        <div className={classes.faqContainer}>
          <Accordion
            list={FIFaqList}
            descriptionClassName={classes.accordionDescription}
            shouldTruncate
            maxCap={maxCap?.value}
            showMoreText={showMoreText?.value}
            showLessText={showLessText?.value}
            accordionClickHandler={accordionClickHandler}
          />
        </div>
        {schema?.value != null && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: schema?.value }}
          />
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  wrapper: {
    padding: '4px 0',
  },
  root: {
    ...COMPONENT_WRAPPER,
    margin: '60px auto',
  },
  faqTitle: {
    margin: '16px auto',
  },
  faqDescription: {
    margin: '16px auto',
  },
  faqContainer: {
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

export default FrontierInstallationFAQ
