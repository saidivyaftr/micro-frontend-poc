import { makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react'
import APIClient from 'src/api-client'
import { Loading, Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'
import { Select } from 'src/ui-kit'

export type Voicemail = {
  AccessNumber: string
  npa: string
  nxx: string
}

export function VoicemailAccess() {
  const voicemailData = useAppData('voicemailAccess', true)

  const styles = useStyles()
  const [npas, setNpas] = useState<string[]>([])
  const [nxxs, setNxxs] = useState<string[]>([])
  const [npaValue, setNpaValue] = useState<string>('')
  const [nxxValue, setNxxValue] = useState<string>('')
  const [accessNumberSelected, setAccessNumberSelected] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [voiceMails, setVoiceMails] = useState<Voicemail[]>([])

  const fetchVoiceMail = async () => {
    const { data } = await APIClient.getVoicemail()
    const npasReceived = data?.map((item: Voicemail) => item.npa)
    const npaUnique = new Set<string>(npasReceived)
    setNpas(Array.from(npaUnique))
    setVoiceMails(data)
    setIsLoading(false)
  }

  const handleNpa = (value: string) => {
    setNpaValue(value)
    setNxxValue('')
    setAccessNumberSelected('')
  }

  const handleNxx = () => {
    setAccessNumberSelected('')
    if (!npaValue) {
      return
    }
    const voiceMailsFiltered = voiceMails.filter(
      (item) => npaValue === item.npa,
    )
    const nxxsFiltered = voiceMailsFiltered.map((item) => item.nxx)
    const nxxUnique = new Set<string>(nxxsFiltered)
    setNxxs(Array.from(nxxUnique))
  }

  const handleVoicemail = () => {
    if (!npaValue || !nxxValue) return

    const voiceSelected = voiceMails.find((voicemail) => {
      if (voicemail.npa === npaValue && voicemail.nxx === nxxValue) {
        return voicemail
      }
    })
    setAccessNumberSelected(voiceSelected?.AccessNumber || '')
  }

  useEffect(() => {
    fetchVoiceMail()
  }, [])

  useEffect(() => {
    handleNxx()
  }, [npaValue])

  useEffect(() => {
    handleVoicemail()
  }, [npaValue, nxxValue])

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Typography
            tagType="h1"
            styleType="h3"
            fontType="regularFont"
            dangerouslySetInnerHTML={{
              __html: voicemailData?.title?.value,
            }}
          />
          <Typography
            fontType="regularFont"
            styleType="p2"
            dangerouslySetInnerHTML={{
              __html: voicemailData?.description?.value,
            }}
            className={styles.description}
          />
          <div className={styles.content}>
            <div className={styles.choose}>
              <Typography>
                {voicemailData?.areaCodeSelectLabel?.value}
              </Typography>
              <Select
                label={
                  !!npaValue
                    ? voicemailData?.areaCodeSelectInnerText?.value
                    : voicemailData?.areaCodeSelectLabelOptionDefault?.value
                }
                value={npaValue}
                name="npa"
                setValue={handleNpa}
                options={npas?.map((npa) => ({
                  label: npa,
                  value: npa,
                }))}
                className={styles.select}
              />
            </div>
            <div className={styles.choose}>
              <Typography>
                {voicemailData?.exchangeSelectLabel?.value}
              </Typography>
              <Select
                label={
                  !!nxxValue
                    ? voicemailData?.exchangeSelectInnerText?.value
                    : voicemailData?.exchangeSelectLabelOptionDefault?.value
                }
                name="nxx"
                value={nxxValue}
                setValue={setNxxValue}
                options={nxxs?.map((nxx) => ({ label: nxx, value: nxx }))}
                className={styles.select}
              />
            </div>
          </div>
          {npaValue && nxxValue && (
            <h4>
              {!!accessNumberSelected ? (
                <>
                  <Typography tagType="div" styleType="p1">
                    {voicemailData?.accessNumberLabel?.value}
                  </Typography>
                  <Typography fontType="boldFont" tagType="span" styleType="p1">
                    {accessNumberSelected}
                  </Typography>
                </>
              ) : (
                <Typography
                  fontType="boldFont"
                  tagType="span"
                  styleType="p1"
                  color="primary"
                >
                  {voicemailData?.notOfferVoicemailLabel?.value}
                </Typography>
              )}
            </h4>
          )}
        </>
      )}
    </div>
  )
}

const useStyles = makeStyles(() => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    textAlign: 'left',
    paddingTop: 40,
  },
  choose: {
    display: 'grid',
    gridTemplateColumns: '16rem 7rem',
    columnGap: '1rem',
    rowGap: '1rem',
    alignItems: 'center',
    marginBottom: '.5rem',
  },
  label: {
    width: '14.75rem',
  },
  description: {
    lineHeight: '2rem',
    '& ul>ul': {
      listStyleType: 'inherit',
    },
    '& li>span': {
      color: colors.main.brightRed,
      fontWeight: 900,
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  select: {
    alignItems: 'right',
    width: '7rem',
    fontStyle: 'normal',
    alignContent: 'flex-end',
    maxWidth: '7.5rem',
  },
}))
