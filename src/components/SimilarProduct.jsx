import { Badge, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const SimilarProduct = ({ _id, name, brand, pictures }) => {
  return (
    <LinkContainer
      to={`/product/${_id}`}
      style={{ cursor: 'pointer', width: '13rem', margin: '10px' }}
    >
      <Card style={{ width: '20rem', margin: '10px' }}>
        <Card.Img
          variant='top'
          className='product-previe-img'
          src={pictures[0].url}
          style={{ height: '150px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Badge bg='warning' text='dark'>
            {brand}
          </Badge>
        </Card.Body>
      </Card>
    </LinkContainer>
  )
}

export default SimilarProduct
