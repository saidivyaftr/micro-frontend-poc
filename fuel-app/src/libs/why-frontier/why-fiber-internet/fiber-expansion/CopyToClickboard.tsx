import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@/shared-ui/components'
import colors from 'src/styles/theme/colors'
import { useAppData } from 'src/hooks'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { SITE_INTERACTION } from 'src/constants'

type dataTypes = {
  copy?: string
  value: string
}

const CopyToClickboard = ({ copy, value }: dataTypes) => {
  const { button, success } = useAppData('CopyToClickboard', true)
  const classes = useStyles()
  const [isActive, setIsActive] = useState(false)

  const copyContent = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleOnClick = () => {
    setIsActive(true)
    copyContent(copy as string)
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: '${copy}',
      },
      'tl_o',
      SITE_INTERACTION,
    )
  }

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setIsActive(false)
      }, 1000)
    }
  }, [isActive])
  return (
    <div className={classes.copyToClip}>
      <button className={classes.copyLink} onClick={handleOnClick}>
        <Typography styleType="p1" tagType="span" className={classes.copyLink}>
          {button?.value}
        </Typography>

        <div
          className={`${classes.showCopied} ${isActive ? classes.show : ''}`}
        >
          {success?.value}
        </div>
      </button>
      <Typography styleType="p1" tagType="span">
        {value}
      </Typography>
    </div>
  )
}

export default CopyToClickboard

const useStyles = makeStyles(({ breakpoints }) => ({
  copyToClip: {
    margin: '0 0 8px 0',
    height: '130px',
    marginBottom: '16px',
    [breakpoints.down('sm')]: {
      height: '160px',
    },
    [breakpoints.down('xs')]: {
      height: 'auto',
    },
  },
  copyLink: {
    textDecoration: 'underline',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    textTransform: 'none',
    position: 'relative',
    marginRight: '3px',
    '&:hover': {
      color: colors.main.brightRed,
    },
  },
  showCopied: {
    position: 'absolute',
    opacity: 0,
    transform: 'translateY(-50%)',
    transition: '0.3s all',
    zIndex: -1,

    backgroundColor: colors.main.dark,
    borderRadius: '8px',
    color: colors.main.white,
    textAlign: 'center',
    padding: '4px 8px',
    bottom: '-80px',
    left: 0,
    fontSize: '16px',
    top: 'auto',
  },
  show: {
    opacity: 1,
    zIndex: 4,
    bottom: '-50px',
  },
}))
