import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Home from './pages/Home'
import ScrollToTop from './components/ScrollToTop'
import Navigation from './components/Navigation'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import NewProduct from './pages/NewProduct'
import ProductPage from './pages/ProductPage'
import BrandPage from './pages/BrandPage'
import CartPage from './pages/CartPage'
import OrderPage from './pages/OrderPage'
import AdminDashboard from './pages/AdminDashboard'
import EditProductPage from './pages/EditProductPage'
import { addNotification } from './features/userSlice.js'

import { io } from 'socket.io-client'

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'
import Footer from './components/Footer'

function App() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const socket = io('ws://localhost:4000')
    socket.off('notification').on('notification', (msgObj, user_id) => {
      // logic for notification
      if (user_id === user._id) {
        dispatch(addNotification(msgObj))
      }
    })

    socket.off('new-order').on('new-order', (msgObj) => {
      if (user.isAdmin) {
        dispatch(addNotification(msgObj))
      }
    })
  }, [])

  return (
    <div className='App'>
      <BrowserRouter>
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route index element={<Home />} />

          {!user && (
            <>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </>
          )}

          {user && (
            <>
              <Route path='/cart' element={<CartPage />} />
              <Route path='/orders' element={<OrderPage />} />
            </>
          )}

          {user && user.isAdmin && (
            <>
              <Route path='/admin' element={<AdminDashboard />} />
              <Route path='/product/:id/edit' element={<EditProductPage />} />
            </>
          )}

          <Route path='/new-product' element={<NewProduct />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/brand/:brand' element={<BrandPage />} />

          <Route path='*' element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
