import { useSelector, useDispatch } from 'react-redux'

import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

import { LinkContainer } from 'react-router-bootstrap'

import { logout } from '../features/userSlice'

import './Navigation.css'

const Navigation = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>SF Guitars</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            {/* If user donnt login */}
            {!user && (
              <LinkContainer to='/login'>
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}

            {user && !user.isAdmin && (
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i>
                  {user?.cart.count > 0 && (
                    <span className='badge badge-warning' id='cartcount'>
                      {user.cart.count}
                    </span>
                  )}
                </Nav.Link>
              </LinkContainer>
            )}

            {user && (
              <NavDropdown title={`${user.email}`} id='basic-nav-dropdown'>
                {user.isAdmin && (
                  <>
                    <LinkContainer to='/admin'>
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/new-product'>
                      <NavDropdown.Item>Create Product</NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}

                {!user.isAdmin && (
                  <>
                    <LinkContainer to='/cart'>
                      <NavDropdown.Item>Cart</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/orders'>
                      <NavDropdown.Item>My Orders</NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}

                <NavDropdown.Divider />
                <Button
                  variant='danger'
                  onClick={handleLogout}
                  className='logout-btn'
                >
                  Logout
                </Button>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
