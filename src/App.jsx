import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Home from './pages/Home'
import ScrollToTop from './components/ScrollToTop'
import Navigation from './components/Navigation'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import NewProduct from './pages/NewProduct'
import ProductPage from './pages/ProductPage'
import BrandPage from './pages/BrandPage'
import CartPage from './pages/CartPage'

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'

function App() {
  const user = useSelector((state) => state.user)

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
            </>
          )}

          <Route path='/new-product' element={<NewProduct />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/brand/:brand' element={<BrandPage />} />

          <Route path='*' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
