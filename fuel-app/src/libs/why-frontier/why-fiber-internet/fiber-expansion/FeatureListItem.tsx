import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'
import { ChevronDown, ChevronUp } from '@/shared-ui/react-icons'
import { InjectHTML, Typography, Button } from '@/shared-ui/components'
import colors from 'src/styles/theme/colors'
import CopyToClickboard from './CopyToClickboard'

type featureType = {
  title: { value: string }
  description: { value: string }
  buttonText: { value: string }
  emailSubjectLine: { value: string }
  emailBody: { value: string }
  list?: { list: Array<{ description: { value: string } }> }
  copyToClipboard?: { value: boolean }
}

type FeatureListItemPropType = { feature: featureType }

const FeatureListItem = ({ feature }: FeatureListItemPropType) => {
  const fatureslist = feature?.list?.list
  const [isExpanded, expandList] = useState(false)
  const deafultList = fatureslist ? fatureslist.slice(0, 3) : null
  const expandedList =
    fatureslist && fatureslist.length > 3
      ? fatureslist.slice(3, fatureslist.length)
      : null
  const classes = useStyles()

  return (
    <div className={classes.featureGridItem}>
      <div>
        <Typography
          styleType="h4"
          tagType="h6"
          className={classes.featureTitle}
        >
          {feature.title.value}
        </Typography>
        <div>
          {!feature.copyToClipboard?.value ? (
            <InjectHTML
              styleType="p1"
              tagType="div"
              className={classes.featureDescription}
              value={feature.description.value}
            ></InjectHTML>
          ) : (
            <CopyToClickboard
              copy={window.location.href}
              value={feature.description.value}
            />
          )}
          <Button
            type="button"
            text={feature.buttonText.value}
            variant="primary"
            onClick={() => {
              const subject = feature?.emailSubjectLine?.value
              const newString = feature?.emailBody?.value.replace(
                /%%break%%/g,
                '\n \n',
              )
              const formattedBody = encodeURIComponent(newString)
              window.location.href = `mailto:?subject=${subject}&body=${formattedBody}`
            }}
            triggerEvent={true}
            eventObj={{
              events: 'event14',
              eVar14: `${feature?.buttonText?.value}`,
            }}
            className={classes.emailButton}
          />
          <div>
            <>
              {deafultList &&
                deafultList.map((item) => (
                  <Typography
                    key={`${item}`}
                    styleType="p1"
                    tagType="p"
                    className={classes.featureItem}
                  >
                    {item?.description?.value}
                  </Typography>
                ))}
            </>
            <>
              {expandedList && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  {expandedList.map((item) => (
                    <Typography
                      key={`${item}`}
                      styleType="p1"
                      tagType="p"
                      className={classes.featureItem}
                    >
                      {item?.description?.value}
                    </Typography>
                  ))}
                </Collapse>
              )}
            </>
            {expandedList && (
              <div
                className={classes.expandButton}
                onClick={() => expandList(!isExpanded)}
              >
                {isExpanded ? <ChevronUp /> : <ChevronDown />}
                <Typography tagType="div" styleType="p2" fontType="boldFont">
                  {isExpanded ? 'Show less' : 'Show more'}
                </Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureListItem

const useStyles = makeStyles(({ breakpoints }) => ({
  featureGridItem: {
    display: 'flex',
    '&:nth-child(odd)': {
      borderRight: `1px solid ${colors.main.gray}`,
      paddingRight: 40,
      [breakpoints.down('xs')]: {
        borderRight: 'none',
        paddingRight: 0,
      },
    },
    paddingTop: 32,
    paddingBottom: 32,
    [breakpoints.down('xs')]: {
      borderBottom: `1px solid ${colors.main.gray}`,
      '&:last-child': {
        borderBottom: 'none',
      },
    },
  },
  featureTitle: {
    marginBottom: '16px',
    [breakpoints.down('md')]: {
      height: '114px',
    },
    [breakpoints.down('sm')]: {
      height: '152px',
    },
    [breakpoints.down('xs')]: {
      height: 'auto',
    },
  },
  featureDescription: {
    margin: '0 0 8px 0',
    height: '130px',
    marginBottom: '16px',
    [breakpoints.down('sm')]: {
      height: '160px',
    },
    [breakpoints.down('xs')]: {
      height: 'auto',
    },
  },
  emailButton: {},
  featureItem: {
    liststyleType: 'disc',
    display: 'list-item',
    margin: '0 0 8px 16px',
  },
  iconContainer: {
    marginRight: 16,
    maxHeight: 32,
  },
  expandButton: {
    cursor: 'pointer',
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    '& svg': {
      height: 16,
      width: 16,
      color: colors.main.dark,
    },
  },
}))
