import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Accordion, Typography } from '@/shared-ui/components'
import { FAQ_EXPAND, SITE_INTERACTION } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const FaqList = ({ data }: any) => {
  const classes = useStyles()
  const { faqItems, title, schema, maxCap, showMoreText, showLessText } = data
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
      `local-faq:${title.toLowerCase()}`,
    )
    DTMClient.triggerEvent(
      { events: 'event14', eVar14: description },
      'tl_o',
      SITE_INTERACTION,
    )
  }

  if (faqList?.length === 0) {
    return null
  }

  return (
    <div className={classes.root}>
      <Typography tagType="h2" styleType="h3" className={classes.sectionTitle}>
        {title?.value || ''}
      </Typography>
      <Accordion
        list={FIFaqList}
        descriptionClassName={classes.accordionDescription}
        shouldTruncate
        maxCap={maxCap?.value}
        showMoreText={showMoreText?.value}
        showLessText={showLessText?.value}
        accordionClickHandler={accordionClickHandler}
      />
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
    maxWidth: '992px',
    margin: 'auto',
    padding: '4.625rem 1rem',
    [breakpoints.down('xs')]: {
      padding: '2.5rem 1rem',
    },
  },
  sectionTitle: {
    textAlign: 'center',
    marginBottom: '2rem',
    [breakpoints.down('xs')]: {
      marginBottom: '1rem',
    },
  },
  accordionDescription: {
    marginTop: 0,
    padding: '2rem 1rem',
    '& a': {
      textDecoration: 'underline',
    },
    '& p': {
      margin: '0!important',
      fontSize: '1rem',
      lineHieght: '1.5rem',
    },
  },
}))

export default FaqList
