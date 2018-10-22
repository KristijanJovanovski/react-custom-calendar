import React from 'react'

import Calendar from './Calendar/Calendar'

const Examples = () => {
  const handleMultiSelect = dates => {
    console.log(dates)
  }
  const handleRangeSelect = dates => {
    console.log(dates)
  }
  return (
    <>
      <div className="container">
        <h1>Default Calendar</h1>
        <div className="calendar-container">
          <Calendar />
          <code className="calendar-code">
            {`
              <Calendar
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1> Calendar with min date </h1>
        <div className="calendar-container">
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
        <div className="calendar-container">
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
        <div className="calendar-container">
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
        <div className="calendar-container">
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
        <div className="calendar-container">
          <div className="calendar-container">
            <Calendar calendarType={'US'} />
            <code className="calendar-code">
              {`
              <Calendar
                calendarType={'US'}
              />`}
            </code>
          </div>
        </div>
      </div>
      <div className="container">
        <h1>Default ISO 8601 Calendar </h1>
        <div className="calendar-container">
          <div className="calendar-container">
            <Calendar calendarType={'ISO 8601'} />
            <code className="calendar-code">
              {`
              <Calendar
                calendarType={'ISO 8601'}
              />`}
            </code>
          </div>
        </div>
      </div>
      <div className="container">
        <h1> Calendar with styleds weekends</h1>
        <div className="calendar-container">
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
        <div className="calendar-container">
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
        <h1> Calendar vith startView</h1>
        <div className="calendar-container">
          <Calendar startView={'CENTURY'} />
          <code className="calendar-code">
            {`
              <Calendar
                startView={'CENTURY'}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1>Calendar with min view</h1>
        <div className="calendar-container">
          <Calendar minView={'YEAR'} />
          <code className="calendar-code">
            {`
              <Calendar
                minView={'YEAR'}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1>Calendar with max view</h1>
        <div className="calendar-container">
          <Calendar maxView={'DECADE'} />
          <code className="calendar-code">
            {`
              <Calendar
                maxView={'DECADE'}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1>Calendar with min & max view</h1>
        <div className="calendar-container">
          <Calendar minView={'YEAR'} maxView={'DECADE'} />
          <code className="calendar-code">
            {`
              <Calendar
                minView={'YEAR'}
                maxView={'DECADE'}
              />`}
          </code>
        </div>
      </div>
      <div className="container">
        <h1>Calendar with start view date</h1>
        <div className="calendar-container">
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
        <div className="calendar-container">
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
        <div className="calendar-container">
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
        <div className="calendar-container">
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
        <div className="calendar-container">
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
        <div className="calendar-container">
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
        <div className="calendar-container">
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
        <div className="calendar-container">
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
        <div className="calendar-container">
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
        <div className="calendar-container">
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
        <div className="calendar-container">
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
        <div className="calendar-container">
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
        <div className="calendar-container">
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
        <div className="calendar-container">
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
        <div className="calendar-container">
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
        <div className="calendar-container">
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
        <div className="calendar-container">
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
        <div className="calendar-container">
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
