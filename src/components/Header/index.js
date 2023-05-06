import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {showNavItems: false}

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  toggleShowNavItems = () => {
    this.setState(prevState => ({showNavItems: !prevState.showNavItems}))
  }

  getColor = current => {
    const {history} = this.props
    if (history.location.pathname === current) {
      // console.log(history.location.pathname)
      return '#f7931e'
    }
    return '#334155'
  }

  renderNavItems = () => (
    <div className="nav-items-container">
      <ul className="nav-menu">
        <Link to="/" className="nav-link" style={{color: this.getColor('/')}}>
          <li className="nav-menu-item">Home</li>
        </Link>
        <Link
          to="/cart"
          className="nav-link"
          style={{color: this.getColor('/cart')}}
        >
          <li className="nav-menu-item">Cart</li>
        </Link>
        <li>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={this.onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
      <button
        type="button"
        onClick={this.toggleShowNavItems}
        className="nav-close-button"
      >
        <AiFillCloseCircle />
      </button>
    </div>
  )

  render() {
    const {showNavItems} = this.state
    return (
      <nav className="nav-header">
        <div className="nav-content">
          <div className="nav-bar-mobile-logo-container">
            <Link to="/" className="nav-link">
              <img
                alt="website logo"
                className="nav-mobile-logo"
                src="https://res.cloudinary.com/dx0tk0a56/image/upload/v1683110613/login-logo_eaie97.png"
              />
            </Link>
            <h1 className="nav-website-name">Tasty Kitchens</h1>
            <button
              type="button"
              onClick={this.toggleShowNavItems}
              className="nav-mobile-btn"
            >
              <GiHamburgerMenu className="nav-mobile-menu-icon" />
            </button>
          </div>
          <div className="nav-bar-large-container">
            <Link to="/" className="nav-link">
              <img
                className="nav-website-logo"
                src="https://res.cloudinary.com/dx0tk0a56/image/upload/v1683110613/login-logo_eaie97.png"
                alt="website logo"
              />
            </Link>
            <h1 className="nav-website-name">Tasty Kitchen</h1>
            <ul className="nav-menu">
              <Link
                to="/"
                className="nav-link"
                style={{color: this.getColor('/')}}
              >
                <li className="nav-menu-item">Home</li>
              </Link>
              <Link
                to="/cart"
                className="nav-link"
                style={{color: this.getColor('/cart')}}
              >
                <li className="nav-menu-item">Cart</li>
              </Link>
              <li>
                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        {showNavItems && this.renderNavItems()}
      </nav>
    )
  }
}

export default withRouter(Header)
