import React from 'react'

import Calendar from './Calendar/Calendar'
import { DATE_TYPES, DAYS, CALENDAR_TYPE} from './Calendar/utils/constants'

const Examples = () => {
  const handleMultiSelect = (dates: Date[]) => {
    console.log(dates)
  }
  const handleRangeSelect = (dates: Date[]) => {
    console.log(dates)
  }
  return (
    <>
      <div className="container">
        <h1>Default Calendar with time</h1>
        <div className="my-calendar-container">
          <Calendar
            withTime
            onDateSelected={(date, selected) => console.log(date, selected)}
          />
          <code className="calendar-code">
            {`
              <Calendar
                withTime 
                onDateSelected={(date, selected) => console.log(date,selected)}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1>Default Calendar</h1>
        <div className="my-calendar-container">
          <Calendar />
          <code className="calendar-code">
            {`
              <Calendar
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1>Calendar with preselected date</h1>
        <div className="my-calendar-container">
          <Calendar selectedDate={new Date()} />
          <code className="calendar-code">
            {`
              <Calendar
                selectedDate={new Date()}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1> Calendar with preselected dates</h1>
        <div className="my-calendar-container">
          <Calendar selectedDates={[new Date(2018, 9, 25), new Date()]} />
          <code className="calendar-code">
            {`
              <Calendar
                selectedDates={[new Date(2018, 9, 25), new Date()]}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1> Frozen Calendar with preselected dates</h1>
        <div className="my-calendar-container">
          <Calendar
            freezeSelection
            selectedDates={[new Date(2018, 9, 25), new Date()]}
          />
          <code className="calendar-code">
            {`
              <Calendar
                freezeSelection
                selectedDates={[new Date(2018, 9, 25), new Date()]}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1> Calendar with min date </h1>
        <div className="my-calendar-container">
          <Calendar minDate={new Date(2018, 8, 1)} />
          <code className="calendar-code">
            {`
              <Calendar
                minDate={new Date(2018,8,1)}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1> Calendar with max date</h1>
        <div className="my-calendar-container">
          <Calendar maxDate={new Date(2018, 11, 1)} />
          <code className="calendar-code">
            {`
              <Calendar
                maxDate={new Date(2018,8,1)}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1> Calendar with min and max date</h1>
        <div className="my-calendar-container">
          <Calendar
            minDate={new Date(2018, 8, 1)}
            maxDate={new Date(2018, 11, 1)}
          />
          <code className="calendar-code">
            {`
              <Calendar
                minDate={new Date(2018,8,1)}
                maxDate={new Date(2018, 11, 1)}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1> Calendar with min & max date and disableable top view tiles</h1>
        <div className="my-calendar-container">
          <Calendar
            disableableYearTiles
            disableableDecadeTiles
            disableableCenturyTiles
            minDate={new Date(2018, 8, 1)}
            maxDate={new Date(2018, 11, 1)}
          />
          <code className="calendar-code">
            {`
              <Calendar
                disableableYearTiles
                disableableDecadeTiles
                disableableCenturyTiles
                minDate={new Date(2018,8,1)}
                maxDate={new Date(2018, 11, 1)}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1>Default US Calendar </h1>
        <div className="my-calendar-container">
          <div className="my-calendar-container">
            <Calendar calendarType={CALENDAR_TYPE.US} />
            <code className="calendar-code">
              {`
              <Calendar
                calendarType={US}
              />`}
            </code>
          </div>
        </div>
      </div>
      <div className="container">
        <h1>Default ISO_8601 Calendar </h1>
        <div className="my-calendar-container">
          <div className="my-calendar-container">
            <Calendar calendarType={CALENDAR_TYPE.ISO_8601} />
            <code className="calendar-code">
              {`
              <Calendar
                calendarType={ISO_8601}
              />`}
            </code>
          </div>
        </div>
      </div>
      <div className="container">
        <h1> Calendar with disabled weekdays</h1>
        <div className="my-calendar-container">
          <Calendar
            disableWeekdays={[
              DAYS.SUNDAY,
              DAYS.MONDAY,
              DAYS.TUESDAY,
              DAYS.WEDNESDAY,
              DAYS.THURSDAY
            ]}
          />
          <code className="calendar-code">
            {`
              <Calendar
                disableWeekdays={[DAYS.SUNDAY, DAYS.MONDAY, DAYS.TUESDAY, DAYS.WEDNESDAY, DAYS.THURSDAY]}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1> Calendar with styled weekends</h1>
        <div className="my-calendar-container">
          <Calendar weekends />
          <code className="calendar-code">
            {`
              <Calendar
                weekends
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1> Calendar with locale</h1>
        <div className="my-calendar-container">
          <Calendar locale={'mk'} />
          <code className="calendar-code">
            {`
              <Calendar
                locale={'mk'}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1> Calendar with startView</h1>
        <div className="my-calendar-container">
          <Calendar startView={DATE_TYPES.CENTURY} />
          <code className="calendar-code">
            {`
              <Calendar
                startView={DATE_TYPES.CENTURY}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1>Calendar with min view</h1>
        <div className="my-calendar-container">
          <Calendar minView={DATE_TYPES.YEAR} />
          <code className="calendar-code">
            {`
              <Calendar
                minView={DATE_TYPES.YEAR}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1>Calendar with max view</h1>
        <div className="my-calendar-container">
          <Calendar maxView={DATE_TYPES.DECADE} />
          <code className="calendar-code">
            {`
              <Calendar
                maxView={DATE_TYPES.DECADE}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1>Calendar with min & max view</h1>
        <div className="my-calendar-container">
          <Calendar minView={DATE_TYPES.YEAR} maxView={DATE_TYPES.DECADE} />
          <code className="calendar-code">
            {`
              <Calendar
                minView={DATE_TYPES.YEAR}
                maxView={DATE_TYPES.DECADE}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1>Calendar with start view date</h1>
        <div className="my-calendar-container">
          <Calendar startViewDate={new Date(2020, 0, 1)} />
          <code className="calendar-code">
            {`
              <Calendar
                startViewDate={new Date(2020, 0, 1)}
              />`}
          </code>
        </div>
      </div>

      <div className="container">
        <h1> Calendar with disabled dates</h1>
        <div className="my-calendar-container">
          <Calendar
            disabledDates={[new Date(2018, 10, 1), new Date(2018, 10, 2)]}
          />
          <code className="calendar-code">
            {`
              <Calendar
                disabledDates={[new Date(2018,10,1), new Date(2018,10,2)]}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1>Calendar min, max and disabled dates</h1>
        <div className="my-calendar-container">
          <Calendar
            minDate={new Date()}
            maxDate={new Date(2019, 0, 0)}
            disabledDates={[new Date(2018, 10, 1), new Date(2018, 10, 2)]}
          />
          <code className="calendar-code">
            {`
              <Calendar
                minDate={new Date()}
                maxDate={new Date(2019,0,0)}
                disabledDates={[new Date(2018, 10, 1), new Date(2018, 10, 2)]}    
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1> Calendar with available dates</h1>
        <div className="my-calendar-container">
          <Calendar
            availableDates={[new Date(2018, 10, 1), new Date(2018, 10, 2)]}
          />
          <code className="calendar-code">
            {`
              <Calendar
                availableDates={[new Date(2018, 10, 1), new Date(2018, 10, 2)]}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1> Calendar with min, max and available dates</h1>
        <div className="my-calendar-container">
          <Calendar
            minDate={new Date()}
            maxDate={new Date(2018, 10, 25)}
            availableDates={[new Date(2018, 10, 28), new Date(2018, 10, 29)]}
          />
          <code className="calendar-code">
            {`
              <Calendar
                minDate={new Date()}
                maxDate={new Date(2018,10,25)}
                availableDates={[new Date(2018, 10, 28), new Date(2018, 10, 29)]}

              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1>Calendar with min, max, disabled and available dates</h1>
        <div className="my-calendar-container">
          <Calendar
            minDate={new Date()}
            maxDate={new Date(2018, 10, 25)}
            disabledDates={[new Date(2018, 10, 1), new Date(2018, 10, 2)]}
            availableDates={
              (new Date(2018, 10, 1),
              [new Date(2018, 10, 28), new Date(2018, 10, 29)])
            }
          />
          <code className="calendar-code">
            {`
              <Calendar
                minDate={new Date()}
                maxDate={new Date(2018, 10, 25)}
                disabledDates={[new Date(2018, 10, 1), new Date(2018, 10, 2)]}
                availableDates={[new Date(2018, 10, 1), [new Date(2018, 10, 28), new Date(2018, 10, 29)]} 
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1>Multi select Calendar</h1>
        <div className="my-calendar-container">
          <Calendar multiSelect onMultiSelect={handleMultiSelect} />
          <code className="calendar-code">
            {`
              <Calendar
                multiSelect
                onMultiSelect={handleMultiSelect}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1>Range select Calendar</h1>
        <div className="my-calendar-container">
          <Calendar
            range
            onMultiSelect={handleMultiSelect}
            onRangeMultiSelect={handleRangeSelect}
          />
          <code className="calendar-code">
            {`
              <Calendar
                range
                onMultiSelect={handleMultiSelect}
                onRangeMultiSelect={handleRangeSelect}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1> Calendar with hidden navigation</h1>
        <div className="my-calendar-container">
          <Calendar navigationHidden />
          <code className="calendar-code">
            {`
              <Calendar
                navigationHidden
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1> Calendar with disabled navigation</h1>
        <div className="my-calendar-container">
          <Calendar navigationDisabled />
          <code className="calendar-code">
            {`
              <Calendar
                navigationDisabled
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1> Calendar with hidden and disabled navigation</h1>
        <div className="my-calendar-container">
          <Calendar navigationHidden navigationDisabled />
          <code className="calendar-code">
            {`
              <Calendar
                navigationHidden 
                navigationDisabled
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1> Calendar with disabled next nav button </h1>
        <div className="my-calendar-container">
          <Calendar nextDisabled />
          <code className="calendar-code">
            {`
              <Calendar
                nextDisabled
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1> Calendar with enabled before and after month dates navigation</h1>
        <div className="my-calendar-container">
          <Calendar navigableBeforeAndAfterDates />
          <code className="calendar-code">
            {`
              <Calendar
                navigableBeforeAndAfterDates
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1> Calendar with hidden before and after month dates</h1>
        <div className="my-calendar-container">
          <Calendar hideBeforeAndAfterDates />
          <code className="calendar-code">
            {`
              <Calendar
                hideBeforeAndAfterDates
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1> Calendar with nav label in short format</h1>
        <div className="my-calendar-container">
          <Calendar navLabelShortFormat />
          <code className="calendar-code">
            {`
              <Calendar
                navLabelShortFormat
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1> Calendar with nav classes</h1>
        <div className="my-calendar-container">
          <Calendar navigationClasses={'nav-example-class'} />
          <code className="calendar-code">
            {`
              .nav-example-class {
                color: red;
                font-weight: 700;
                background-color: aquamarine;
              }
            
              <Calendar
                navigationClasses={'nav-example-class'}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1> Calendar with tile classes</h1>
        <div className="my-calendar-container">
          <Calendar tileClasses={'tile-example-class'} />
          <code className="calendar-code">
            {`
              .tile.tile-example-class {
                color: red;
                background-color: aquamarine;
              }
              .tile.tile-example-class:hover {
                color: purple;
                font-weight: 700;
                background-color: cyan;
              }
            
              <Calendar
                tileClasses={'tile-example-class'}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1> Calendar example with rounded tile class</h1>
        <div className="my-calendar-container">
          <Calendar tileClasses={'rounded-tile'} />
          <code className="calendar-code">
            {`
              .tile.rounded-tile {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                margin: auto 0;
              }
              .tile.rounded-tile:hover {
                border-radius: 50%;
              }
              
            
              <Calendar range
                tileClasses={'rounded-tile'}
              />`}
          </code>
        </div>
      </div>
    </>
  )
}

export default Examples
