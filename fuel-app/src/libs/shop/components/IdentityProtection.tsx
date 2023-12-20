import { makeStyles } from '@material-ui/core'
import {
  Button,
  InfoModal,
  InjectHTML,
  TwoColumnLayout,
} from '@/shared-ui/components'
import {
  COMPONENT_WRAPPER,
  FRONTIER_SECURE_IDENTITY_PROTECTION,
  MAX_WIDTH,
} from 'src/constants'
import { useAppData } from 'src/hooks'
import { useState } from 'react'
import FrontierSecureModal, {
  FrontierSecureModalProps,
} from '../components/FrontierSecureModal'
import { IShopComponents } from './types'

const IDProtection = ({ styles }: IShopComponents) => {
  const {
    image,
    mobileImage,
    buttonText,
    description,
    title,
    modalContent,
    modalChatBtnText,
    modalCallBtnText,
    modalCallBtnUrl,
  } = useAppData('identityProtection', true)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContentData, setModalContentData] = useState<any>(null)

  const classes = useStyles()

  const ImageContent = () => (
    <>
      {title?.value && (
        <div id="id-protection" className={classes.ImageContent}>
          <InjectHTML
            tagType="h2"
            styleType="h3"
            value={title?.value}
            className={classes.titleStyles}
          />
          <div>
            {description?.value && (
              <InjectHTML
                tagType="span"
                styleType="p1"
                className={classes.description}
                value={description?.value}
              />
            )}
            {buttonText?.value && (
              <div className={classes.buttonContainer}>
                <Button
                  type="button"
                  variant="secondary"
                  text={buttonText?.value}
                  onClick={() => {
                    setModalContentData({
                      content: modalContent?.value,
                      modalChatBtnText: modalChatBtnText?.value,
                      modalCallBtnText: modalCallBtnText?.value,
                      modalCallBtnUrl: modalCallBtnUrl?.value,
                      ObjectId: FRONTIER_SECURE_IDENTITY_PROTECTION,
                    } as FrontierSecureModalProps)
                    setIsModalOpen(true)
                  }}
                  triggerEvent={true}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )

  if (!title || !description) {
    return null
  }
  return (
    <div className={classes.wrapper} style={styles}>
      <TwoColumnLayout
        gridClassName={classes.gridBlockStyle}
        imageWrapperClassName={classes.imageWrapper}
        image={image?.src}
        mobileImage={mobileImage?.src}
        title={title?.value}
        content={<ImageContent />}
        testId="id-protection-image"
        mobileReverse={true}
        imageClassName={classes.gridImage}
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
            {...modalContentData}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </InfoModal>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    paddingTop: 60,
    margin: '0 auto',
    [breakpoints.down('sm')]: {
      paddingBottom: '2rem',
    },
  },
  gridBlockStyle: {
    flexWrap: 'initial',
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
  ImageContent: {
    borderRadius: 32,
    padding: '4rem',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [breakpoints.down('sm')]: {
      padding: 0,
      marginTop: 32,
      borderRadius: 32,
    },
  },
  imageWrapper: {
    marginRight: -2,
    [breakpoints.up('md')]: {
      height: '100%',
    },
    [breakpoints.down('sm')]: {
      marginRight: 0,
    },
    '& img': {
      display: 'flex',
      borderRadius: 32,
      [breakpoints.down('md')]: {
        height: 'auto',
      },
      [breakpoints.down('sm')]: {
        borderRadius: 32,
      },
    },
  },
  titleStyles: {
    marginBottom: 12,
    [breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
  description: {
    display: 'initial',
  },
  buttonContainer: {
    marginTop: '1rem',
  },
  gridImage: {
    objectFit: 'none',
    [breakpoints.down('sm')]: {
      objectFit: 'cover',
    },
  },
}))

export default IDProtection
