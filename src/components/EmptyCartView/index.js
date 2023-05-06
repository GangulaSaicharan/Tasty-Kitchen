import {Link} from 'react-router-dom'

import './index.css'

const EmptyCartView = () => (
  <div className="cart-empty-view-container">
    <img
      src="https://res.cloudinary.com/dx0tk0a56/image/upload/v1683272124/cooking_1_ms1pkr.png"
      className="cart-empty-img"
      alt="empty cart"
    />
    <h1 className="cart-empty-heading">No Order Yet!</h1>
    <p className="cart-empty-text">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/">
      <button type="button" className="shop-now-btn">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
