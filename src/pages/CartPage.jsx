import { Alert, Col, Container, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import {
  useIncreseCartProductMutation,
  useDecreaseCartProductMutation,
  useRemoveFromCartMutation,
} from '../services/appApi.js'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(
  'pk_test_51LzMxFEBa3jZyODKhAkxgLIUljWfDVLWJNBZmosNI0omFbg6nDAJ5XDP0KICh2QomjH8EgTSBdbBlnjxSHb8SH6y00VKp6Ieef'
)

import './styles/CartPage.css'
import CheckoutForm from '../components/CheckoutForm.jsx'

const CartPage = () => {
  const user = useSelector((state) => state.user)
  const products = useSelector((state) => state.products)
  const userCartObj = user.cart

  let cart = products.filter((product) => userCartObj[product._id] != null)
  const [increseCart] = useIncreseCartProductMutation()
  const [decreaeCart] = useDecreaseCartProductMutation()
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation()

  const handleDecrease = (product) => {
    const quantity = user.cart.count
    if (quantity <= 0) {
      return alert("Can't Proceed with that Action")
    }
    decreaeCart(product)
  }

  return (
    <Container style={{ minHeight: '95vh' }} className='cart-container mt-5'>
      <Row>
        <Col>
          <h1 className='pt-2 h3'>Shopping Cart</h1>
          {cart.length == 0 ? (
            <Alert variant='info'>
              Shopping cart is empty. Add products to your Cart
            </Alert>
          ) : (
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </Col>
        {cart.length > 0 && (
          <Col md={5}>
            <>
              <Table responsive='sm' className='cart-table'>
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td>&nbsp;</td>
                      <td>
                        {!isLoading && (
                          <i
                            className='fa-solid fa-trash'
                            style={{
                              marginRight: 10,

                              cursor: 'pointer',
                            }}
                            onClick={() =>
                              removeFromCart({
                                productId: item._id,
                                price: item.price,
                                userId: user._id,
                              })
                            }
                          ></i>
                        )}

                        <img
                          src={item.pictures[0].url}
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: 'cover',
                          }}
                        />
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <span className='quantity-indicator'>
                          <i
                            className='fa fa-minus-circle'
                            onClick={() =>
                              handleDecrease({
                                productId: item._id,
                                price: item.price,
                                userId: user._id,
                              })
                            }
                          ></i>
                          <span>{user.cart[item._id]}</span>
                          <i
                            className='fa fa-plus-circle'
                            onClick={() =>
                              increseCart({
                                productId: item._id,
                                price: item.price,
                                userId: user._id,
                              })
                            }
                          ></i>
                        </span>
                      </td>
                      <td>${item.price * user.cart[item._id]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div>
                <h3 className='h4 pt-4'>Total: ${user.cart.total}</h3>
              </div>
            </>
          </Col>
        )}
      </Row>
    </Container>
  )
}

export default CartPage
