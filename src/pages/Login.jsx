import { useState } from 'react'
import { Button, Col, Container, Form, Row, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useLoginMutation } from '../services/appApi'

import './styles/Signup.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isError, isLoading, error }] = useLoginMutation()

  const handleLogin = (e) => {
    e.preventDefault()
    login({ email, password })
  }

  return (
    <>
      <Container>
        <Row>
          <Col md={6} className='login__form--container'>
            <Form style={{ width: '100%' }} onSubmit={handleLogin}>
              <h1 className='mb-5'>Login to your account</h1>
              {isError && <Alert variant='danger'>{error.data}</Alert>}
              <Form.Group className='mb-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter your Email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter your Password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Button variant='danger' type='submit' disabled={isLoading}>
                  Login
                </Button>
              </Form.Group>
            </Form>

            <p className='pt-3 text-center fw-bold text-black'>
              Don't have an account?{' '}
              <Link className='ms-2 btn btn-outline-danger' to='/signup'>
                Create Account
              </Link>{' '}
            </p>
          </Col>

          <Col md={6} className='login__image--container'></Col>
        </Row>
      </Container>
    </>
  )
}

export default Login
