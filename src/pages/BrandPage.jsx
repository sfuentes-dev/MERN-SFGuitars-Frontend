import { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from '../axios.js'
import Loading from '../components/Loading'
import ProductPreview from '../components/ProductPreview'

import './styles/BrandPage.css'

const BrandPage = () => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const { brand } = useParams()

  useEffect(() => {
    setLoading(false)
    axios
      .get(`/products/brand/${brand}`)
      .then(({ data }) => {
        setLoading(false)
        setProducts(data)
      })
      .catch((e) => {
        setLoading(false)
        console.log(e.message)
      })
  }, [brand])

  if (loading) {
    return <Loading />
  }

  const productsSearch = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  console.log(brand.charAt(0).toUpperCase() + brand.slice(1))

  return (
    <div className='brand-page-container mb-5'>
      <div className={`pt-3 ${brand}-banner-container brand-banner-container`}>
        <h1 className='text-center fw-normal'>
          Looking for something special?{' '}
          <span className='text-danger fw-bold'>
            Browse our guitar catalogue
          </span>
        </h1>
      </div>

      <div className='filters-container d-flex justify-content-center pt-4 pb-4'>
        <input
          type='search'
          placeholder='Search the name of your guitar'
          onChange={(e) => setSearchTerm(e.target.value)}
          className='form-control w-50'
        />
      </div>

      {productsSearch.length === 0 ? (
        <h1>No products to show!</h1>
      ) : (
        <Container>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <div className='d-flex justify-content-center align-items-center flex-wrap gap-5'>
                {productsSearch.map((product, index) => (
                  <ProductPreview key={index} {...product} />
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  )
}

export default BrandPage
