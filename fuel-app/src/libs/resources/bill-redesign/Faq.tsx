import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { Accordion, InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER, SITE_INTERACTION } from 'src/constants'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import useAppData from '@/shared-ui/hooks/useAppData'

const BillRedeisgnFAQ = () => {
  const classes = useStyles()
  const faqData = useAppData('faqList', true)

  const { title, faqItems, maxCap, schema } = faqData

  const FIFaqList = useMemo(() => {
    return faqItems?.faqs?.map(({ title, description }: any) => ({
      title: title?.value || '',
      description: description?.value || '',
    }))
  }, [faqItems])

  if (Object.keys(faqData)?.length === 0) {
    return null
  }

  const handleClick = (expanded?: boolean, title?: any) => {
    if (expanded) {
      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: `bill-faq:${title?.toLowerCase()}:expand`,
        },
        'tl_o',
        SITE_INTERACTION,
      )
    }
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.root}>
        {title?.value && (
          <InjectHTML
            addAnchorStyles
            tagType="h2"
            styleType="h4"
            className={classes.faqTitle}
            value={title?.value}
          />
        )}
        <div className={classes.faqContainer}>
          <Accordion
            list={FIFaqList}
            descriptionClassName={classes.accordionDescription}
            shouldTruncate
            maxCap={maxCap?.value}
            isSingleItemOpen
            accordionClickHandler={handleClick}
            titleClassName={classes.titleClassName}
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

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    padding: '4px 0',
    backgroundColor: colors.main.newBackgroundGray,
    borderBottom: `1px solid ${colors.main.borderGrey}`,
  },
  root: {
    ...COMPONENT_WRAPPER,
    margin: '60px auto',
    maxWidth: '976px',
    [breakpoints.down('xs')]: {
      padding: '0 2rem',
    },
  },
  faqTitle: {
    margin: '16px auto',
  },
  faqContainer: {
    margin: '30px auto',
  },
  accordionDescription: {
    marginTop: 0,
    padding: '1rem 0',
    '& a': {
      textDecoration: 'underline',
      fontFamily: PP_OBJECT_SANS_MEDIUM,
    },
    '& p': {
      margin: '0 1rem 1rem 0',
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: 400,
    },
    '& ul > li': {
      padding: '0 1rem 0 2rem',
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: 400,
    },
    '& ul': {
      marginTop: '-1rem',
    },
  },
  titleClassName: {
    padding: '2rem 0',
  },
}))

export default BillRedeisgnFAQ
