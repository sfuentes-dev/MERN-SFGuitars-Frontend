import { Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import brands from '../brands.js'
import axios from '../axios.js'

import { LinkContainer } from 'react-router-bootstrap'

import './styles/Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateProducts } from '../features/productSlice.js'
import ProductPreview from '../components/ProductPreview'
import { Clock } from '../components/Clock.jsx'
import { Hero } from '../components/Hero.jsx'

import hetfield from '../assets/images/hetfield.png'

const Home = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const lastProducts = products.slice(0, 8)

  useEffect(() => {
    axios.get('/products').then(({ data }) => dispatch(updateProducts(data)))
  }, [])

  return (
    <div>
      <Hero />

      <div className='featured-products-container container mt-5 mb-5'>
        <h2 className='fw-bold'>What's New</h2>

        <div className='d-flex justify-content-center flex-wrap gap-5 mt-5'>
          {lastProducts.map((product, index) => (
            <ProductPreview {...product} key={index} />
          ))}
        </div>

        <div>
          <Link
            to='/brand/all'
            style={{
              textAlign: 'right',
              textDecoration: 'none',
              marginTop: 50,
            }}
            className='btn btn-danger text-uppercase fw-bold'
          >
            See more {'>>'}
          </Link>
        </div>
      </div>

      <section className='timer__count'>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className='clock__top-content' style={{ marginTop: 50 }}>
                <h4 className='text-white fs-5 mb-2'>Limited Offer</h4>
                <h3 className='text-white fs-3 mb-3'>ESP SnakeByte</h3>
              </div>
              <Clock />
              <button type='button' className='btn btn-danger mt-5'>
                <Link to='/brand/all'>Visit Store</Link>
              </button>
            </Col>
            <Col lg='6' md='6' className='text-end'>
              <img
                src={hetfield}
                alt='James Hetfield ESP Explorer'
                style={{ objectFit: 'contain', width: 750, marginTop: 40 }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <div className='recent-products-container container mt-5 mb-5'>
        <h2 className='fw-bold'>Brands</h2>
        <Row>
          {brands.map((brand, index) => (
            <LinkContainer
              to={`/brand/${brand.name.toLocaleLowerCase()}`}
              key={index}
            >
              <Col>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${brand.img})`,
                    gap: '10px',
                  }}
                  className='category-tile'
                >
                  {brand.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default Home
