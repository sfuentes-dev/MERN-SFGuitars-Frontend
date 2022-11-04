import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdateProductMutation } from '../services/appApi'

import { Container, Row, Col, Alert, Button, Form } from 'react-bootstrap'
import axios from '../axios.js'
import { useEffect } from 'react'

const EditProductPage = () => {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [price, setPrice] = useState('')
  const [images, setImages] = useState([])
  const [imgToRemove, setImgToRemove] = useState(null)
  const [updateProduct, { isError, error, isLoading, isSuccess }] =
    useUpdateProductMutation()

  const navigate = useNavigate()

  const handleRemoveImg = (imgObj) => {
    setImgToRemove(imgObj.public_id)
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImgToRemove(null)
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        )
      })
      .catch((e) => console.log(e))
  }

  const showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'sfuentes-dev16',
        uploadPreset: 'rbl7fndi',
      },
      (error, result) => {
        if (!error && result.event === 'success') {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ])
        }
      }
    )
    widget.open()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !description || !price || !brand || !images.length) {
      return alert('Please fill out all the fields')
    }
    updateProduct({ id, name, description, price, brand, images }).then(
      ({ data }) => {
        if (data.length > 0) {
          setTimeout(() => {
            navigate('/')
          }, 1500)
        }
      }
    )
  }

  useEffect(() => {
    axios
      .get('/products/' + id)
      .then(({ data }) => {
        const product = data.product
        setName(product.name)
        setDescription(product.description)
        setBrand(product.brand)
        setImages(product.pictures)
        setPrice(product.price)
      })
      .catch((e) => console.log(e))
  }, [id])

  return (
    <Container>
      <Row>
        <Col md={6} className='new-product__form--container'>
          <Form
            className='mt-5'
            style={{ width: '100%' }}
            onSubmit={handleSubmit}
          >
            <h1>Edit Product</h1>
            {isSuccess && <Alert variant='success'>Product Updated!</Alert>}
            {isError && <Alert variant='danger'>{error.data}</Alert>}
            <Form.Group className='mb-3'>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your Product Name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Product Description'
                style={{ height: '100px' }}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Product Price'
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className='mb-3'
              onChange={(e) => setBrand(e.target.value)}
            >
              <Form.Label>Brand</Form.Label>
              <Form.Select>
                <option disabled>-- Select One --</option>
                <option value='gibson'>Gibson</option>
                <option value='fender'>Fender</option>
                <option value='prs'>PRS</option>
                <option value='esp'>ESP</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Button type='button' onClick={showWidget}>
                Upload Images
              </Button>
              <div className='images-preview-container'>
                {images.map((image, index) => (
                  <div key={index} className='image-preview'>
                    <img src={image.url} />
                    {imgToRemove != image.public_id && (
                      <i
                        className='fa fa-times-circle'
                        onClick={() => handleRemoveImg(image)}
                      ></i>
                    )}
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Button type='submit' disabled={isLoading || isSuccess}>
                Update Product
              </Button>
            </Form.Group>
          </Form>
        </Col>

        <Col md={6} className='new-product__image--container'></Col>
      </Row>
    </Container>
  )
}

export default EditProductPage
