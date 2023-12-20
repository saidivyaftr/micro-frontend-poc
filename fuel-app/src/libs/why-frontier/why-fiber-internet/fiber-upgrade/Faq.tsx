import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Accordion, InjectHTML } from 'src/blitz'
import { FAQ_EXPAND, SITE_INTERACTION, COMPONENT_WRAPPER } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { useAppData } from 'src/hooks'

const FiberUpgradeFAQ = () => {
  const classes = useStyles()
  const { faqItems, title }: any = useAppData('faqList', true)
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
      `tv-faq:${title.toLowerCase()}`,
    )
    DTMClient.triggerEvent(
      { events: 'event14', eVar14: description },
      'tl_o',
      SITE_INTERACTION,
    )
  }

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
          descriptionClassName={classes.accordionDescription}
          accordionClickHandler={accordionClickHandler}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    margin: '60px auto',
    maxWidth: '1200px',
  },
  faqTitle: {
    margin: 'auto',
    [breakpoints.up('md')]: {
      paddingLeft: '60px',
    },
  },
  faqContainer: {
    maxWidth: 'auto',
    margin: '30px 3.5rem',
    [breakpoints.down('xs')]: {
      margin: '1rem',
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
      marginBottom: '16px!important',
    },
    '& sup': {
      lineHeight: '0',
    },
  },
}))

export default FiberUpgradeFAQ
