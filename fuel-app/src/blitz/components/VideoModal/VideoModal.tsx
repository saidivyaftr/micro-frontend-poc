import clx from 'classnames'
import React, { useState } from 'react'
import {
  Typography,
  InjectHTML,
  Modal,
  Video,
  Picture,
} from '@/shared-ui/components'
import { VideoPlayIcon } from '@/shared-ui/react-icons'
import { IVideoModal } from './types'
import css from './VideoModal.module.scss'

const BRIGHTCOVE_ACCOUNT_ID = process.env.BRIGHTCOVE_ACCOUNT_ID
const BRIGHTCOVE_PLAYER_ID = process.env.BRIGHTCOVE_PLAYER_ID

const VideoModal: React.FC<IVideoModal> = ({
  imageSrc,
  videoId,
  title,
  desc,
  videoTitle,
  videoDesc,
  mobileSrc,
  modelArticleFlag = true,
  videoCardClassName = '',
  videoTitleClassName = '',
  videoDescClassName = '',
  imageContainerClassName = '',
  videoName,
  imageAltText = 'video',
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  return (
    <React.Fragment>
      <div className={clx(css.videoTextCard, videoCardClassName)}>
        <div className={clx(css.imageContainer, imageContainerClassName)}>
          <Picture
            desktop={{ image: imageSrc }}
            mobile={{ image: mobileSrc }}
            tablet={{ image: imageSrc }}
            className={css.image}
            altText={imageAltText}
          />
          <div className={css.playBtn} onClick={() => setModalOpen(true)}>
            <VideoPlayIcon />
          </div>
        </div>
        {title && (
          <div className={css.text}>
            <Typography
              tagType="h3"
              color={'secondary'}
              styleType="h6"
              className={videoTitleClassName}
            >
              {title}
            </Typography>
            <InjectHTML
              tagType="p"
              color="tertiary"
              styleType="p2"
              className={clx(css.videoDescription, videoDescClassName)}
              value={desc!}
            />
          </div>
        )}
      </div>

      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        padding="0"
        height="410px"
        width="85%"
        background="transparent"
        videoModal={true}
        hasArticle={modelArticleFlag}
        videoTitle={videoTitle}
        videoDesc={videoDesc}
        modalContent={
          <div className={css.modalContainer}>
            <Video
              accountId={`${BRIGHTCOVE_ACCOUNT_ID}`}
              playerId={`${BRIGHTCOVE_PLAYER_ID}`}
              className={css.video}
              hideAfterStop={true}
              autoPlay={false}
              hideControls={false}
              videoId={videoId}
              allowPauseVideo={true}
              videoName={videoName}
            />
          </div>
        }
      />
    </React.Fragment>
  )
}
export default VideoModal
