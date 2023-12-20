import { Button, InjectHTML } from '@/shared-ui/components'
import useWindowDimensions from '@/shared-ui/hooks/useWindowDimensions'
import { makeStyles } from '@material-ui/core/styles'
import clx from 'classnames'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'

interface ServiceTileProps {
  shouldDisableTile: boolean
  onClickCTA: (txt: string) => void
  tabTitle: string
  productName: string
}
const ServiceTile = (payload: ServiceTileProps) => {
  const { width } = useWindowDimensions()
  const isMobile = width <= 768
  const classes = useStyles()
  const { shouldDisableTile, onClickCTA, tabTitle, productName } = payload
  const tile = useAppData('digitalVoiceContent', true)
  return (
    <div className={classes.tileClass}>
      {tile.title && (
        <InjectHTML
          styleType={'h4'}
          tagType="h4"
          className={clx({
            [classes.disableTile]: shouldDisableTile,
          })}
          value={productName}
        />
      )}
      {tile.description && (
        <InjectHTML
          styleType={'p1'}
          color={'default'}
          className={clx(classes.descriptionClassName, {
            [classes.disableTile]: shouldDisableTile,
          })}
          value={tile?.description?.value}
        />
      )}

      <div className={classes.buttonDiv}>
        {tile?.button1?.text && (
          <Button
            type={shouldDisableTile ? 'button' : 'link'}
            variant={isMobile ? 'secondary' : 'primary'}
            text={tile?.button1?.text}
            href={tile?.button1?.href}
            className={classes.buttonClassName}
            hoverVariant="primary"
            disabled={shouldDisableTile}
            onClick={() =>
              onClickCTA(
                `${tabTitle}:${tile?.title?.value}:${tile?.button1?.text}`,
              )
            }
          />
        )}
      </div>
      <div className={classes.buttonEmptyDiv}></div>
      <div className={classes.buttonDiv}>
        {tile?.button2?.text && (
          <Button
            type={shouldDisableTile ? 'button' : 'link'}
            variant={isMobile ? 'secondary' : 'tertiary'}
            text={tile?.button2?.text}
            href={tile?.button2?.href}
            className={classes.buttonClassName}
            objectID={tile?.button2?.objectID}
            hoverVariant="primary"
            disabled={shouldDisableTile}
            onClick={() =>
              onClickCTA(
                `${tabTitle}:${tile?.title?.value}:${tile?.button2?.text}`,
              )
            }
          />
        )}
      </div>
    </div>
  )
}

export default ServiceTile

const useStyles = makeStyles(({ breakpoints }) => ({
  disableTile: {
    color: `${colors.main.gray} !important`,
  },
  container: {
    position: 'relative',
    padding: 0,
  },
  tileClass: {
    width: '100%',
  },
  descriptionClassName: {
    '& li': { padding: 8 },
  },

  buttonClassName: {
    marginTop: 16,
  },
  buttonDiv: {
    marginLeft: -14,
    display: 'inline-block',
    [breakpoints.up('lg')]: {
      display: 'inline-block',
    },
  },
  buttonEmptyDiv: {
    display: 'inline-block',
    padding: 16,
    [breakpoints.up('lg')]: {
      display: 'inline-block',
      padding: 16,
    },
  },
}))
