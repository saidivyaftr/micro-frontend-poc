import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { Accordion, InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER, SITE_INTERACTION } from 'src/constants'
import { useAppData } from 'src/hooks'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const ContactUsCenterFAQ = () => {
  const classes = useStyles()
  const faqData = useAppData('faqData', true)
  const { title, faqItems, maxCap, schema } = faqData

  const FIFaqList = useMemo(() => {
    return faqItems?.list?.map(({ title, description }: any) => ({
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
          eVar14: title?.toLowerCase(),
        },
        'tl_o',
        SITE_INTERACTION,
      )
    }

    const element: any = document.getElementById('chat-with-us')
    try {
      element.onclick = (e: any) => {
        e = e || window.event
        e.preventDefault()
        const chat = document.getElementsByClassName(
          'minimized',
        ) as HTMLCollectionOf<HTMLElement>
        chat[0]?.click()
      }
    } catch (error) {}
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
  faqContainer: {
    margin: '30px auto',
    '& h3:hover': {
      color: colors.main.brightRed,
    },
  },
  accordionDescription: {
    marginTop: 0,
    padding: 16,
    '& a': {
      textDecoration: 'underline',
      fontFamily: PP_OBJECT_SANS_MEDIUM,
    },
    '& p': {
      margin: '0!important',
      marginBottom: '16px!important',
    },
  },
}))

export default ContactUsCenterFAQ
