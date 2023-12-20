import { useEffect, useMemo, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import {
  Typography,
  FourTiles,
  InjectHTML,
  InfoModal,
  TooltipPopover,
} from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import {
  COMPONENT_WRAPPER,
  FRONTIER_SECURE_HOMESHIELD,
  MAX_WIDTH,
  SITE_INTERACTION,
} from 'src/constants'
import { InfoIconWhite, RightArrowIcon } from '@/shared-ui/react-icons'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import FrontierSecureModal, {
  FrontierSecureModalProps,
} from './FrontierSecureModal'
import { useAppData } from 'src/hooks'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { IShopComponents } from './types'

const HomeShieldElite = ({ styles }: IShopComponents) => {
  const classes = useStyles()
  const { title, subTitle, subTitle1, tiles, tooltipContent }: any =
    useAppData('homeShieldElite', true) || {}
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<any>(null)
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto'
  }, [isModalOpen])
  const list = useMemo(() => {
    if (!tiles?.list) {
      return []
    }
    const tilesList = tiles?.list.map((item: any, index: number) => {
      const button = {
        text:
          item?.buttonVariant?.value == 'lite' ? (
            <>
              {item?.buttonText?.value}
              <RightArrowIcon />
            </>
          ) : (
            item.buttonText?.value
          ),
        variant: item.buttonVariant?.value,
        buttonHoverVariant: item?.buttonHoverVariant?.value,
        objectID: item?.icon?.value === '3' ? 'homeShieldElite' : undefined,
        onClick: () => {
          DTMClient.triggerEvent(
            {
              events: 'event14',
              eVar14: `${FRONTIER_SECURE_HOMESHIELD[index]}:modal-opened`,
            },
            'tl_o',
            { SITE_INTERACTION },
          )
          setModalContent({
            content: item?.modalContent?.value,
            modalChatBtnText: item?.modalChatBtnText?.value,
            modalCallBtnText: item?.modalCallBtnText?.value,
            modalCallBtnUrl: item?.modalCallBtnUrl?.value,
            ObjectId: FRONTIER_SECURE_HOMESHIELD[index],
          } as FrontierSecureModalProps)
          setIsModalOpen(true)
        },
      }
      const payload: any = {
        title: item?.title?.value,
        description: item?.description?.value,
        button: button,
        icon: (
          <InjectHTML
            styleType="h1"
            value={item?.icon?.rendered}
            color="secondary"
          />
        ),
      }
      return payload
    })
    return tilesList
  }, [tiles])
  if (!tiles?.list) {
    return null
  }

  return (
    <div id="more" style={styles}>
      <div className={classes.wrapper}>
        <InjectHTML
          tagType="h2"
          styleType="h3"
          className={classes.title}
          value={title?.value}
        />
        <Typography className={classes.subTitle} styleType="h5">
          {subTitle?.value}
        </Typography>

        <div className={classes.toolTipStyles}>
          <div>
            <Typography
              className={classes.subTitle}
              styleType="h5"
              tagType="span"
            >
              {subTitle1?.value}
            </Typography>
            {tooltipContent?.value && (
              <TooltipPopover
                tooltipContent={tooltipContent?.value}
                tooltipIcon={<InfoIconWhite />}
                dropShadow={false}
              />
            )}
          </div>
        </div>

        <div className={classes.tilesWrapper}>
          <FourTiles
            type="light"
            textAlign="left"
            tiles={list}
            titleStyleType="h5"
            descriptionStyleType="p1"
            isClickable={false}
            iconClassName={classes.iconStyles}
            cardClassName={classes.cardStyles}
            buttonClassName={classes.buttonStyles}
            mobileOneCol={true}
            descriptionClassName={classes.descriptionStyles}
          />
          <InfoModal
            isOpen={isModalOpen}
            isLoading={false}
            className={classes.modalContentWrapper}
            onClose={() => {
              setIsModalOpen(false)
            }}
            modalContentClassName={classes.modalContent}
          >
            {modalContent && (
              <FrontierSecureModal
                {...modalContent}
                onClose={() => setIsModalOpen(false)}
              />
            )}
          </InfoModal>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
  },
  subTitle: {
    textAlign: 'center',
    margin: 0,
  },

  modalContentWrapper: { padding: '0 1rem' },
  modalContent: {
    maxWidth: MAX_WIDTH,
    padding: '5.5rem',
    width: 'unset',
    [breakpoints.down('sm')]: {
      padding: '2rem',
    },
    margin: '8vh auto',
  },
  toolTipStyles: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    '& span': {
      color: colors.main.brightRed,
    },
  },
  tileCard: {
    paddingBottom: 60,
  },
  tilesWrapper: {
    marginTop: 32,
  },
  iconStyles: {
    minHeight: 32,
  },
  cardStyles: {
    padding: '16px 32px 16px 16px',
    [breakpoints.down('sm')]: {
      padding: '16px 0px 25px 0px',
    },
  },
  buttonStyles: {
    display: 'inline !important',
    alignItems: 'center',
    fontFamily: PP_OBJECT_SANS,
    '& svg': {
      width: 16,
      height: 10,
    },
  },
  descriptionStyles: {
    minHeight: 126,
    marginBottom: 0,
    [breakpoints.down('sm')]: {
      minHeight: 190,
    },
    [breakpoints.down('xs')]: {
      minHeight: 'auto',
      marginBottom: 10,
    },
  },
}))

export default HomeShieldElite
