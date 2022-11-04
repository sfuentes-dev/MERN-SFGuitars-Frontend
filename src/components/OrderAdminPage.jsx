import { useState, useEffect } from 'react'
import { Badge, Table, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import axios from '../axios.js'
import Loading from './Loading.jsx'

const OrderAdminPage = () => {
  const [orders, setOrders] = useState([])
  const [orderToShow, setOrderToShow] = useState([])
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)

  const products = useSelector((state) => state.products)

  const markShipped = (orderId, ownerId) => {
    axios
      .patch(`/orders/${orderId}/mark-shipped`, { ownerId })
      .then(({ data }) => setOrders(data))
      .catch((e) => console.log(e))
  }

  const showOrder = (productsObj) => {}

  useEffect(() => {
    setLoading(true)
    axios
      .get('/orders')
      .then(({ data }) => {
        setLoading(false)
        setOrders(data)
      })
      .catch((e) => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <Loading />
  }

  if (orders.length === 0) {
    return <h1 className='text-center pt-4'>No Orders Yet</h1>
  }

  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Client Name</th>
          <th>Items</th>
          <th>Order Total</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.owner?.name}</td>
            <td>{order.count}</td>
            <td>${order.total}</td>
            <td>{order.address}</td>
            <td>
              {order.status === 'processing' ? (
                <Button
                  size='sm'
                  onClick={() => markShipped(order._id, order.owner?._id)}
                >
                  Mark as Shipped
                </Button>
              ) : (
                <Badge bg='success'>Shipped</Badge>
              )}
            </td>
            <td>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => showOrder(products)}
              >
                View Order <i className='fa fa-eye'></i>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default OrderAdminPage
