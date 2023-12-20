import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Accordion, InjectHTML } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { FAQ_EXPAND, SITE_INTERACTION } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { IShopComponents } from './types'
import colors from '@/shared-ui/colors'

const FiberInternetFAQ = ({ styles }: IShopComponents) => {
  const classes = useStyles()
  const { faqItems, title, schema } = useAppData('faqList', true)
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
      `2g-offer-faq:${title.toLowerCase()}`,
    )
    DTMClient.triggerEvent(
      { events: 'event14', eVar14: description },
      'tl_o',
      SITE_INTERACTION,
    )
  }

  return (
    <div className={classes.root} data-testid="FiberInternetFAQ" style={styles}>
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
    maxWidth: '1140px',
    margin: '0px auto',
    padding: '0 20px',
    [breakpoints.down('sm')]: {
      margin: '0 auto',
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
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
    '& p': {
      margin: '0!important',
    },
  },
}))

export default FiberInternetFAQ
