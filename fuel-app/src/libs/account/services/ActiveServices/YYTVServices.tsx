import { makeStyles } from '@material-ui/core/styles'
import { Typography, InjectHTML, Button } from '@/shared-ui/components'
import clx from 'classnames'
import colors from '@/shared-ui/colors'
import { useAppData, useWindowDimensions } from 'src/hooks'
import moment from 'moment'

const YYTVServices = (props: any) => {
  const classes = useStyles()
  const { data, shouldDisableTile, onClickCTA, tabTitle } = props
  const { width } = useWindowDimensions()
  const isMobile = width <= 768
  const youtubeTvContent = useAppData('youtubeTvContent', true)
  const updateData = (str: string) => {
    const updatedString = str.replace(
      '$SIGNEDUP_DATE$',
      moment(data?.signedUpDate).format('MMM DD, YYYY'),
    )
    return updatedString
  }
  return (
    <div className={classes.tileClass}>
      <Typography
        tagType="h4"
        styleType="h4"
        className={clx({
          [classes.disableTile]: shouldDisableTile,
        })}
      >
        {data ? data.productName : youtubeTvContent?.title.value}
      </Typography>
      <ul
        className={clx(classes.listContainer, {
          [classes.disableTile]: shouldDisableTile,
        })}
      >
        {youtubeTvContent?.description?.targetItems?.map(
          (item: any, index: any) => {
            if (data?.signedUpDate) {
              return (
                <li key={`list_${index}`}>
                  <Typography tagType="span" styleType="p1">
                    <InjectHTML
                      className={clx(classes.textStyle, classes.title, {
                        [classes.disableTile]: shouldDisableTile,
                      })}
                      value={updateData(item.value.value)}
                    />
                  </Typography>
                </li>
              )
            }
          },
        )}
        {
          <li>
            <Typography tagType="span" styleType="p1">
              <InjectHTML
                className={clx(classes.textStyle, classes.title, {
                  [classes.disableTile]: shouldDisableTile,
                })}
                value={data?.youTubeTVPlan}
              />
            </Typography>
          </li>
        }
      </ul>
      <div>
        <div className={classes.buttonDiv}>
          {youtubeTvContent?.button1.text && (
            <Button
              type="link"
              variant={isMobile ? 'secondary' : 'secondary'}
              text={youtubeTvContent?.button1.text}
              href={youtubeTvContent?.button1.href}
              hoverVariant="primary"
              onClick={() =>
                onClickCTA(
                  `${tabTitle}:${
                    data ? data.productName : youtubeTvContent?.title.value
                  }:${youtubeTvContent?.button1.text}`,
                )
              }
            />
          )}
        </div>
        <div className={classes.buttonDiv}>
          {youtubeTvContent?.button2.text && (
            <Button
              type="link"
              variant={'tertiary'}
              text={youtubeTvContent?.button2.text}
              href={youtubeTvContent?.button2?.href}
              hoverVariant="primary"
              onClick={() =>
                onClickCTA(
                  `${tabTitle}:${
                    data ? data.productName : youtubeTvContent?.title.value
                  }:${youtubeTvContent?.button1.text}`,
                )
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  tileClass: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  disableTile: {
    color: `${colors.main.gray} !important`,
  },
  title: {
    marginTop: 16,
  },
  buttonDiv: {
    display: 'block',
    paddingRight: 16,
    paddingTop: 16,
    [breakpoints.up('sm')]: {
      display: 'inline-block',
    },
  },
  listContainer: {
    marginLeft: -20,
  },
  textStyle: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    [breakpoints.up('sm')]: {
      fontSize: '1.125rem',
      lineHeight: '1.625rem',
    },
  },
}))

export default YYTVServices
