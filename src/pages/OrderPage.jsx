import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axio from '../axios.js'

import { Badge, Button, Container, Table } from 'react-bootstrap'
import Loading from '../components/Loading.jsx'

const OrderPage = () => {
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState([])
  const [orderToShow, setOrderToShow] = useState([])
  const [show, setShow] = useState(false)

  const products = useSelector((state) => state.products)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    setLoading(true)
    axio
      .get(`/users/${user._id}/orders`)
      .then(({ data }) => {
        setLoading(false)
        setOrders(data)
      })
      .catch((e) => {
        setLoading(false)
        console.log(e)
      })
  }, [])

  if (loading) {
    return <Loading />
  }

  if (orders.length === 0) {
    return <h1 className='text-center pt-3'>No Orders Yet!</h1>
  }

  return (
    <Container>
      <h1 className='text-center'>Your Orders</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <td>{order._id}</td>
              <td>
                <Badge
                  bg={`${order.status == 'processing' ? 'warning' : 'success'}`}
                  text='white'
                >
                  {order.status}
                </Badge>
              </td>
              <td>{order.date}</td>

              <td>${order.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default OrderPage
