import { Fade, Grid, makeStyles } from '@material-ui/core'
import { Typography, InjectHTML, TooltipPopover } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import React, { useRef } from 'react'
import useIntersection from 'src/hooks/useIntersection'
import { COMPONENT_WRAPPER } from 'src/constants'
import { InfoIconWhite } from '@/shared-ui/react-icons/index'
import { IShopComponents } from './types'

const WhyFiber2Gig = ({ styles }: IShopComponents) => {
  const classes = useStyles()
  const cardRef = useRef<HTMLDivElement>(null)
  const inViewPort = useIntersection(cardRef, '-250px')
  const {
    heading,
    subHeading,
    containerTitle,
    containerText,
    caption,
    cards,
    cardsTitle,
    toolTipText,
    legalText,
  } = useAppData('speedAdvantagesCards', true)
  return (
    <div className={classes.root} style={styles}>
      <div className={classes.container}>
        <InjectHTML
          className={classes.sectionheading}
          tagType="h2"
          data-testid="heading"
          styleType="h3"
          value={heading?.value}
        />
        <Typography
          className={classes.sectionSubheading}
          tagType="h3"
          data-testid="subheading"
          styleType="p1"
        >
          {subHeading?.value || ''}
        </Typography>
        <div className={classes.article}>
          <Grid
            spacing={2}
            container
            className={classes.articleContainer}
            justifyContent="space-between"
          >
            <Grid item lg={5} md={12} sm={12}>
              <div className={classes.leftContainer}>
                <Typography
                  className={classes.heading}
                  tagType="h2"
                  data-testid="containerTitle"
                  styleType="h4"
                >
                  {containerTitle?.value || ''}
                </Typography>
                <Typography
                  tagType="p"
                  className={classes.description}
                  data-testid="containerText"
                  styleType="p1"
                >
                  <>
                    {containerText?.value || ''}
                    {toolTipText?.value && (
                      <TooltipPopover
                        tooltipDirection="bottom"
                        tooltipContent={toolTipText?.value}
                        tooltipClassName={classes.tooltip}
                        tooltipIcon={<InfoIconWhite />}
                      />
                    )}
                    {legalText?.value && (
                      <InjectHTML
                        className={classes.legalText}
                        tagType="p"
                        data-testid="caption"
                        styleType="legal"
                        value={legalText?.value}
                      />
                    )}
                  </>
                </Typography>
              </div>
            </Grid>
            <Grid item lg={7} md={12} sm={12}>
              <Typography
                tagType="p"
                data-testid="goFiberText"
                styleType="p1"
                fontType="boldFont"
                className={classes.cardHeader}
              >
                {cardsTitle?.value || ''}
              </Typography>
              <Grid container spacing={1}>
                {(cards?.targetItems || []).map(
                  (cardData: any, index: number) => {
                    return (
                      <Grid
                        item
                        lg={4}
                        md={4}
                        sm={4}
                        xs={12}
                        ref={cardRef}
                        key={index}
                      >
                        <Fade in={inViewPort} timeout={{ enter: index * 500 }}>
                          <div className={classes.card} data-testid="card">
                            <Typography
                              className={classes.cardTitle}
                              tagType="p"
                              data-testid="cardTitle"
                              styleType="p1"
                              fontType="boldFont"
                              color="tertiary"
                            >
                              {cardData?.cardTitle?.value || ''}
                            </Typography>
                            <img
                              src={cardData?.cardImage?.src}
                              alt={cardData?.cardImage?.alt}
                              data-testid="cardImage"
                            ></img>
                            <Typography
                              className={classes.cardMiddleText}
                              tagType="p"
                              testId="cardSubTitle"
                              styleType="h3"
                              color="primary"
                            >
                              <React.Fragment>
                                {cardData?.cardSubTitle?.value || ''}
                                <InjectHTML
                                  pureInjection
                                  className={classes.inlineCardDesc}
                                  value={cardData?.cardDescription?.value}
                                />
                              </React.Fragment>
                            </Typography>
                            <InjectHTML
                              className={classes.cardBottomText}
                              tagType="p"
                              testId="cardDescription"
                              styleType="p1"
                              fontType="boldFont"
                              color="secondary"
                              value={cardData?.cardDescription?.value}
                            />
                          </div>
                        </Fade>
                      </Grid>
                    )
                  },
                )}
              </Grid>
              <InjectHTML
                className={classes.caption}
                tagType="span"
                data-testid="caption"
                styleType="legal"
                value={caption?.value || ''}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    overflow: 'hidden',
    paddingTop: '142px',
    [breakpoints.down('md')]: {
      paddingTop: '80px',
    },
  },
  container: {
    position: 'relative',
    ...COMPONENT_WRAPPER,
    padding: '0 1rem',
  },
  sectionheading: {
    textAlign: 'center',
    '& sup': {
      fontSize: '0.8rem',
      lineHeight: 0,
      position: 'relative',
      top: '-10px',
    },
    [breakpoints.down('sm')]: {
      fontSize: 24,
    },
  },
  sectionSubheading: {
    textAlign: 'center',
    marginTop: 18,
    fontWeight: 400,
  },
  heading: {
    textAlign: 'left',
    marginBottom: '16px',
    [breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
  tooltip: {
    display: 'inline',
    borderColor: colors.main.lightGray,
  },
  article: {
    padding: '0px 8px',
    marginTop: 82,
    marginBottom: 40,
    [breakpoints.down('sm')]: {
      marginTop: 40,
    },
  },
  articleContainer: {
    padding: '20px 20px 60px 10px',
    borderRadius: '32px',
    backgroundColor: colors.main.grey,
    [breakpoints.down('xs')]: {
      padding: '24px 24px 32px 24px',
    },
  },
  card: {
    visibility: 'visible',
    padding: '14px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 336,
    alignSelf: 'stretch',
    backgroundColor: colors.main.midnightExpress,
    margin: '0px 0px 8px 0px',
    height: '100%',
    justifyContent: 'space-between',
    '& img': {
      margin: '0 auto',
      [breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    [breakpoints.down('sm')]: {
      visibility: 'visible !important',
      transform: 'none',
      opacity: '1 !important',
    },
    [breakpoints.down('xs')]: {
      padding: '32px',
      minHeight: 'auto',
    },
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(-200%)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  cardHeader: {
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  cardTitle: {
    marginBottom: 'auto',
    marginTop: 0,
    [breakpoints.down('xs')]: {
      margin: '0px',
      fontSize: '18px',
      lineHeight: '26px',
    },
  },
  cardMiddleText: {
    padding: 0,
    margin: 0,
    marginBottom: '10px',
    [breakpoints.down('xs')]: {
      display: 'flex',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      marginBottom: '0px',
    },
  },
  cardBottomText: {
    marginBottom: 0,
    '& sup': {
      fontSize: '10px',
      lineHeight: 0,
      verticalAlign: 'super',
    },
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  inlineCardDesc: {
    color: colors.main.greenishBlue,
    display: 'none',
    marginLeft: 12,
    '& sup': {
      fontSize: '10px',
    },
    [breakpoints.down('md')]: {
      marginBottom: 0,
    },
    [breakpoints.down('xs')]: {
      display: 'inline-block',
      lineHeight: '26px',
      marginLeft: '0px',
      marginBottom: 0,
      fontSize: '1.125rem',
      paddingTop: '4px',
    },
    '& br': {
      display: 'none',
    },
  },
  caption: {
    display: 'block',
    margin: '24px 0px',
  },
  description: {
    lineHeight: '24px',
    maxWidth: '85%',
    color: colors.main.midnightExpress,
    [breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
    [breakpoints.down('xs')]: {
      marginBottom: 0,
    },
  },
  leftContainer: {
    maxWidth: '400px',
    padding: '28px 0px 30px 14px',
    [breakpoints.down('md')]: {
      maxWidth: '100%',
      padding: '28px 0 0',
    },
    [breakpoints.down('sm')]: {
      padding: '0px',
    },
  },
  legalText: {
    color: colors.main.midnightExpress,
    margin: '1rem 0 0',
  },
}))

export default WhyFiber2Gig
