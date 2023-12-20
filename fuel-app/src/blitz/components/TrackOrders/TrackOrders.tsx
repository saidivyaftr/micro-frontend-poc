import { InjectHTML, Typography } from 'src/blitz'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import clsx from 'classnames'
import { ITrackOrders } from './types'
import css from './TrackOrders.module.scss'
import 'swiper/swiper.min.css'
import {
  AppStoreQRCodeWhite,
  PlaystoreDownload,
  PlaystoreQRCodeWhite,
  AppStoreDownload,
  CheckMarkBlackRound,
} from '@/shared-ui/react-icons/index'

SwiperCore.use([Autoplay, Navigation, Pagination])

const TrackOrders = ({
  title,
  subTitle,
  imgSrc,
  points,
  playStoreUrl,
  appStoreUrl,
  wrapperClassName = '',
  showMobileQRCode = true,
  titleTagType = 'h2',
}: ITrackOrders) => {
  return (
    <div className={clsx(css.wrapper, wrapperClassName)}>
      <div className={clsx(css.root)}>
        <div className={css.rightContainer}>
          <Typography
            tagType={titleTagType}
            styleType="h3"
            className={css.title}
          >
            {title}
          </Typography>
          <div>
            <InjectHTML className={clsx(css.message)} value={subTitle} />
          </div>
          <ul className={css.list}>
            {points?.map((point: string) => {
              return (
                <li key={point}>
                  <div className={css.listItem}>
                    <CheckMarkBlackRound className={css.checkIcon} />
                    <Typography className={css.listText} styleType="p1">
                      {point}
                    </Typography>
                  </div>
                </li>
              )
            })}
          </ul>
          <div
            className={clsx(css.appQRwrapper, {
              [css.appQRwrapperMobile]: !showMobileQRCode,
            })}
          >
            <div className={css.QRCode}>
              <AppStoreQRCodeWhite
                className={clsx({ [css.qrCodeMobile]: !showMobileQRCode })}
              />
              <a
                aria-label="App Store"
                className={css.storeBtn}
                href={appStoreUrl}
              >
                <AppStoreDownload
                  className={clsx(css.storeBtnContent, {
                    [css.mobileBtnContent]: !showMobileQRCode,
                  })}
                />
              </a>
            </div>
            <div className={css.QRCode}>
              <PlaystoreQRCodeWhite
                className={clsx({ [css.qrCodeMobile]: !showMobileQRCode })}
              />
              <a
                aria-label="Google Play Store"
                className={css.storeBtn}
                href={playStoreUrl}
              >
                <PlaystoreDownload
                  className={clsx(css.storeBtnContent, {
                    [css.mobileBtnContent]: !showMobileQRCode,
                  })}
                />
              </a>
            </div>
          </div>
        </div>
        <div className={css.imgContainer}>
          <img src={imgSrc?.value} alt={imgSrc?.alt} />
        </div>
      </div>
    </div>
  )
}

export default TrackOrders
