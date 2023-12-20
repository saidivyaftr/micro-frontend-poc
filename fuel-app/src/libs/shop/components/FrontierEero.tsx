import { useAppData } from 'src/hooks'
import {
  Button,
  ImagePerk,
  InjectHTML,
  Tooltip,
  Typography,
} from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { CTA_BUTTON, FRONTIER_EERO, SITE_INTERACTION } from 'src/constants'
import { InfoIconWhite } from 'src/blitz/assets/react-icons'
import { IShopComponents } from './types'

const FrontierEero = ({ styles }: IShopComponents) => {
  const compData = useAppData('frontierEroo', true) || {}
  const classes = useStyles()
  const onButtonClick = () => {
    //@ts-ignore
    s_objectID = FRONTIER_EERO.replace('{NAME}', compData?.butontText?.value)
  }

  if (Object.keys(compData).length === 0) {
    return null
  }

  return (
    <div id="frontier-eero" className={classes.container} style={styles}>
      <ImagePerk
        backgroundColor="primary"
        stripeColor="secondary"
        contentBoxBorderRadius={true}
        contentClassName={classes.contentBoxStyles}
        imageStyleClassName={classes.imageStyles}
        className={classes.imagePerk}
        linesBgColorsClass={classes.stripesStyles}
        content={
          <>
            {compData?.imageContentBox?.src && (
              <img
                src={compData?.imageContentBox?.src}
                alt={compData?.imageContentBox?.alt}
                className={classes.imageContentLogo}
              />
            )}
            <Typography
              tagType="h2"
              styleType="h3"
              className={classes.titleStyles}
            >
              {compData?.heading?.value}
            </Typography>
            <InjectHTML
              value={compData?.subHeading?.value}
              className={classes.paragraphStyle}
              tagType="p"
              styleType="p1"
            />
            {compData?.tooltipText?.value && (
              <Tooltip
                tooltipDirection={compData?.tooltipDirection?.value}
                tooltipText={compData?.tooltipText?.value}
                includeBorder={true}
                tooltipClassName={classes.tooltip}
                tooltipIcon={<InfoIconWhite />}
                dropShadow
              />
            )}
            {compData?.legal?.value && (
              <Typography
                className={classes.legal}
                tagType="p"
                data-testid="caption"
                styleType="legal"
              >
                {compData?.legal?.value || ''}
              </Typography>
            )}
            <Button
              className={classes.btnCustomStyle}
              type="link"
              text={compData?.butontText?.value}
              href={compData?.buttonUrl?.url}
              onClick={onButtonClick}
              triggerEvent={true}
              eventObj={{ events: 'event14', eVar14: CTA_BUTTON }}
              interactionType={SITE_INTERACTION}
            />
          </>
        }
        tabletBackgroundImage={compData?.tabletBackgroundImage ?? {}}
      />
    </div>
  )
}

export default FrontierEero

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {},
  imageContentLogo: {
    marginBottom: 40,
    [breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  titleStyles: {
    marginBottom: 8,
  },
  paragraphStyle: {
    display: 'initial',
    paddingTop: '0.5rem',
    '& sup': {
      fontSize: '12px',
    },
  },
  btnCustomStyle: {
    marginTop: '2rem',
    display: 'block !important',
    [breakpoints.down('md')]: {
      marginTop: '1.5rem',
      minWidth: 'unset !important',
    },
  },
  imagePerk: { maxWidth: 1200, margin: 'auto' },
  contentBoxStyles: {
    margin: '4rem 0',
    padding: '5rem 7rem 2rem 4.75rem ',
    [breakpoints.down('sm')]: {
      paddingLeft: 80,
      paddingRight: 80,
      margin: '2rem 1rem',
    },
    [breakpoints.down('xs')]: {
      padding: '2rem',
    },
  },
  legal: {
    display: 'block',
  },
  tooltip: {
    display: 'initial',
  },
  imageStyles: {
    marginTop: 120,
    [breakpoints.down('sm')]: {
      marginTop: 0,
      marginBottom: 24,
    },
  },
  stripesStyles: {
    [breakpoints.down('xs')]: {
      '& div': {
        height: '14px',
        bottom: 'calc(18% + 21px)',
        '&:first-of-type': {
          bottom: '18%',
        },
        '&:last-of-type': {
          bottom: 'calc(18% + 42px)',
        },
      },
    },
  },
}))
