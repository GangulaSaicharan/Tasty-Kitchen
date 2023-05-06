/* eslint-disable react/no-unknown-property */
import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'

const RestaurantItem = props => {
  const {restaurantsDetails} = props
  const {name, imageUrl, cuisine, userRating, id} = restaurantsDetails
  const {rating, totalReviews} = userRating
  return (
    <Link to={`/restaurant/${id}`} className="link-item">
      <li testid="restaurant-item">
        <div className="restaurant-item-container">
          <img className="restaurant-item-image" src={imageUrl} alt={name} />
          <div className="restaurant-item-details-container">
            <h1 className="restaurant-item-name1">{name}</h1>
            <p className="restaurant-item-cuisine">{cuisine}</p>
            <div className="restaurant-item-rating-container">
              <AiFillStar size={16} color="#FFCC00" />
              <p className="restaurant-item-rating">{rating}</p>
              <h1 className="restaurant-item-total-reviews">
                ({totalReviews} ratings)
              </h1>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
