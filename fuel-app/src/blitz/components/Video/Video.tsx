import React, { useEffect } from 'react'
// @ts-ignore
import ReactPlayerLoader from '@brightcove/react-player-loader'
import clx from 'classnames'
import { IVideo } from './types'
import css from './Video.module.scss'

const Video: React.FC<IVideo> = ({
  className,
  hideAfterStop = false,
  autoPlay = false,
  width,
  height,
  playVideo,
  videoEnd,
  skipVideo,
  hideControls = false,
  videoId,
  videoName,
  remainingTime,
  accountId,
  playerId,
  allowPauseVideo,
}) => {
  let player: any

  const onSuccess = (success: any) => {
    player = success.ref
    player.width(width)
    player.height(height)
    if (videoName) {
      const video = document.querySelector(`video[data-video-id="${videoId}"]`)
      if (video) video?.setAttribute('data-video-name', videoName)
    }
    if (hideControls) {
      player.player().controlBar.hide()
    }

    if (!allowPauseVideo) {
      player.on('click', () => {
        player.play()
      })
    }

    if (remainingTime) {
      player.on('timeupdate', () => {
        remainingTime(player.remainingTime())
      })
    }
    player.on('ended', () => {
      if (hideAfterStop) {
        videoEnd()
      }
    })
    if (autoPlay) {
      player.on('loadedmetadata', () => {
        player.muted(true)
        player.play()
      })
    }
  }

  const onClickPlay = () => {
    player?.play()
    player?.show()
  }

  const onStopVideo = () => {
    player?.stop()
    player?.hide()
  }

  useEffect(() => {
    if (playVideo) {
      onClickPlay()
    }
    if (skipVideo) {
      onStopVideo()
    }
  }, [playVideo, skipVideo])

  return (
    <ReactPlayerLoader
      accountId={accountId}
      videoId={videoId}
      playerId={playerId}
      onSuccess={onSuccess}
      attrs={{
        autoPlay: true,
        className: clx(css.videoContainer, className),
      }}
    />
  )
}
export default Video

// codumentation and events: https://docs.brightcove.com/brightcove-player/1.x/Player.html
