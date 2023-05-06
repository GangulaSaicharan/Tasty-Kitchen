/* eslint-disable react/no-unknown-property */
import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'

import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {FaRupeeSign} from 'react-icons/fa'
import Header from '../Header'
import FoodItem from '../FoodItems'
import Footer from '../Footer'

class RestaurantDetailsItem extends Component {
  state = {
    FoodItemsData: [],
    RestaurantDetails: {},
    isLoading: false,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({
      isLoading: true,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        costForTwo: fetchedData.cost_for_two,
        cuisine: fetchedData.cuisine,
        imageUrl: fetchedData.image_url,
        id: fetchedData.id,
        name: fetchedData.name,
        location: fetchedData.location,
        opensAt: fetchedData.opens_at,
        rating: fetchedData.rating,
        reviewsCount: fetchedData.reviews_count,
      }
      const updatedFoodItemsData = fetchedData.food_items.map(each => ({
        name: each.name,
        cost: each.cost,
        foodType: each.food_type,
        imageUrl: each.image_url,
        id: each.id,
        rating: each.rating,
      }))
      this.setState({
        RestaurantDetails: updatedData,
        FoodItemsData: updatedFoodItemsData,
        isLoading: false,
      })
    }
  }

  renderRestaurantDetails = () => {
    const {RestaurantDetails, FoodItemsData} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = RestaurantDetails
    return (
      <>
        <div className="banner-bg">
          <div className="banner-container">
            <img src={imageUrl} alt="restaurant" className="restaurant-image" />
            <div className="restaurant-info">
              <h1 className="restaurant-name">{name}</h1>
              <p className="restaurant-cuisine">{cuisine}</p>
              <p className="restaurant-location">{location}</p>
              <div className="rating-rate-container">
                <div className="rating-container">
                  <p className="rating">
                    <AiFillStar />
                    {rating}
                  </p>
                  <p className="sub-text">{reviewsCount}+ Ratings</p>
                </div>
                <hr className="separation-line" />
                <div className="rating-container">
                  <p className="rating">
                    <FaRupeeSign />
                    {costForTwo}
                  </p>
                  <p className="sub-text">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-list">
          {FoodItemsData.map(each => (
            <FoodItem foodItemDetails={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  renderLoader = () => (
    <div testid="restaurant-details-loader" className="restaurant-loader">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div>
        <Header />
        {isLoading ? this.renderLoader() : this.renderRestaurantDetails()}
        <Footer />
      </div>
    )
  }
}

export default RestaurantDetailsItem
