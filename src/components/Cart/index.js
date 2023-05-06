import {Component} from 'react'
import Header from '../Header'
import './index.css'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartListView from '../CartListView'
import Footer from '../Footer'

class Cart extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const showEmptyView = cartList.length === 0

          return (
            <>
              <Header />
              <div className="cart-container">
                {showEmptyView ? <EmptyCartView /> : <CartListView />}
              </div>
              <Footer />
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart
