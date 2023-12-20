import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography, InjectHTML } from '@/shared-ui/components'
import clx from 'classnames'
import colors from '@/shared-ui/colors'
import { useAppData, useWindowDimensions } from 'src/hooks'
import { findAndReplaceDate } from 'src/utils/replaceString'

const VasServices = (props: any) => {
  const classes = useStyles()
  const { data, shouldDisableTile, onClickCTA, tabTitle } = props
  const { width } = useWindowDimensions()
  const isMobile = width <= 768

  //For adjust sitecore data I created this temporarily. After get scanner images I have to remove it
  // const imagestringreplacetemporary = (str: string) => {
  //   return str.replace('%27', '')
  // }
  const addonServices = useAppData('addonServices', true) || {}
  //this will be a temp fix untill API sends new attribute to categorize the codes
  const addOnsCodeMapping: any = {
    RNFIP: [
      'APOME',
      'APOMD',
      'RNFIP',
      'POMID',
      'POMI1',
      'FSIDP',
      'FSIDT',
      'FSPID',
      'MPF12',
      'MPPID',
      'FTRID',
    ],
    RNPTP: [
      'SCMR4',
      'FSTSP',
      'FSPTU',
      'MPFS9',
      'BNPTP',
      'RNPTP',
      'RNFTP',
      'RVS4P',
      'FSPTP',
      'FSSTP',
      'FSTAO',
      'PRTSP',
      'PTSSP',
      'PTSUP',
      'MPSTP',
      'POMP1',
      'POMP2',
      'FSPSP',
      'MPATO',
      'MPM2',
      'POMP3',
    ],
    RNHSD: ['RNFBN', 'RNHSD', 'FSWHP', 'MPFS0'],
    FSWFI: ['FSWFI'],
    WWIFI: ['WWIFI'],
    FTRTS: ['FTRTS'],
  }
  return (
    <>
      {addonServices.tileList.targetItems &&
        addonServices.tileList.targetItems.map((res: any) => {
          if (addOnsCodeMapping[res.ID.value]?.indexOf(data.itemCode) > -1) {
            return (
              <>
                {isMobile && res?.titleIcon?.value && (
                  <div className={classes.iconClassName}>
                    <InjectHTML value={res?.titleIcon?.value} />
                  </div>
                )}

                <Typography
                  tagType="h4"
                  styleType="h4"
                  className={clx(classes.title, {
                    [classes.disableTile]: shouldDisableTile,
                  })}
                >
                  {data.productName}
                </Typography>
                <ul
                  className={clx(classes.listContainer, {
                    [classes.disableTile]: shouldDisableTile,
                  })}
                >
                  {res?.description?.targetItems &&
                    res?.description?.targetItems.map(
                      (desctiptionresponse: any, descriptionindex: any) => {
                        return (
                          <li key={`list_${descriptionindex}`}>
                            <InjectHTML
                              styleType="p1"
                              className={clx(classes.textStyle, classes.title, {
                                [classes.disableTile]: shouldDisableTile,
                              })}
                              value={findAndReplaceDate(
                                desctiptionresponse?.title?.value,
                                '$SIGNEDUP_DATE$',
                                data?.signedUpDate,
                              )}
                            />
                          </li>
                        )
                      },
                    )}
                </ul>
                {/* commenting out for 10/3 release
                {res?.scanner?.value && (
                  <img
                    src={imagestringreplacetemporary(res?.scanner?.value)}
                    alt={data.productName}
                    className={classes.image}
                  />
                )}
                {res?.openAppCta?.value && (
                  <Button
                    type="button"
                    variant="tertiary"
                    text={res?.openAppCta?.value}
                    className={classes.button}
                    href={formatUrl(res?.openAppCtaurl?.value)}
                  />
                )} */}
                {res?.serviceCall?.value && (
                  <Button
                    type="link"
                    variant="tertiary"
                    text={res?.serviceCall?.value}
                    className={classes.button}
                    href={`tel:${res?.serviceCallNumber?.value}`}
                    onClick={() =>
                      onClickCTA(
                        `${tabTitle}:${data.productName}:${res?.serviceCall?.value}`,
                      )
                    }
                  />
                )}
              </>
            )
          }
        })}
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  title: {
    marginTop: 16,
    width: '100%',
    '& a': { fontWeight: 500, textDecoration: 'underline' },
    [breakpoints.up('sm')]: { width: 432 },
  },
  listContainer: {
    marginLeft: -20,
  },
  image: {
    width: 276,
    display: 'none',
    [breakpoints.up('sm')]: { display: 'block' },
  },
  button: {
    display: 'block',
    [breakpoints.up('sm')]: { display: 'none' },
  },
  disableTile: {
    color: `${colors.main.gray} !important`,
  },
  textStyle: {
    lineHeight: '1.5rem',
    [breakpoints.up('sm')]: {
      lineHeight: '1.625rem',
    },
  },
  iconClassName: {
    paddingBottom: 16,
    '& svg': {
      height: 'auto',
      width: 26,
      display: 'block',
      [breakpoints.up('xs')]: {
        width: 40,
      },
    },
  },
}))

export default VasServices
