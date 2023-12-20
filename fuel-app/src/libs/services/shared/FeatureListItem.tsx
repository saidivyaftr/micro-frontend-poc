import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { featureType } from 'src/redux/types/selserviceType'
import Collapse from '@material-ui/core/Collapse'
import { ChevronDown, ChevronUp } from '@/shared-ui/react-icons'
import { InjectHTML, Typography } from '@/shared-ui/components'
import colors from 'src/styles/theme/colors'
import { useAppData } from 'src/hooks'
type FeatureListItemPropType = { feature: featureType }

const FeatureListItem = ({ feature }: FeatureListItemPropType) => {
  const fatureslist = feature?.list?.list
  const faturesListItem = feature?.list?.targetItems
  const [isExpanded, expandList] = useState(false)
  const deafultList = fatureslist ? fatureslist.slice(0, 3) : null
  const expandedList =
    fatureslist && fatureslist.length > 3
      ? fatureslist.slice(3, fatureslist.length)
      : null
  const classes = useStyles()

  const productData = useAppData('SelfServiceProductContent', true)
  return (
    <div className={classes.featureGridItem}>
      <div className={classes.iconContainer}>
        <InjectHTML value={feature.icon?.rendered} />
      </div>
      <div>
        <Typography styleType="h6" tagType="h6">
          {feature.title.value}
        </Typography>
        <div>
          <Typography
            className={classes.featureDescription}
            styleType="p1"
            tagType="div"
          >
            {feature.description.value}
          </Typography>
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
            {/* List Item with Check Mark ✔️ */}
            <>
              {faturesListItem && (
                <ul className={classes.list}>
                  {faturesListItem.map((item: any) => (
                    <li
                      className={classes.listItem}
                      key={`${item?.title?.value}_key`}
                    >
                      <span className={classes.icon}>
                        <InjectHTML value={productData?.checkmark.value} />
                      </span>
                      <InjectHTML value={item?.text?.value} />
                    </li>
                  ))}
                </ul>
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
      borderRight: '1px solid #ccc',
      paddingRight: 40,
      [breakpoints.down('xs')]: {
        borderRight: 'none',
        paddingRight: 0,
      },
    },
    paddingTop: 32,
    paddingBottom: 32,
    [breakpoints.down('xs')]: {
      borderBottom: '1px solid #ccc',
      '&:last-child': {
        borderBottom: 'none',
      },
    },
  },
  featureDescription: {
    margin: '0 0 8px 0',
  },
  featureItem: {
    liststyleType: 'disc',
    display: 'list-item',
    margin: '0 0 8px 16px',
  },
  featureListItem: {
    listStyle: 'none',
    display: 'list-item',
    margin: '0 0 8px 16px',
    '& :before': {
      content: '✓',
    },
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
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    display: 'flex',
    marginBottom: '1rem',
  },
  icon: {
    marginRight: '0.5rem',
  },
}))
