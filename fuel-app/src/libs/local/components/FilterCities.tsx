import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import colors from '@/shared-ui/colors'
import { Typography } from '@/shared-ui/components'

type CityLettersData = {
  isDataPresent: boolean
  char: string
}

type AllCitiesData = {
  char: string
  list: City[]
}

type StateData = {
  name: {
    value: string
  }
  code: {
    value: string
  }
  url: {
    value: string
  }
  cityList: AllCitiesData[]
}

type City = {
  name: {
    value: string
  }
  link?: {
    value: string
  }
  url?: {
    value: string
  }
}

const FilterCities = ({ data = {}, contextItem = {} }: any) => {
  const router = useRouter()
  const classes = useStyles()
  const { state, city } = router?.query || {}
  const { statesList } = data
  /* eslint-disable @typescript-eslint/indent */
  const [selectedFirstCityLetter, setSelectedFirstCityLetter] =
    useState<string>((city || state || 'A')[0].toUpperCase())
  const [currentStateData, setCurrentStateData] = useState<
    Array<CityLettersData>
  >([])

  const [selectedLetterCities, setSelectedLetterCities] = useState<Array<City>>(
    [],
  )
  const currenStateInURL = router?.query?.state || ''

  useEffect(() => {
    if (data && currenStateInURL?.length) {
      const stateData: StateData = statesList?.find(
        (data: StateData) =>
          data?.url?.value?.toLowerCase() ===
          `${currenStateInURL}`.toLowerCase(),
      )
      const char =
        stateData?.cityList?.find((item: AllCitiesData) => item?.list?.length)
          ?.char || ''
      onStateLetterClick(char)
    }
  }, [currenStateInURL])

  useEffect(() => {
    if (data && currenStateInURL?.length) {
      renderCities(`${currenStateInURL}`.toLowerCase())
    }
  }, [currenStateInURL, selectedFirstCityLetter])

  const renderCities = (state: string) => {
    const stateData: StateData = statesList?.find(
      (data: StateData) =>
        data?.url?.value?.toLowerCase() === state?.toLowerCase(),
    )
    if (stateData) {
      const existingCityData: CityLettersData[] = []
      const selectedCityList =
        stateData['cityList'].find(
          (city: AllCitiesData) =>
            city?.char?.toLowerCase() === selectedFirstCityLetter.toLowerCase(),
        )?.list || []
      stateData['cityList'].map((state: AllCitiesData) => {
        existingCityData.push({
          char: state?.char || '',
          isDataPresent: state?.list?.length > 0 || false,
        })
      })
      setCurrentStateData(existingCityData)
      if (selectedCityList.length) {
        setSelectedLetterCities(selectedCityList)
      }
    } else {
      router.push('/404')
    }
  }

  const onStateLetterClick = (letter: string) => {
    setSelectedFirstCityLetter(letter)
  }

  if (!data || Object.keys(data)?.length === 0) {
    return null
  }

  return (
    <div className={classes.root} data-testid="citiesContainer">
      <div className={classes.container}>
        <div className={classes.mainContainer}>
          <Typography tagType="h2" styleType="h3" className={classes.title}>
            {contextItem?.title?.value}
          </Typography>
          <Typography tagType="p" styleType="h5" className={classes.subtitle}>
            {data?.description?.value}
          </Typography>
          <div className={classes.citiesContainer}>
            <div className={classes.leftFilterSection}>
              <div>
                {
                  <ul
                    id="stateLettersUL"
                    className={classes.stateLettersSectionUL}
                  >
                    {currentStateData.map((cityData: CityLettersData) => {
                      if (cityData?.char === selectedFirstCityLetter) {
                        return (
                          <li key={cityData?.char}>
                            <button
                              data-testid="cityLetterbutton"
                              id={`button-${cityData?.char}`}
                              className={`${classes.activeLetter} ${classes.stateLettersButton}`}
                              onClick={() => onStateLetterClick(cityData?.char)}
                            >
                              <Typography tagType="span" styleType="p1">
                                {cityData?.char}
                              </Typography>
                            </button>
                          </li>
                        )
                      } else {
                        if (cityData?.isDataPresent) {
                          return (
                            <li key={cityData?.char}>
                              <button
                                data-testid={`button-${cityData?.char}`}
                                id={`button-${cityData?.char}`}
                                className={`${classes.stateLettersButton}`}
                                onClick={() =>
                                  onStateLetterClick(cityData?.char)
                                }
                              >
                                <Typography
                                  tagType="span"
                                  styleType="p1"
                                  fontType="regularFont"
                                >
                                  {cityData?.char}
                                </Typography>
                              </button>
                            </li>
                          )
                        } else {
                          return (
                            <li key={cityData?.char}>
                              <button
                                disabled={true}
                                className={`${classes.stateLettersButton} ${classes.enaciveLetter}`}
                              >
                                {cityData?.char}
                              </button>
                            </li>
                          )
                        }
                      }
                    })}
                  </ul>
                }
              </div>
            </div>
            <hr className={classes.horizontalDivider} />
            <div className={classes.rightFilterSection}>
              {
                <ul className={classes.cityNameWrapperUL}>
                  {selectedLetterCities.length ? (
                    <>
                      {selectedLetterCities.map((cities: City) => {
                        if (
                          cities?.link?.value ||
                          cities?.link?.value === 'true'
                        ) {
                          return (
                            <li
                              data-testid="cityname"
                              key={cities?.name?.value}
                              className={`${classes.cityNameWrapper} activeCityName`}
                            >
                              <a
                                href={`/local/${currenStateInURL}/${cities?.url?.value}`}
                                className={classes.cityRedirectLink}
                              >
                                <Typography
                                  className={classes.cityName}
                                  tagType="p"
                                  styleType="p1"
                                  fontType="mediumFont"
                                >
                                  {cities?.name?.value}
                                </Typography>
                              </a>
                            </li>
                          )
                        }
                        return (
                          <li
                            className={classes.cityNameWrapper}
                            data-testid="cityname"
                            key={cities?.name?.value}
                          >
                            <Typography
                              className={classes.cityName}
                              tagType="p"
                              styleType="p1"
                            >
                              {cities?.name?.value}
                            </Typography>
                          </li>
                        )
                      })}
                    </>
                  ) : (
                    ''
                  )}
                </ul>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: colors.main.brightRed,
    padding: '5rem 1rem',
    [theme.breakpoints.down('xs')]: {
      padding: '2.5rem 1rem',
    },
  },
  container: {
    maxWidth: '1200px',
    margin: 'auto',
  },
  mainContainer: {
    padding: '50px 100px',
    borderRadius: '2rem',
    backgroundColor: colors.main.white,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      padding: '2rem 1rem',
    },
  },
  stateLettersSectionUL: {
    display: 'flex',
    listStyle: 'none',
    flexWrap: 'wrap',
    padding: 0,
    marginLeft: '-8px',
  },
  stateLettersButton: {
    border: 'none',
    background: 'none',
    padding: '5px',
    fontSize: '18px',
    minWidth: '33px',
    lineHeight: '26px',
    color: `${colors.main.dark}`,
    '&:hover': {
      color: colors.main.brightRed,
      '& span': {
        color: colors.main.brightRed,
      },
    },
  },
  enaciveLetter: {
    pointerEvents: 'none',
    color: `${colors.main.gray}`,
    fontWeight: 'normal',
  },
  activeLetter: {
    color: `${colors.main.dark}`,
    fontWeight: 700,
    '&::after': {
      content: '""',
      background: colors.main.brightRed,
      height: '8px',
      width: '15px',
      display: 'block',
      margin: 'auto',
    },
  },
  cityRedirectLink: {
    textDecoration: 'underline',
    textUnderlineOffset: '1px',
    textDecorationThickness: '1px',
    fontSize: '18px',
    lineHeight: '1.625rem',
    display: 'block',
    fontWeight: 700,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  cityNameWrapperUL: {
    columnCount: 4,
    listStyle: 'none',
    flexWrap: 'wrap',
    width: '100%',
    padding: 0,
    paddingTop: '3rem',
    margin: 0,
    [theme.breakpoints.down('md')]: {
      columnCount: 2,
      paddingTop: '2rem',
    },
  },
  leftFilterSection: {},
  rightFilterSection: {
    marginLeft: '-8px',
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
    },
  },
  title: {
    marginBottom: 16,
  },
  subtitle: {},
  cityNameWrapper: {
    breakInside: 'avoid',
    padding: '6px 0 6px 10px',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    [theme.breakpoints.down('md')]: {
      padding: '6px 0 6px',
      height: 50,
      alignItems: 'start',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0 0 1rem 0',
      height: 'unset',
    },
    '&.activeCityName': {
      '& a': {
        width: '100%',
        display: 'contents',
        '& p': {
          textDecoration: 'underline',
        },
        '& :hover': {
          color: colors.main.brightRed,
        },
      },
    },
  },
  citiesContainer: {
    width: '100%',
  },
  cityName: {
    margin: '6px 0',
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      margin: 0,
    },
  },
  horizontalDivider: {
    width: '100%',
    background: colors.main.brightRed,
    border: colors.main.brightRed,
    height: '2px',
    margin: 0,
  },
}))

export default FilterCities
