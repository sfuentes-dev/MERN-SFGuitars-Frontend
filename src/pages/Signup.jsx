import { useState } from 'react'
import { Button, Col, Container, Form, Row, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSignupMutation } from '../services/appApi'

import './styles/Signup.css'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signup, { error, isLoading, isError }] = useSignupMutation()

  const handleSignup = (e) => {
    e.preventDefault()
    signup({ name, email, password })
  }

  return (
    <>
      <Container>
        <Row>
          <Col md={6} className='signup__form--container'>
            <Form style={{ width: '100%' }} onSubmit={handleSignup}>
              s<h1>Create your account</h1>
              {isError && <Alert variant='danger'>{error.data}</Alert>}
              <Form.Group className='mb-3'>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter your Name'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
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
              <Form.Group>
                <Button type='submit' disabled={isLoading}>
                  Create Account
                </Button>
              </Form.Group>
            </Form>

            <p className='pt-3 text-center'>
              Already have an account? <Link to='/login'>Login</Link>{' '}
            </p>
          </Col>

          <Col md={6} className='signup__image--container'></Col>
        </Row>
      </Container>
    </>
  )
}

export default Signup
