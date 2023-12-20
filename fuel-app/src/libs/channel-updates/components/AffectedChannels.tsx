import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { Accordion, InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER, SITE_INTERACTION } from 'src/constants'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const AffectedChannels = ({ data }: any) => {
  const classes = useStyles()
  const { title, statesList, maxCap, schema, headerNameTitle, header } = data

  const list = useMemo(() => {
    const itemsData: any[] = []
    statesList?.list?.map((listData: any) => {
      const title = listData?.title?.value || ''
      const tableData = listData?.cities?.list?.map(
        ({ name, tableList }: any) => {
          const properties =
            tableList?.properties.map(
              ({ name, textValue, value, isPrimary, toolTip }: any) => {
                return {
                  name: name?.value || null,
                  textValue:
                    textValue?.value === ''
                      ? '&mdash;'
                      : textValue?.value || null,
                  value: value?.value || null,
                  isPrimary: isPrimary?.value || null,
                  toolTip: toolTip?.value || null,
                }
              },
            ) || []

          return {
            properties,
            header: header?.value || '',
            tableName: name,
          }
        },
      )

      itemsData.push({ tableList: tableData, title })
    })
    return itemsData
  }, [statesList])

  if (Object.keys(data)?.length === 0) {
    return null
  }

  const handleClick = (expanded?: boolean, title?: any) => {
    if (expanded) {
      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: `channel updates:${title?.toLowerCase()}:expand`,
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
            list={list}
            descriptionClassName={classes.accordionDescription}
            shouldTruncate
            maxCap={Number(maxCap?.value)}
            isSingleItemOpen
            accordionClickHandler={handleClick}
            headerNameTitle={headerNameTitle?.value}
            roundedBorders={false}
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
  },
  root: {
    ...COMPONENT_WRAPPER,
    margin: '3.75rem auto',
    maxWidth: '996px',
    [breakpoints.down('sm')]: {
      margin: '1rem auto',
    },
  },
  faqTitle: {
    margin: '1rem auto',
    [breakpoints.down('sm')]: {
      margin: '0.5rem auto',
    },
  },
  faqContainer: {
    margin: '30px auto',
    '& h3:hover': {
      color: colors.main.brightRed,
    },
    [breakpoints.down('sm')]: {
      margin: '1rem auto',
    },
  },
  accordionDescription: {
    marginTop: 0,
    padding: '1rem 0',
    '& a': {
      textDecoration: 'underline',
      fontFamily: PP_OBJECT_SANS_MEDIUM,
    },
    '& p': {
      margin: '0!important',
      marginBottom: '16px!important',
    },
  },
  titleClassName: {
    paddingLeft: 0,
  },
}))

export default AffectedChannels
