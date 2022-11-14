import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import brands from '../brands.js'
import axios from '../axios.js'

import { LinkContainer } from 'react-router-bootstrap'

import './styles/Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateProducts } from '../features/productSlice.js'
import ProductPreview from '../components/ProductPreview'
import { useEffect } from 'react'

const Home = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const lastProducts = products.slice(0, 8)

  useEffect(() => {
    axios.get('/products').then(({ data }) => dispatch(updateProducts(data)))
  }, [])

  return (
    <div>
      <img
        src='https://www.guitarraseguitarristas.com.br/wp-content/uploads/2020/08/Les-Paul-Custom-Ebony-Les-Paul-Special-TV-Yellow-Flying-V-Ebony-Les-Paul-Standard-50sHeritage-Cherry-Sunburst-SG-61-Maestro-Cherry-Firebird-Vin.jpg'
        className='home-banner'
        style={{ width: '100vw' }}
      />
      <div className='featured-products-container container mt-4'>
        <h2>Last Products</h2>

        <div className='d-flex justify-content-center flex-wrap'>
          {lastProducts.map((product, index) => (
            <ProductPreview {...product} key={index} />
          ))}
        </div>

        <div>
          <Link
            to='/brand/all'
            style={{
              textAlign: 'right',
              display: 'block',
              textDecoration: 'none',
            }}
          >
            Se more {'>>'}
          </Link>
        </div>
      </div>

      <div className='sale_banner--container mt-4'>
        <img
          src='https://media.4rgos.it/i/Argos/0120-M020-PLP-8474449-guitars-desktab?qlt=75&fmt.jpeg.interlaced=true'
          style={{ width: '100vw' }}
        />
      </div>

      <div className='recent-products-container container mt-4'>
        <h2>Brands</h2>
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
