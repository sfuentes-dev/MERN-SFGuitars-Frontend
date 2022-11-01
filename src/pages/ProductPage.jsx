import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import {
  Container,
  Row,
  Col,
  Badge,
  ButtonGroup,
  Form,
  Button,
} from 'react-bootstrap'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

import axios from '../axios.js'
import Loading from '../components/Loading.jsx'
import SimilarProduct from '../components/SimilarProduct.jsx'

import './styles/ProductPage.css'
import { LinkContainer } from 'react-router-bootstrap'

import { useAddToCartMutation } from '../services/appApi.js'
import ToastMessage from '../components/ToastMessage.jsx'

const ProductPage = () => {
  const [product, setProduct] = useState(null)
  const [similar, setSimilar] = useState(null)
  const [addToCart, { isSuccess }] = useAddToCartMutation()
  const { id } = useParams()
  const user = useSelector((state) => state.user)

  const handleDragStart = (e) => e.preventDefault()

  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct(data.product)
      setSimilar(data.similar)
    })
  }, [id])

  if (!product) {
    return <Loading />
  }

  const responsive = {
    0: { items: 1 },
    569: { items: 2 },
    1024: { items: 3 },
  }

  const images = product.pictures.map((pictures) => (
    <img
      className='product__carousel--image'
      src={pictures.url}
      onDragStart={handleDragStart}
    />
  ))

  let similarProducts = []

  if (similar) {
    similarProducts = similar.map((product, index) => (
      <div className='item' key={index} data-value={index}>
        <SimilarProduct {...product} />
      </div>
    ))
  }

  return (
    <Container className='pt-4' style={{ position: 'relative' }}>
      <Row>
        <Col lg={6}>
          <AliceCarousel
            mouseTracking
            items={images}
            controlsStrategy='alternate'
          />
        </Col>
        <Col lg={6} className='pt-2'>
          <h1>{product.name}</h1>
          <p>
            <Badge bg='primary'>{product.brand}</Badge>
          </p>
          <p className='product__price'>${product.price}</p>
          <p style={{ textAlign: 'justify' }} className='py-3'>
            <strong>Description: </strong>
            {product.description}
          </p>

          {user && !user.isAdmin && (
            <ButtonGroup style={{ width: '90%' }}>
              <Form.Select
                size='lg'
                style={{ width: '40%', borderRadius: '0' }}
              >
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </Form.Select>
              <Button
                size='lg'
                onClick={() =>
                  addToCart({
                    userId: user._id,
                    productId: id,
                    price: product.price,
                    image: product.pictures[0].url,
                  })
                }
              >
                Add to Cart
              </Button>
            </ButtonGroup>
          )}
          {user && user.isAdmin && (
            <LinkContainer to={`/product/${product._id}/edit`}>
              <Button size='lg'>Edit Product</Button>
            </LinkContainer>
          )}
          {isSuccess && (
            <ToastMessage
              bg='info'
              title='Added to Cart'
              body={`${product.name} is in your cart`}
            />
          )}
        </Col>
      </Row>

      <div className='my-4'>
        <h2>Similar Products</h2>
        <div className='d-flex justify-content-center align-items-center flex-wrap'>
          <AliceCarousel
            mouseTracking
            items={similarProducts}
            responsive={responsive}
            controlsStrategy='alternate'
          />
        </div>
      </div>
    </Container>
  )
}

export default ProductPage
