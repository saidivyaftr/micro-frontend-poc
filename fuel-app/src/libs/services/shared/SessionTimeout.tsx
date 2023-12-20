import { useIdleTimer } from 'react-idle-timer'
import { useState } from 'react'
import ModalWrapper from '../../register/components/ModalWrapper'
import SessionTimeoutModal from './SessionTimeoutModal'

const SESSION_TIMEOUT = 20 * 60 * 1000 // 20 mins

const SessionTimeout = ({ children }: { children: JSX.Element }) => {
  const [showSessionTimedOutMessage, setShowSessionTimedOutMessage] =
    useState(false)

  const onIdle = () => {
    if (!showSessionTimedOutMessage) {
      setShowSessionTimedOutMessage(true)
    }
  }

  const handleCloseModal = () => {
    sessionStorage.clear()
    localStorage.clear()
    setShowSessionTimedOutMessage(false)
    window.location.href = '/login'
  }

  useIdleTimer({
    timeout: SESSION_TIMEOUT,
    onIdle: onIdle,
  })

  return (
    <div data-tid="timeout-modal-wrapper">
      <>{children}</>
      <ModalWrapper
        isOpen={showSessionTimedOutMessage}
        handleClose={handleCloseModal}
        modalContent={<SessionTimeoutModal handleClose={handleCloseModal} />}
      />
    </div>
  )
}

export default SessionTimeout
