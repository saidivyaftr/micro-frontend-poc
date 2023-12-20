import { makeStyles } from '@material-ui/core'
import clx from 'classnames'
import { InjectHTML, Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'

const KnowYourRights = () => {
  const classes = useStyles()
  const knowYourRightsData = useAppData('knowYourRights', true)
  const {
    title,
    description,
    rightToReview_title,
    rightToReview_list,
    rightToDelete_title,
    rightToDelete_list,
  } = knowYourRightsData

  if (Object.keys(knowYourRightsData).length === 0) {
    return null
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.section}>
        <Typography styleType="h3" tagType="h3">
          {title?.value}
        </Typography>
        <InjectHTML
          addAnchorStyles
          styleType="p1"
          value={description?.value}
          className={classes.description}
        />
      </div>
      <div className={clx(classes.section)}>
        <div className={classes.listContainer}>
          <div>
            <InjectHTML
              addAnchorStyles
              styleType="h5"
              value={rightToReview_title?.value}
              className={classes.splitSectionTitle}
            />
            <ul>
              {rightToReview_list?.list?.map(
                (listItem: any, innerIndex: number) => {
                  return (
                    <li key={`rights-item-${innerIndex}`}>
                      <InjectHTML
                        styleType="p1"
                        addAnchorStyles
                        value={listItem?.detail?.value}
                      />
                    </li>
                  )
                },
              )}
            </ul>
          </div>
          <div>
            <InjectHTML
              styleType="h5"
              value={rightToDelete_title?.value}
              addAnchorStyles
              className={classes.splitSectionTitle}
            />
            <ul>
              {rightToDelete_list?.list?.map(
                (listItem: any, innerIndex: number) => {
                  return (
                    <li key={`delete-rights-item-${innerIndex}`}>
                      <InjectHTML
                        styleType="p1"
                        addAnchorStyles
                        value={listItem?.detail?.value}
                      />
                    </li>
                  )
                },
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '2.5rem 16px',
    textAlign: 'center',
  },
  section: {
    borderBottom: `1px solid ${colors.main.borderGrey}`,
    padding: `50px 0`,
  },
  description: {
    maxWidth: 900,
    margin: 'auto',
  },
  splitSectionTitle: {
    marginBottom: 32,
  },
  listContainer: {
    display: 'flex',
    maxWidth: 900,
    margin: 'auto',
    '& li': {
      textAlign: 'left',
      marginBottom: 16,
    },
    [breakpoints.down('xs')]: {
      display: 'block',
    },
  },
}))

export default KnowYourRights
