import { useRef } from 'react'
import { makeStyles, Grid, Zoom } from '@material-ui/core'
import {
  Button,
  InjectHTML,
  Picture,
  Typography,
  TooltipPopover,
} from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import useIntersection from 'src/hooks/useIntersection'
import { COMPONENT_WRAPPER, CTA_BUTTON, SITE_INTERACTION } from 'src/constants'
import { useAppData } from 'src/hooks'
import { InfoIconWhite } from '@/shared-ui/react-icons'

interface SportsFanFavoritesCardProps {
  data: any
  slide: number
}
const SportsFanFavorites = () => {
  const data = useAppData('SportsFanFavorites', true)
  const {
    title,
    list: { targetItems = [] },
  } = data
  const classes = useStyles()

  if (Object.keys(data).length === 0) {
    return null
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography tagType="h3" styleType="h3">
          {title?.value}
        </Typography>
        {targetItems?.map((data: any, index: number) => (
          <SportsFanFavoritesCard key={index} data={data} slide={index} />
        ))}
      </div>
    </div>
  )
}

const SportsFanFavoritesCard = (props: SportsFanFavoritesCardProps) => {
  const { data, slide } = props
  const classes = useStyles()
  const direction = data?.direction?.direction?.field?.value

  const cardRef = useRef<HTMLDivElement>(null)
  const inViewPort = useIntersection(cardRef, '-100px')
  return (
    <div
      className={`${classes.cards} ${slide == 2 && classes.noGutter}`}
      ref={cardRef}
    >
      <Grid container className={classes.outerContainer} direction={direction}>
        <Grid item md={7} sm={12} className="figure">
          <Zoom in={inViewPort} timeout={500}>
            <Picture
              testId="cardImage"
              className={classes.cardImage}
              desktop={{
                image: data?.image?.src,
                webp: data?.imagewebp?.src,
              }}
              mobile={{
                image: data?.mobileImage?.src,
                webp: data?.mobileImageWeb?.src,
              }}
              altText={data?.image?.alt}
              width="100%"
              height="100%"
            />
          </Zoom>
        </Grid>
        <Grid item md={5} sm={12}>
          <div className={classes.innerContainer}>
            <InjectHTML
              className={classes.title}
              tagType="h3"
              styleType="h5"
              value={data?.title?.value}
            />
            <div>
              <Typography
                className={classes.description}
                tagType="p"
                styleType="p1"
              >
                {data?.content?.value}
              </Typography>
              {data?.toolTipText?.value && (
                <TooltipPopover
                  tooltipDirection={'bottom'}
                  tooltipContent={data?.toolTipText?.value}
                  tooltipIcon={<InfoIconWhite />}
                />
              )}
            </div>

            <div className={classes.buttonContainer}>
              <Button
                type="link"
                className={classes.buttonStle}
                text={data?.primaryButtonText?.value}
                href={data?.primaryButtonLink?.url}
                triggerEvent={true}
                eventObj={{ events: 'event14', eVar14: CTA_BUTTON }}
                interactionType={SITE_INTERACTION}
              />
              {data?.legalText?.value && (
                <InjectHTML
                  className={classes.legalText}
                  tagType="p"
                  data-testid="caption"
                  styleType="legal"
                  value={data?.legalText?.value}
                />
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: colors.main.greenishBlue,
  },
  container: {
    ...COMPONENT_WRAPPER,
    padding: '80px 16px',
    [theme.breakpoints.down('sm')]: {
      padding: '48px 16px',
    },
  },
  cards: {
    marginTop: theme.typography.pxToRem(32),
    [theme.breakpoints.down('md')]: {
      padding: '0',
    },
    '& .figure': {
      overflow: 'hidden',
      '& img': {
        display: 'block',
      },
    },
  },
  noGutter: {
    marginBottom: 0,
  },
  outerContainer: {
    borderRadius: '2rem',
    backgroundColor: colors.main.white,
    '& .figure': {
      borderRadius: '0 32px 32px 0',
      [theme.breakpoints.down('sm')]: {
        borderRadius: '2rem 2rem 0 0',
      },
    },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  innerContainer: {
    borderRadius: '2rem',
    padding: '48px',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      padding: '28px 16px 40px',
    },
  },
  cardImage: {
    height: '100%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      minHeight: '18.75rem',
    },
  },
  buttonStle: {
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  buttonContainer: {
    marginTop: '2rem',
  },
  description: {
    margin: 0,
    display: 'inline',
    marginBottom: theme.typography.pxToRem(40),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  title: {
    marginBottom: theme.typography.pxToRem(16),
    maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
      lineHeight: theme.typography.pxToRem(26),
    },
  },
  legalText: {
    margin: '2rem 0 0',
  },
}))

export default SportsFanFavorites
