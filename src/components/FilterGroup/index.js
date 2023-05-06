import './index.css'
import {BsFilterLeft} from 'react-icons/bs'

const FilterGroup = props => {
  const {sortByOptions, activeSortOption, changeSelectOption} = props
  const onChangeSelectOption = event => {
    changeSelectOption(event.target.value)
  }

  return (
    <div className="filter-group-main-container">
      <div className="filter-group-details-container">
        <h1 className="filter-group-heading">Popular Restaurants</h1>
        <p className="filter-group-text">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
      </div>
      <div className="sort-container">
        <BsFilterLeft size={20} />
        <p className="sort-text">Sort By</p>
        <select
          value={activeSortOption}
          className="select-options"
          onChange={onChangeSelectOption}
        >
          {sortByOptions.map(eachOption => (
            <option
              key={eachOption.id}
              value={eachOption.value}
              className="option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default FilterGroup
