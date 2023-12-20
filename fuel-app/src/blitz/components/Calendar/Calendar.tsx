import clx from 'classnames'
import React, { useState } from 'react'
import { Typography } from '@/shared-ui/components'
import { ICalendar, IDates } from './types'
import { Tabs } from '@material-ui/core'
import moment from 'moment'
import css from './Calendar.module.scss'
const Calender: React.FC<ICalendar> = (props) => {
  const { selectDateTitle, TabScrollButton, datesArray } = props
  const [dates, setdates] = useState<IDates[]>(datesArray)
  const getClassForDate = (available: boolean, selected: boolean) => {
    if (!available) {
      return css.boxDisabled
    } else if (selected) {
      return css.boxSelected
    }
  }

  const onDateClickHandler = (item: IDates) => {
    const temp = dates?.map((x: IDates) => {
      x.selected = x.date === item.date
      return x
    })
    props.getSelectedDates(temp)
    setdates(temp)
  }

  return (
    <React.Fragment>
      <div className={css.selectDateWrapper}>
        <Typography styleType="p1" fontType="boldFont">
          {selectDateTitle}
        </Typography>
        <Tabs
          className={css.tabContainer}
          variant={'scrollable'}
          scrollButtons={'auto'}
          ScrollButtonComponent={TabScrollButton}
          value={false}
        >
          {dates?.map((item: IDates, index: number) => (
            <div
              tabIndex={index}
              key={index}
              role="tab"
              className={clx(
                css.box,
                getClassForDate(item?.available, item?.selected),
              )}
              onClick={() => onDateClickHandler(item)}
            >
              <Typography className={css.boxMonth} fontType="boldFont">
                {moment(item?.date).format('MMM')}
              </Typography>
              <Typography className={css.boxDate} fontType="boldFont">
                {moment(item?.date).format('DD')}
              </Typography>
              <Typography className={css.boxMonth}>
                {moment(item?.date).format('ddd')}
              </Typography>
            </div>
          ))}
        </Tabs>
      </div>
    </React.Fragment>
  )
}
export default Calender
