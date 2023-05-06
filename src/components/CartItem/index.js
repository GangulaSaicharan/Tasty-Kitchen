/* eslint-disable react/no-unknown-property */
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {id, name, cost, quantity, imageUrl} = cartItemDetails

      const onRemoveCartItem = () => {
        removeCartItem(id)
      }

      const onIncrementQuantity = () => {
        incrementCartItemQuantity(id)
      }
      const onDecrementQuantity = () => {
        decrementCartItemQuantity(id)
      }
      return (
        <li testid="cartItem" className="cart-item">
          <img className="cart-product-image" src={imageUrl} alt={name} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-container">
              <h1 className="cart-product-title">{name}</h1>
            </div>
            <div className="cart-quantity-container">
              <button
                testid="decrement-quantity"
                type="button"
                onClick={onDecrementQuantity}
                className="quantity-controller-button"
              >
                <BsDashSquare color="#52606D" size={12} />
              </button>
              <p testid="item-quantity" className="cart-quantity">
                {quantity}
              </p>
              <button
                testid="increment-quantity"
                type="button"
                onClick={onIncrementQuantity}
                className="quantity-controller-button"
              >
                <BsPlusSquare color="#52606D" size={12} />
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">Rs {cost * quantity}/-</p>
              <button
                testid="remove"
                className="remove-button"
                type="button"
                onClick={onRemoveCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
