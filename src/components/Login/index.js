import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    console.log('submit-called')
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="form-container">
          <form className="form-container1" onSubmit={this.submitForm}>
            <img
              className="login-logo"
              alt="website login"
              src="https://res.cloudinary.com/dx0tk0a56/image/upload/v1683110613/login-logo_eaie97.png"
            />
            <h1 className="logoIn-heading">Tasty Kitchens</h1>
            <h1 className="mbl-login-heading">Login</h1>
            <div className="input-container">
              <label htmlFor="username" className="login-label">
                USERNAME
              </label>
              <input
                value={username}
                onChange={this.onChangeUsername}
                id="username"
                className="login-input"
                type="text"
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="login-label">
                PASSWORD
              </label>
              <input
                value={password}
                id="password"
                onChange={this.onChangePassword}
                className="login-input"
                type="password"
              />
            </div>
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
        <img
          className="login-image"
          alt="website logo"
          src="https://res.cloudinary.com/dx0tk0a56/image/upload/v1683108529/login-image_vyyp3o.png"
        />
      </div>
    )
  }
}

export default Login
