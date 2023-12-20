import { makeStyles } from '@material-ui/core'
import { parseCookies } from 'nookies'
import colors from '@/shared-ui/colors'
import { CheckMarkThin, InfoIconWhite } from '@/shared-ui/react-icons'
import {
  Typography,
  TwoColumnLayout,
  InjectHTML,
  InfoModal,
  TooltipPopover,
} from '@/shared-ui/components'
import useAppData from '@/shared-ui/hooks/useAppData'
import { useEffect, useState } from 'react'
import {
  PP_OBJECT_SANS_BOLD,
  PP_OBJECT_SANS_MEDIUM,
} from 'src/constants/fontFamilyNames'
import { SITE_INTERACTION, TV_PAGE } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { IShopComponents } from './types'
const YTVSundayTicket = ({ styles }: IShopComponents) => {
  const classes = useStyles()
  const [isModalOpen, setIsModalOpen] = useState(false)
  let counter = 0
  const { frontieramp = false } = parseCookies()
  const [isCustomer, setCustomer] = useState(false)
  useEffect(() => {
    setCustomer(!(!frontieramp || frontieramp != 'true'))
  }, [frontieramp])

  const { title, description, image, mobileImage, listData, instruction } =
    useAppData('YTVSundayTicket', true)

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto'
  }, [isModalOpen])

  if (!title?.value || !description?.value) {
    return null
  }

  return (
    <div id="ytv-sunday-ticket" className={classes.root} style={styles}>
      <TwoColumnLayout
        image={image?.src}
        mobileImage={mobileImage?.src}
        gridItemClassName={classes.gridItemClassName}
        title={title?.value}
        className={classes.gridWrapper}
        innerWrapperClassName={classes.innerWrapper}
        imageWrapperClassName={classes.imageWrapperClassName}
        content={
          <div className={classes.nonImageContainer}>
            <InjectHTML
              tagType="h2"
              styleType="h3"
              color="default"
              fontType="regularFont"
              value={title?.value}
              className={classes.title}
            />
            <InjectHTML
              tagType="p"
              styleType="p1"
              color="default"
              fontType="regularFont"
              value={description?.value}
              data-testid="description-value"
              className={classes.descSpan}
            />
            <Typography
              tagType="p"
              styleType="p1"
              color="default"
              className={classes.listWrapper}
            >
              <ul className={classes.list}>
                {listData?.targetItems?.map((item: any) => (
                  <li
                    className={classes.listItem}
                    key={`${item?.value?.value}_key`}
                  >
                    <span className={classes.icon}>
                      <CheckMarkThin />
                    </span>
                    <span>
                      {item?.value?.value}
                      {item?.tooltipText?.value ? (
                        <sup>
                          <TooltipPopover
                            tooltipClassName={classes.toolTip}
                            tooltipContent={item?.tooltipText?.value}
                            tooltipDirection="bottom"
                            tooltipIcon={<InfoIconWhite />}
                          />
                        </sup>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            </Typography>
            <div
              className={classes.instructionLink}
              onClick={() => {
                setIsModalOpen(true)
                const description = `${TV_PAGE}:yytv:${instruction?.targetItem?.title?.value}`
                DTMClient.triggerEvent(
                  { events: 'event14', eVar14: description },
                  'tl_o',
                  SITE_INTERACTION,
                )
              }}
            >
              {instruction?.targetItem?.title?.value}
            </div>
            <InfoModal
              isOpen={isModalOpen}
              isLoading={false}
              className={classes.modalContentWrapper}
              onClose={() => {
                setIsModalOpen(false)
              }}
              modalContentClassName={classes.modalContent}
            >
              <Typography
                tagType="h3"
                styleType="h3"
                color="default"
                className={classes.modelTitle}
              >
                {instruction?.targetItem?.title?.value}
              </Typography>
              <Typography tagType="p" styleType="p1" color="default">
                <ul className={classes.numberedList}>
                  {instruction?.targetItem?.listData?.targetItems?.map(
                    (item: any, index: number) => {
                      if (isCustomer && index === 0) return null
                      counter++
                      return (
                        <li
                          className={classes.numberedListItem}
                          key={`${item?.value?.value}_key`}
                        >
                          <div className={classes.counter}>
                            <span>{counter}</span>
                          </div>
                          <InjectHTML
                            tagType="p"
                            styleType="p1"
                            color="default"
                            fontType="regularFont"
                            value={item?.value?.value}
                          />
                        </li>
                      )
                    },
                  )}
                </ul>
              </Typography>
            </InfoModal>
          </div>
        }
        mobileReverse
        reverse
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: colors.main.grey,
    [breakpoints.down('sm')]: {
      margin: '0 1rem',
    },
    '& img': {
      borderRadius: '2rem',
      border: '1px solid',
      borderColor: colors.main.grayBox,
    },
    [breakpoints.down('sm')]: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
  },
  gridWrapper: {
    background: colors.main.grey,
  },
  imageWrapperClassName: {
    background: colors.main.grey,
  },
  innerWrapper: {
    [breakpoints.down('sm')]: {
      paddingTop: 0,
      paddingBottom: '2rem',
    },
  },
  nonImageContainer: {
    padding: '0 2.5rem 0 5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    [breakpoints.down('sm')]: {
      padding: '2rem 1rem 0 1rem',
    },
    [breakpoints.between(900, 1023.95)]: {
      alignItems: 'center',
    },
  },
  descSpan: {
    '& span': {
      fontFamily: 'PP Object Sans Bold',
    },
    '& p': {
      margin: '1rem 0',
    },
    '& a': {
      display: 'inline',
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
  },
  gridItemClassName: {
    display: 'flex',
    flexWrap: 'nowrap',
  },
  listWrapper: {
    margin: 0,
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: 'flex',
    marginBottom: '1rem',
  },
  icon: {
    marginRight: '0.5rem',
    marginTop: '0.2rem',
  },
  modelTitle: {
    marginBottom: '2rem',
    textAlign: 'center',
    letterSpacing: '-0.84px',
    [breakpoints.down('sm')]: {
      textAlign: 'left',
      paddingLeft: '2.625rem',
    },
  },
  modalContentWrapper: { padding: '0 1rem' },
  modalContent: {
    maxWidth: '71rem',
    padding: '5rem 10rem',
    width: 'unset',
    [breakpoints.down('sm')]: {
      padding: '2rem',
    },
    margin: '8vh auto',
  },
  instructionLink: {
    textDecoration: 'underline',
    fontSize: '1.125rem',
    fontFamily: PP_OBJECT_SANS_MEDIUM,
    cursor: 'pointer',
    '&:hover': {
      color: colors.main.brightRed,
    },
  },
  title: {
    fontFamily: PP_OBJECT_SANS_BOLD,
  },
  numberedList: {
    counterReset: 'li',
    listStyleType: 'none',
    fontSize: '1rem',
    lineHeight: '1.625rem',
    paddingLeft: 0,
  },
  numberedListItem: {
    display: 'flex',
    marginBottom: '1rem',
    '& a': {
      textDecoration: 'underline',
      fontWeight: 700,
      cursor: 'pointer',
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
  },
  counter: {
    display: 'flex',
    alignItems: 'start',
    paddingRight: '0.5rem',
    '& span': {
      background: colors.main.brightRed,
      borderRadius: '50%',
      color: colors.main.white,
      width: '1.5rem',
      height: '1.5rem',
      textAlign: 'center',
      fontSize: '0.875rem',
      fontWeight: 700,
    },
  },
  toolTip: {
    '& svg': {
      width: '0.5rem',
      height: '0.5rem',
    },
    '&:hover > svg path': {
      fill: colors.main.brightRed,
    },
  },
}))
export default YTVSundayTicket
