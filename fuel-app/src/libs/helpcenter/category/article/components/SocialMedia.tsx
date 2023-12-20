import clx from 'classnames'
import { makeStyles } from '@material-ui/core'
import { InjectHTML, Typography } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { decodeHtmlCharCodes } from 'src/utils/helpCenter'
import colors from '@/shared-ui/colors'

const SocialMedia = ({ data, hideOnLargeDisplays }: any) => {
  const styles = useStyles()
  const { social_media_links } = data || {}
  const { title, subTitle } = useAppData('heading', true)
  if (Object.keys(data || {}).length == 0) {
    return null
  }

  const handleClick = (type: string) => {
    if (type === 'externalLink') {
      navigator?.clipboard?.writeText?.(window?.location?.href).then(
        () => {
          console.log('Copied to clipboard successfully.')
        },
        (err) => {
          console.log('Failed to copy the text to clipboard.', err)
        },
      )
    }
    if (type === 'email') {
      const cleanTitle = title?.value?.replace(/<\/?[^>]+(>|$)/g, '') || ''
      const cleanDescription =
        subTitle?.value?.replace(/<\/?[^>]+(>|$)/g, '') || ''
      const decodedTitle = decodeHtmlCharCodes(cleanTitle) || ''
      const decodedDescription = decodeHtmlCharCodes(cleanDescription) || ''
      const NEW_LINE = `%0D%0A`
      const body = `${decodedDescription} ${NEW_LINE} ${NEW_LINE} ${
        window?.location?.href || ''
      }`
      window.open(`mailto:?subject=${decodedTitle}&body=${body}`)
    }
  }

  return (
    <div
      className={clx(styles.shareContainer, {
        [styles.hideOnLargeDisplays]: hideOnLargeDisplays,
      })}
    >
      <Typography tagType="p" styleType="p1" className={styles.shareText}>
        Share
      </Typography>
      <div>
        <ul className={styles.socialMediaLinks}>
          {social_media_links?.links?.map?.(
            ({ icon, type, name }: any, index: number) => {
              if (!icon?.value) {
                return null
              }
              return (
                <li key={`social-media-${index}`}>
                  <button
                    onClick={() => handleClick(type?.value)}
                    title={name?.value}
                  >
                    <InjectHTML addAnchorStyles value={icon?.value} />
                  </button>
                </li>
              )
            },
          )}
        </ul>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  shareContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
    marginTop: 32,
    '& svg': {
      '&:hover': {
        cursor: 'pointer',
        '& .circle': {
          fill: colors.main.brightRed,
        },
      },
    },
  },
  hideOnLargeDisplays: {
    display: 'none',
    marginTop: 0,
    [breakpoints.down('md')]: {
      display: 'flex',
    },
  },
  shareText: {
    paddingRight: '10px',
    paddingBottom: 5,
  },
  socialMediaLinks: {
    display: 'flex',
    padding: 0,
    margin: 0,
    paddingLeft: '0px !important',
    '& li': {
      listStyleType: 'none',
      marginBottom: '0px !important',
      '& button': {
        border: 0,
        background: 'transparent',
      },
    },
  },
}))

export default SocialMedia
