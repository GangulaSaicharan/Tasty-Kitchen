import {Component} from 'react'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'
import CartTotal from '../CartTotal'
import './index.css'
import Payment from '../Payment'

class CartListView extends Component {
  state = {
    isOrderPlaced: false,
  }

  orderPlaced = () => {
    this.setState(prevState => ({isOrderPlaced: !prevState.isOrderPlaced}))
  }

  render() {
    const {isOrderPlaced} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value
          const onClickRemoveAllBtn = () => {
            removeAllCartItems()
          }
          return isOrderPlaced ? (
            <Payment />
          ) : (
            <div className="cart-content-container">
              <div className="cart-head-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  type="button"
                  className="remove-all-btn"
                  onClick={onClickRemoveAllBtn}
                >
                  Remove All
                </button>
              </div>
              <ul className="cart-list">
                {cartList.map(eachCartItem => (
                  <CartItem
                    key={eachCartItem.id}
                    cartItemDetails={eachCartItem}
                  />
                ))}
              </ul>
              <CartTotal orderPlaced={this.orderPlaced} />
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartListView
