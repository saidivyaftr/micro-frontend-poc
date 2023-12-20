import { makeStyles } from '@material-ui/core'
import { useAppData } from 'src/hooks'
import ImageWithTextPanel from './ImageWithTextPanel'
import InfoModal from './InfoModal'
import { useState } from 'react'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const ImageWithTextPanelWrapper = () => {
  const classes = useStyles()
  const [openDialog, setModalOpen] = useState(false)
  const [modalData, setmodalData] = useState({})

  const audibleNavigation = useAppData('audibleNavigation', true)
  const descriptiveVideoService = useAppData('descriptiveVideoService', true)
  const closedCaption = useAppData('closedCaption', true)
  const audibleNavigationFrontierDvr = useAppData(
    'audibleNavigationFrontierDvr',
    true,
  )
  const audibleNavigationFrontierTv = useAppData(
    'audibleNavigationFrontierTv',
    true,
  )
  const descriptiveVideoServiceFiberTv = useAppData(
    'descriptiveVideoServiceFiberTv',
    true,
  )
  const descriptiveVideoServiceFrontierTv = useAppData(
    'descriptiveVideoServiceFrontierTv',
    true,
  )
  const closedCaptionFiberTv = useAppData('closedCaptionFiberTv', true)
  const closedCaptionFrontierTv = useAppData('closedCaptionFrontierTv', true)

  const setmodalInfo = (modalInfo: string) => {
    let modalEventDesc = ''
    switch (modalInfo) {
      case 'audibleNavigationNav1':
        modalEventDesc = '/audible navigation/frontier dvr'
        setmodalData(audibleNavigationFrontierDvr)
        break
      case 'audibleNavigationNav2':
        modalEventDesc = '/audible navigation/frontier tv'
        setmodalData(audibleNavigationFrontierTv)
        break
      case 'descriptiveVideoServiceNav1':
        modalEventDesc = '/descriptive video service/frontier dvr'
        setmodalData(descriptiveVideoServiceFiberTv)
        break
      case 'descriptiveVideoServiceNav2':
        modalEventDesc = '/descriptive video service/frontier tv'
        setmodalData(descriptiveVideoServiceFrontierTv)
        break
      case 'closedCaptionNav1':
        modalEventDesc = '/closed caption/frontier dvr'
        setmodalData(closedCaptionFiberTv)
        break
      case 'closedCaptionNav2':
        modalEventDesc = '/closed caption/frontier tv'
        setmodalData(closedCaptionFrontierTv)
        break
      default:
        setmodalData('')
        break
    }

    DTMClient.triggerEvent({
      pageName: `ftr:/resources/accessibility${modalEventDesc}`,
      eVar22: 'visitor',
      eVar49: 'unverified service area',
    })
    setModalOpen(true)
  }

  return (
    <>
      <div className={classes.ImageWithTextPanelWrapper}>
        <ImageWithTextPanel
          data={audibleNavigation}
          reverse={true}
          compnentName="audibleNavigation"
          setmodalData={setmodalInfo}
          setModalOpen={setModalOpen}
        />
        <ImageWithTextPanel
          data={descriptiveVideoService}
          reverse={false}
          compnentName="descriptiveVideoService"
          setmodalData={setmodalInfo}
          setModalOpen={setModalOpen}
        />
        <ImageWithTextPanel
          data={closedCaption}
          reverse={true}
          compnentName="closedCaption"
          setmodalData={setmodalInfo}
          setModalOpen={setModalOpen}
        />
      </div>

      {openDialog && (
        <InfoModal
          openDialog={openDialog}
          setModalOpen={setModalOpen}
          modalData={modalData}
        />
      )}
    </>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  ImageWithTextPanelWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5rem',
    paddingTop: '5rem',
    [breakpoints.down('xs')]: {
      gap: '2.5rem',
      paddingTop: '2.5rem',
    },
  },
}))
export default ImageWithTextPanelWrapper
