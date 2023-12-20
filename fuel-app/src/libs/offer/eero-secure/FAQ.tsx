import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Accordion, InjectHTML } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { FAQ_EXPAND, SITE_INTERACTION, COMPONENT_WRAPPER } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
const FAQ = () => {
  const classes = useStyles()
  const data = useAppData('faqList', true)
  const { faqItems, title } = data
  const faqList = faqItems?.faqs || []
  const FIFaqList = useMemo(() => {
    return faqList?.map(({ title, description }: any) => ({
      title: title?.value || '',
      description: description?.value || '',
    }))
  }, [faqList])
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

  if (Object.keys(data).length === 0 || faqList.length === 0) return null

  return (
    <div className={classes.root} data-testid="faq">
      {title?.value && (
        <InjectHTML
          data-testid="faqTitle"
          styleType="h3"
          className={classes.faqTitle}
          value={title?.value}
        />
      )}
      <div className={classes.faqContainer} data-testid="faq-accordion">
        <Accordion
          list={FIFaqList}
          isSingleItemOpen={true}
          descriptionClassName={classes.accordionDescription}
          accordionClickHandler={accordionClickHandler}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    maxWidth: `${typography.pxToRem(1140)}`,
    margin: '5rem auto',
    padding: `0 ${typography.pxToRem(20)}`,
    [breakpoints.down('sm')]: {
      margin: '3rem auto',
    },
  },
  faqTitle: {
    textAlign: 'center',
    maxWidth: 600,
    margin: 'auto',
  },
  faqContainer: {
    maxWidth: `${typography.pxToRem(840)}`,
    margin: `${typography.pxToRem(30)} auto`,
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

export default FAQ
