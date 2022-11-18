import { useRef, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

import { LinkContainer } from 'react-router-bootstrap'

import { logout, resetNotifications } from '../features/userSlice.js'

import axios from '../axios.js'

import './Navigation.css'

import logo from '../assets/logo.png'

const Navigation = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const bellRef = useRef(null)
  const notificationRef = useRef(null)
  const [bellPos, setBellPos] = useState({})

  const handleLogout = () => {
    dispatch(logout())
  }

  const unreadNotifications = user?.notifications?.reduce((acc, current) => {
    if (current.status == 'unread') return acc + 1
    return acc
  }, 0)

  const handleToggleNotifications = () => {
    const position = bellRef.current.getBoundingClientRect()
    setBellPos(position)
    notificationRef.current.style.display =
      notificationRef.current.style.display === 'block' ? 'none' : 'block'
    dispatch(resetNotifications())
    if (unreadNotifications > 0) {
      axios.post(`/users/${user._id}/updateNotifications`)
    }
  }

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>
            <img
              src={logo}
              alt='SF Guitars Logo'
              style={{ width: 35, marginRight: 10 }}
            />
            SF Guitars
          </Navbar.Brand>
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
              <>
                <Nav.Link
                  style={{ position: 'relative' }}
                  onClick={handleToggleNotifications}
                >
                  <i
                    className='fas fa-bell'
                    ref={bellRef}
                    data-count={unreadNotifications || null}
                  ></i>
                </Nav.Link>

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
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      <div
        className='notifications-container'
        ref={notificationRef}
        style={{
          position: 'absolute',
          top: 46,
          left: bellPos.left,
          display: 'none',
        }}
      >
        {user?.notifications.length > 0 ? (
          user?.notifications.map((notification) => (
            <p className={`notification-${notification.status}`}>
              {notification.message}
              <br />
              <span>
                {notification.time.split('T')[0] +
                  ' ' +
                  notification.time.split('T')[1]}
              </span>
            </p>
          ))
        ) : (
          <p>No notifcations yet</p>
        )}
      </div>
    </Navbar>
  )
}

export default Navigation
