import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

import './ProductPreview.css'

const ProductPreview = ({ _id, brand, name, pictures, price }) => {
  return (
    <LinkContainer
      to={`/product/${_id}`}
      style={{
        cursor: 'pointer',
      }}
    >
      <div className='product-box round bg-white shadow-lg'>
        <div className='product-inner-box position-relative'>
          <img
            src={pictures[0].url}
            alt='Guitar'
            className='img-thubnail thumbnail'
          />

          <div className='product-info'>
            <div className='product-name'>
              <h3>{name}</h3>
            </div>
            <div className='product-brand text-danger'>
              <h3>{brand}</h3>
            </div>
            <div className='product-price'>
              $ <span>{price}</span>
            </div>
          </div>
        </div>
      </div>
    </LinkContainer>
  )
}

export default ProductPreview
