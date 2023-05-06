import './App.css'
import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import RestaurantDetailsItem from './components/RestaurantDetailsItem'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import CartContext from './context/CartContext'

const getCartListFromLocalStorage = () => {
  const stringifiedCartList = localStorage.getItem('cartList')
  const parsedCartList = JSON.parse(stringifiedCartList)
  if (parsedCartList === null) {
    return []
  }
  return parsedCartList
}

class App extends Component {
  state = {cartList: getCartListFromLocalStorage()}

  addCartItem = foodItem => {
    const {cartList} = this.state
    const foodItemObject = cartList.find(each => each.id === foodItem.id)
    if (foodItemObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === foodItemObject.id) {
            const updatedQuantity = eachItem.quantity + foodItemObject.quantity
            return {...eachItem, quantity: updatedQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, foodItem],
      }))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(each => each.id !== id)
    this.setState({cartList: updatedCartList})
    localStorage.setItem('cartList', JSON.stringify(updatedCartList))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
    localStorage.setItem('cartList', [])
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedList = cartList.map(each => {
      if (each.id === id) {
        const updatedQuantity = each.quantity + 1
        return {...each, quantity: updatedQuantity}
      }
      return each
    })
    this.setState({cartList: updatedList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const product = cartList.find(each => each.id === id)

    if (product.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === id) {
            const updatedQuantity = each.quantity - 1
            return {...each, quantity: updatedQuantity}
          }
          return each
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  render() {
    const {cartList} = this.state
    localStorage.setItem('cartList', JSON.stringify(cartList))
    console.log(cartList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetailsItem}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
