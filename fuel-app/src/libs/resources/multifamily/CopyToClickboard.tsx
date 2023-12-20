import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Copy, CheckMarkBlackCell } from '@/shared-ui/react-icons'
import colors from 'src/styles/theme/colors'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { SITE_INTERACTION, MULTIFAMILY_PAGE } from 'src/constants'

type dataTypes = {
  copy?: string
}

const CopyToClickboard = ({ copy }: dataTypes) => {
  const success = 'Link copied!'
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
        pageName: MULTIFAMILY_PAGE,
        events: 'event14',
        eVar14: 'MDU:Copy Docusign Link to Clipboard',
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
        <Copy />
        <div
          className={`${classes.showCopied} ${isActive ? classes.show : ''}`}
        >
          <CheckMarkBlackCell width={16} height={16} />
          {success}
        </div>
      </button>
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
    display: 'flex',
    justifyContent: 'center',

    '& svg:hover path': {
      fill: colors.main.brightRed,
    },
  },
  showCopied: {
    position: 'absolute',
    opacity: 0,
    transform: 'translateY(-50%)',
    transition: '0.3s all',
    zIndex: -1,
    fontFamily: 'PP Object Sans',
    backgroundColor: colors.main.dark,
    borderRadius: '8px',
    color: colors.main.white,
    textAlign: 'center',
    padding: '4px 8px',
    bottom: '-80px',
    left: '-50px',
    fontSize: '14px',
    lineHeight: '18px',
    top: 'auto',
    width: '130px',
    display: 'flex',
    justifyContent: 'center',
    '& svg': {
      marginRight: '8px',
      '& path': {
        fill: colors.main.white,
        marginRight: '8px',
      },
    },
  },
  show: {
    opacity: 1,
    zIndex: 4,
    bottom: '-50px',
  },
}))
