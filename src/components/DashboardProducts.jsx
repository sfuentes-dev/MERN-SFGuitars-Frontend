import { Button, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDeleteProductMutation } from '../services/appApi'

import './DashboardProducts.css'

const DashboardProducts = () => {
  const products = useSelector((state) => state.products)
  const user = useSelector((state) => state.user)

  //Funcoion para remover products
  const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation()
  const handleDeleteProducts = (id) => {
    if (window.confirm('Are you sure?')) {
      deleteProduct({ product_id: id, user_id: user._id })
    }
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th></th>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Product Price</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>
              <img
                src={product.pictures[0].url}
                className='dashboard-product-preview'
              />
            </td>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
              <Button
                onClick={() => handleDeleteProducts(product._id, user._id)}
                variant='danger'
                className='me-1'
                disabled={isLoading}
              >
                Delete
              </Button>
              <Link
                to={`/product/${product._id}/edit`}
                className='btn btn-warning'
              >
                Edit
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default DashboardProducts
