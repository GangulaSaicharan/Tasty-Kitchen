/* eslint-disable react/no-unknown-property */
import './index.css'
import Cookies from 'js-cookie'
import {AiOutlineLeftSquare, AiOutlineRightSquare} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import FilterGroup from '../FilterGroup'
import RestaurantItem from '../RestaurantItem'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class RestaurantsList extends Component {
  state = {
    isLoading: false,
    restaurantsList: [],
    activeSortOption: sortByOptions[1].value,
    activePageNumber: 1,
    totalPages: 0,
  }

  componentDidMount() {
    this.getRestaurantsApi()
  }

  onIncreasePageNumber = () => {
    const {activePageNumber} = this.state
    if (activePageNumber < 4) {
      this.setState(
        prevState => ({
          activePageNumber: prevState.activePageNumber + 1,
        }),
        this.getRestaurantsApi,
      )
    }
  }

  onDecreasePageNumber = () => {
    const {activePageNumber} = this.state
    if (activePageNumber > 1) {
      this.setState(
        prevState => ({
          activePageNumber: prevState.activePageNumber - 1,
        }),
        this.getRestaurantsApi,
      )
    }
  }

  renderPageNumber = () => {
    const {activePageNumber, totalPages} = this.state
    return (
      <div className="page-numbers-container">
        <button
          // eslint-disable-next-line react/no-unknown-property
          testid="pagination-left-button"
          className="page-button"
          onClick={this.onDecreasePageNumber}
          type="button"
        >
          <AiOutlineLeftSquare fontSize="22px" />
        </button>
        <p className="active-page-number" testid="active-page-number">
          {activePageNumber}
        </p>
        <p className="active-page-number">of</p>
        <p className="active-page-number"> {totalPages}</p>
        <button
          // eslint-disable-next-line react/no-unknown-property
          testid="pagination-right-button"
          className="page-button"
          onClick={this.onIncreasePageNumber}
          type="button"
        >
          <AiOutlineRightSquare fontSize="22px" />
        </button>
      </div>
    )
  }

  getRestaurantsApi = async () => {
    this.setState({isLoading: true})
    const {activeSortOption, activePageNumber} = this.state
    const limit = 9
    const offset = (activePageNumber - 1) * limit
    const accessToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeSortOption}`,
      options,
    )
    const data = await response.json()
    const totalRestaurants = data.total
    const totalPages = Math.ceil(totalRestaurants / limit)
    if (response.ok) {
      const updatedData = data.restaurants.map(each => ({
        hasOnlineDelivery: each.has_online_delivery,
        name: each.name,
        hasTableBooking: each.has_table_booking,
        isDeliveringVow: each.is_delivering_noe,
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        imageUrl: each.image_url,
        id: each.id,
        menu_type: each.menu_type,
        location: each.location,
        opensAt: each.opens_at,
        groupByTime: each.group_by_time,
        userRating: {
          ratingText: each.user_rating.rating_text,
          ratingColor: each.user_rating.rating_color,
          totalReviews: each.user_rating.total_reviews,
          rating: each.user_rating.rating,
        },
      }))
      this.setState({
        restaurantsList: updatedData,
        isLoading: false,
        totalPages,
      })
    }
  }

  changeSelectOption = value => {
    console.log(value)
    this.setState({activeSortOption: value}, this.getRestaurantsApi)
  }

  renderRestaurants = () => {
    const {restaurantsList, activePageNumber, activeSortOption} = this.state
    console.log(activeSortOption)
    return (
      <>
        <FilterGroup
          activePageNumber={activePageNumber}
          sortByOptions={sortByOptions}
          activeSortOption={activeSortOption}
          changeSelectOption={this.changeSelectOption}
        />
        <ul className="restaurant-list">
          {restaurantsList.map(each => (
            <RestaurantItem restaurantsDetails={each} key={each.id} />
          ))}
        </ul>
        {this.renderPageNumber()}
      </>
    )
  }

  renderLoader = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div testid="restaurants-list-loader" className="restaurants-list-loader">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderRestaurants()
  }
}

export default RestaurantsList
