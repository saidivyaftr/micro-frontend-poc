import { makeStyles } from '@material-ui/core'
import { Accordion, InjectHTML } from '@/shared-ui/components'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { SITE_INTERACTION } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
const SecurePasswordFaq = ({ data }: any) => {
  const router = useRouter()
  const anchor = router.asPath.substring(router.asPath.lastIndexOf('#') + 1)
  const handleScroll = (anchorTag: string) => {
    const elem = document.getElementById(anchorTag)
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop,
        behavior: 'smooth',
      })
    }
  }
  useEffect(() => {
    handleScroll(anchor)
  }, [])

  const classes = useStyles()
  const { id, faqs, title, description, maxCap, schema } = data || {}
  const FIFaqList = faqs?.links?.map(({ title, description }: any) => ({
    title: title?.value || '',
    description: description?.value || '',
  }))

  if (!data || Object.keys(data || {}).length == 0) {
    return null
  }

  const accordionHandler = (isExpanded: boolean, title: any) => {
    if (isExpanded) {
      const description = `faq:${title?.toLowerCase()}:expand`
      DTMClient.triggerEvent(
        { events: 'event14', eVar14: description },
        'tl_o',
        SITE_INTERACTION,
      )
    }
  }
  return (
    <div className={classes.root} id={id?.value}>
      {title?.value && (
        <InjectHTML
          addAnchorStyles
          tagType="h2"
          styleType="h4"
          className={classes.faqTitle}
          value={title?.value}
        />
      )}
      <div>
        {description?.value && (
          <InjectHTML
            addAnchorStyles
            styleType="p1"
            className={classes.faqDescription}
            value={description?.value}
          />
        )}
      </div>
      <div className={classes.faqContainer}>
        <Accordion
          list={FIFaqList}
          descriptionClassName={classes.accordionDescription}
          maxCap={maxCap.value}
          openFirstItemOnLoad={!!anchor && anchor === id?.value}
          accordionClickHandler={accordionHandler}
        />
      </div>
      {schema?.value && (
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
    margin: '60px auto',
    [breakpoints.down('sm')]: {
      margin: '32px auto',
      marginBottom: 80,
      padding: 0,
    },
  },
  faqTitle: {
    maxWidth: 600,
  },
  faqDescription: {
    margin: '16px auto',
  },
  faqContainer: {
    maxWidth: '840px',
    marginTop: '30px',
    [breakpoints.down('sm')]: {
      marginTop: 8,
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

export default SecurePasswordFaq
