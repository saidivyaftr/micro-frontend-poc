import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ModalCloseIcon } from '@/shared-ui/react-icons'
import FocusLock from 'react-focus-lock'
import { IModalProps } from './index'
import css from './Modal.module.scss'
import { InjectHTML, Typography } from '@/shared-ui/components'
import { Grid } from '@material-ui/core'
import clx from 'classnames'

const Modal: React.FunctionComponent<IModalProps> = ({
  modalContent,
  modalOpen,
  setModalOpen,
  height = '50%',
  width = '80%',
  maxHeight = '50%',
  padding = '1rem',
  margin = 'auto',
  background = 'white',
  borderRadius = '0px',
  onCloseFocusElementID = '',
  videoModal = false,
  stopDefaultExit = false,
  hasArticle = false,
  videoTitle,
  videoDesc,
  modalContainerClassName = '',
  modalCloseIconClassName = '',
  iconColor,
  strokeWidth,
  showCloseButton = true,
}) => {
  if (typeof window !== 'undefined') {
    console.warn('Windows is not defined')
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && modalOpen) {
      setModalOpen(false)
    }
  }

  const onDialogClick = (e: React.MouseEvent<HTMLElement>) => {
    if (videoModal || stopDefaultExit) {
      return
    }
    if (e.currentTarget === e.target) {
      setModalOpen(false)
    }
  }

  useEffect(() => {
    modalOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset')
    document.addEventListener('keydown', onKeyDown, false)
    return () => {
      if (document.body.style.overflow === 'hidden') {
        document.body.style.overflow = 'unset'
      }
      document.removeEventListener('keydown', onKeyDown, false)
      document.getElementById(`${onCloseFocusElementID}`)?.focus()
    }
  }, [modalOpen])

  if (!modalOpen) return null

  return createPortal(
    <FocusLock>
      <div
        role="dialog"
        aria-modal
        aria-label="Video Modal"
        tabIndex={-1}
        className={css.modal}
        onClick={onDialogClick}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          className={clx(css.videoArticleContainer, modalContainerClassName)}
        >
          {showCloseButton && (
            <button
              className={clx(modalCloseIconClassName, css.modalCloseButton)}
              onClick={() => setModalOpen(false)}
            >
              <ModalCloseIcon color={iconColor} strokeWidth={strokeWidth} />
            </button>
          )}
          <Grid
            item
            style={{
              height: height,
              width: width,
              padding: padding,
              background: background,
              margin: margin,
              borderRadius: borderRadius,
              maxHeight: maxHeight,
            }}
            className={css.modalContentContainer}
          >
            {modalContent}
          </Grid>
          {hasArticle && (
            <Grid item className={css.article}>
              <Typography tagType="h3" color="secondary" styleType="h6">
                {videoTitle || ''}
              </Typography>
              {videoDesc && (
                <InjectHTML
                  tagType="p"
                  color="tertiary"
                  styleType="p2"
                  value={videoDesc}
                />
              )}
            </Grid>
          )}
        </Grid>
      </div>
    </FocusLock>,
    document.body,
  )
}

export default Modal
