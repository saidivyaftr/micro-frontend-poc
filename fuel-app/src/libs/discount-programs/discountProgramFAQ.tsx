import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Accordion, InjectHTML } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { FAQ_EXPAND, SITE_INTERACTION } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
const DiscountProgramFAQ = () => {
  const classes = useStyles()
  const { faqItems, title } = useAppData('faqList', true)
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
  return (
    <>
      {faqItems && (
        <div className={classes.root} data-testid="FiberInternetFAQ">
          {title?.value && (
            <InjectHTML
              data-testid="faqTitle"
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
            />
          </div>
        </div>
      )}
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    maxWidth: '1140px',
    margin: '5rem auto',
    padding: '0 20px',
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

export default DiscountProgramFAQ
