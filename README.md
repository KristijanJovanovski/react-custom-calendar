# React Custom Calendar

No dependency, customisable calendar component for React.

### Compatability

Needs React 16.3 +

### Try it out

[CodeSandbox](https://codesandbox.io/s/github/KristijanJovanovski/react-custom-calendar)

| Prop                         | Type     | Required | Description                                                                                                                                                                                                                                                         | Example values                                                                                                      |
| ---------------------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| classNames                   | string   | No       | Css classes to to be added to Calendar Component.                                                                                                                                                                                                                   | "class1 class2"                                                                                                     |
| selectedDate                 | Date     | No       | Preselect single date. Warning: date is overwritten on date selection. Use selected Dates for no overwriting.                                                                                                                                                       | new Date()                                                                                                          |
| selectedDates                | [Date]   | No       | Preselect many dates.                                                                                                                                                                                                                                               | [new Date(), new Date()]                                                                                            |
| locale                       | string   | No       | Sets calendar locale. Defaults to "en".                                                                                                                                                                                                                             | "mk"                                                                                                                |
| weekends                     | bool     | No       | Weekends are styled. Defaults to false.                                                                                                                                                                                                                             | true                                                                                                                |
| calendarType                 | string   | No       | Sets Calendar Type. Available types: "US", "ISO 8601". Defaults to "US".                                                                                                                                                                                            | "ISO 8601"                                                                                                          |
| onDateSelected               | function | No       | Function called on every date selection.                                                                                                                                                                                                                            | (date, selected) => { console.log(date,selected) }                                                                  |
| onMultiSelect                | function | No       | Function called on every date selection if multiSelect prop is passed. Returns Array of dates. Warning: If range prop is passed it is called when the range is selected and conatins all Dates in the range. Use onRangeSelect if only range boundaries are needed. | (dates) => { console.log(dates) }                                                                                   |
| onRangeMultiSelect           | function | No       | Function called on every date selection if range prop is passed. Returns Array of of range start and end. Warning: It takes precedance if multiSelect prop is passed.                                                                                               | (dates) => { console.log(dates) }                                                                                   |
| multiSelect                  | bool     | No       | Enables multi selection. Warning: if range prop is passed, range takes precedance over multiSelect. Defaults to false.                                                                                                                                              | true                                                                                                                | Warning: if range prop is passed, range takes precedance over multiSelect. |
| range                        | bool     | No       | Enables range selection                                                                                                                                                                                                                                             | Enables range selection. Warning: if multiSelect prop is passed, range takes precedance over it. Defaults to false. | true |
| startViewDate                | Date     | No       | Date to focus the calendar view. Defaults to new Date().                                                                                                                                                                                                            | new Date(2018,0,1)                                                                                                  |
| minDate                      | Date     | No       | Disables dates prior than it.                                                                                                                                                                                                                                       | new Date()                                                                                                          |
| maxDate                      | Date     | No       | Disables dates latter than it.                                                                                                                                                                                                                                      | new Date()                                                                                                          |
| minView                      | string   | No       | Sets calendar min view. Can't drill down past it. Available values: "MONTH", "YEAR", "DECADE", "CENTURY". Defaults to "MONTH".                                                                                                                                      | "YEAR"                                                                                                              |
| maxView                      | string   | No       | Sets calendar max view. Can't drill up past it. Available values: "MONTH", "YEAR", "DECADE", "CENTURY". Defaults to "CENTURY".                                                                                                                                      | "YEAR"                                                                                                              |
| startView                    | string   | No       | Sets calendar current view. Available values: "MONTH", "YEAR", "DECADE", "CENTURY". Defaults to minView if supplied else to "MONTH".                                                                                                                                | "YEAR"                                                                                                              |
| disabledDates                | [Date]   | No       | Disables dates. Warning: if availableDates props is passed and contains same date as disabledDates it will be reenabled.                                                                                                                                            | new Date()                                                                                                          |
| navigationDisabled           | bool     | No       | Disables top navigation and can't drill up. Warning: if navigableBeforeAndAfterDates prop is passed user user can navigate to previous and latter dates. (only on MONTH View)                                                                                       | true                                                                                                                |
| prevDisabled                 | bool     | No       | Disables previuous navigation button.                                                                                                                                                                                                                               | true                                                                                                                |
| nextDisabled                 | bool     | No       | Disables next navigation button.                                                                                                                                                                                                                                    | true                                                                                                                |
| doublePrevDisabled           | bool     | No       | Disables double previuous navigation button.                                                                                                                                                                                                                        | true                                                                                                                |
| doubleNextDisabled           | bool     | No       | Disables double next navigation button.                                                                                                                                                                                                                             | true                                                                                                                |
| navigationHidden             | bool     | No       | Hides top navigaton.                                                                                                                                                                                                                                                | true                                                                                                                |
| navigationClasses            | string   | No       | Css classes to to be added to top navigation.                                                                                                                                                                                                                       | "class1 class2"                                                                                                     |
| doublePrevClasses            | string   | No       | Css classes to to be added to doublePrev button.                                                                                                                                                                                                                    | "class1 class2"                                                                                                     |
| prevClasses                  | string   | No       | Css classes to to be added to prev button.                                                                                                                                                                                                                          | "class1 class2"                                                                                                     |
| labelClasses                 | string   | No       | Css classes to to be added to navigation label.                                                                                                                                                                                                                     | "class1 class2"                                                                                                     |
| nextClasses                  | string   | No       | Css classes to to be added to next button.                                                                                                                                                                                                                          | "class1 class2"                                                                                                     |
| doubleNextClasses            | string   | No       | Css classes to to be added to doubleNext button.                                                                                                                                                                                                                    | "class1 class2"                                                                                                     |
| disableableYearTiles         | bool     | No       | Disables YEAR view tiles that don't have available dates (all dates in that year are disabled). Defaults to false.                                                                                                                                                  | true                                                                                                                |
| disableableDecadeTiles       | bool     | No       | Disables DECADE view tiles that don't have available dates (all dates in that decade are disabled). Defaults to false.                                                                                                                                              | true                                                                                                                |
| disableableCenturyTiles      | bool     | No       | Disables CENTURY view tiles that don't have available dates (all dates in that century are disabled). Defaults to false.                                                                                                                                            | true                                                                                                                |
| navigableBeforeAndAfterDates | bool     | No       | Enables navigation to previous and next month view when clicked on date. Defaults to false.                                                                                                                                                                         | true                                                                                                                |
| hideBeforeAndAfterDates      | bool     | No       | Hides previous and next month dates from current view. Defaults to false                                                                                                                                                                                            | true                                                                                                                |
| onMouseEnterTile             | function | No       | Function called when mouse enters view tile. Returns the event and the date of the tile.                                                                                                                                                                            | (e, date) => { consle.log(e,date) }                                                                                 |
| onMouseLeaveTile             | function | No       | Function called when mouse leaves view tile. Returns the event and the date of the tile.                                                                                                                                                                            | (e, date) => { consle.log(e,date) }                                                                                 |
