/* eslint-disable react/no-unknown-property */
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import Header from '../Header'
import Carousel from '../Carousel'
import Footer from '../Footer'
import RestaurantsList from '../RestaurantsList'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="Home-container">
      <Header />
      <Carousel />
      <RestaurantsList />
      <Footer />
    </div>
  )
}
export default Home
