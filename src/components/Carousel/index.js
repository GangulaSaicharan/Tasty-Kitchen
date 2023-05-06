import './index.css'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Slider from 'react-slick'

class Carousel extends Component {
  state = {
    carouselList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getCarouselApi()
  }

  getCarouselApi = async () => {
    this.setState({isLoading: true})
    const accessToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      'https://apis.ccbp.in/restaurants-list/offers',
      options,
    )
    const data = await response.json()

    const updatedCarouselList = data.offers.map(each => ({
      imageUrl: each.image_url,
    }))
    this.setState({carouselList: updatedCarouselList, isLoading: false})
  }

  renderCarouselItems = () => {
    const {carouselList} = this.state
    console.log(carouselList)
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    }
    return (
      <ul className="slider-container carouselList-container">
        <Slider {...settings} className="carousel">
          {carouselList.map(each => (
            <li key={each.imageUrl}>
              <img className="carousel-image" src={each.imageUrl} alt="offer" />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  renderLoader = () => (
    <div
      data-testid="restaurants-offers-loader"
      className="restaurants-offers-loader"
    >
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderCarouselItems()
  }
}

export default Carousel
