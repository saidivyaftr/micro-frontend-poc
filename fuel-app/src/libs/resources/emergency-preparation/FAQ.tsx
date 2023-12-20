import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Accordion, InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER, FAQ_EXPAND, SITE_INTERACTION } from 'src/constants'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { useAppData } from 'src/hooks'
const FAQ = () => {
  const data = useAppData('faqList', true)
  const { faqItems, title, schema, maxCap, showMoreText, showLessText } = data
  const classes = useStyles()
  const FIFaqList = useMemo(() => {
    return faqItems?.faqs?.map(({ title, description }: any) => ({
      title: title?.value || '',
      description: description?.value || '',
    }))
  }, [faqItems])
  const accordionClickHandler = (isExpanded: boolean, title: any) => {
    if (!isExpanded) return
    const description = FAQ_EXPAND.replace(
      '{TITLE}',
      `1g-offer-faq:${title.toLowerCase()}`,
    )
    DTMClient.triggerEvent(
      { events: 'event14', eVar14: description },
      'tl_o',
      SITE_INTERACTION,
    )
  }
  if (Object.keys(data)?.length === 0) {
    return null
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.root} data-testid="ResourcesFAQ">
        {title?.value && (
          <InjectHTML
            addAnchorStyles
            data-testid="faqTitle"
            tagType="h3"
            styleType="h3"
            className={classes.faqTitle}
            value={title?.value}
          />
        )}
        <div className={classes.faqContainer}>
          <Accordion
            list={FIFaqList}
            descriptionClassName={classes.accordionDescription}
            accordionClickHandler={accordionClickHandler}
            shouldTruncate
            maxCap={maxCap?.value}
            showMoreText={showMoreText?.value}
            showLessText={showLessText?.value}
          />
        </div>
        {schema?.value && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: schema?.value }}
          />
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  wrapper: {},
  root: {
    ...COMPONENT_WRAPPER,
    padding: 0,
    [breakpoints.down('sm')]: {
      padding: `${typography.pxToRem(16)}`,
    },
  },
  faqTitle: {
    margin: `0`,
    textAlign: 'center',
  },
  faqDescription: {
    margin: `${typography.pxToRem(16)} auto`,
  },
  faqContainer: {
    margin: `${typography.pxToRem(30)} auto 0 auto`,
  },
  accordionDescription: {
    marginTop: 0,
    padding: `${typography.pxToRem(16)}`,
    '& a': {
      textDecoration: 'underline',
      fontFamily: PP_OBJECT_SANS_MEDIUM,
    },
    '& p': {
      margin: '0!important',
      marginBottom: `${typography.pxToRem(16)}!important`,
    },
  },
}))

export default FAQ
