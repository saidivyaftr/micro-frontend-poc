import { InfoModal, RichText } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { useAppData, useShowTerms } from '../../hooks'

const TermsModal = () => {
  const { terms } = useAppData('TermsModal', true)

  const { showTerms, setShowTerms } = useShowTerms()

  const styles = useStyles()

  return (
    <InfoModal
      isOpen={showTerms}
      isLoading={false}
      onClose={() => setShowTerms(false)}
      modalContentClassName={styles.modalContent}
    >
      <RichText
        wrapperClassName={styles.richTextWrapper}
        data={{
          content: {
            value: terms?.value,
          },
        }}
      />
    </InfoModal>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  modalContent: {
    marginTop: '100px',
    [breakpoints.down('xs')]: {
      paddingTop: '2rem',
    },
  },
  richTextWrapper: { padding: '0' },
}))

export default TermsModal
