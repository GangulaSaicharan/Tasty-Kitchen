/* eslint-disable react/no-unknown-property */
import './index.css'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {Component} from 'react'
import CartContext from '../../context/CartContext'

class FoodItem extends Component {
  state = {quantity: 0}

  render() {
    const {foodItemDetails} = this.props
    const {id, name, imageUrl, cost, rating} = foodItemDetails
    const {quantity} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {
            addCartItem,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
          } = value
          const onClickAddToCart = () => {
            this.setState(
              prevState => ({
                quantity: prevState.quantity + 1,
              }),
              addCartItem({
                ...foodItemDetails,
                quantity: quantity + 1,
              }),
            )
          }

          const onIncrementQuantity = () => {
            this.setState(prevState => ({quantity: prevState.quantity + 1}))
            incrementCartItemQuantity(id)
          }
          const onDecrementQuantity = () => {
            this.setState(prevState => ({quantity: prevState.quantity - 1}))
            decrementCartItemQuantity(id)
          }

          return (
            <li testid="foodItem">
              <div className="food-item-container">
                <img className="food-item-image" src={imageUrl} alt={name} />
                <div className="food-item-details-container">
                  <h1 className="food-item-name">{name}</h1>
                  <p className="food-item-cost">{cost}</p>
                  <div className="food-item-rating-container">
                    <AiFillStar size={16} color="#FFCC00" />
                    <p className="food-item-rating">{rating}</p>
                  </div>
                  {quantity === 0 ? (
                    <button
                      type="button"
                      onClick={onClickAddToCart}
                      className="food-item-add-button"
                    >
                      Add
                    </button>
                  ) : (
                    <div className="quantity-container">
                      <button
                        testid="decrement-count"
                        type="button"
                        onClick={onDecrementQuantity}
                        className="quantity-controller-button"
                      >
                        <BsDashSquare className="quantity-controller-icon" />
                      </button>
                      <p testid="active-count" className="cart-quantity">
                        {quantity}
                      </p>
                      <button
                        testid="increment-count"
                        type="button"
                        onClick={onIncrementQuantity}
                        className="quantity-controller-button"
                      >
                        <BsPlusSquare className="quantity-controller-icon" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default FoodItem
