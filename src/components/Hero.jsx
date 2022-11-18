import { Link } from 'react-router-dom'
import './HeroSection.css'

export const Hero = () => {
  return (
    <section className='hero d-flex flex-column justify-content-center'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <h3 className='text-start fw-normal text-uppercase mb-4'>
              American Vintage ii
            </h3>
            <h1 className='text-start fw-bold text-uppercase mb-4'>
              Play something Different
            </h1>
            <p className='text-start mb-2 text-dark'>
              Build to the original specs. All of them
            </p>
            <button className='btn btn-danger d-flex fw-bold text-white text-uppercase'>
              <Link to='/brand/all'>Shop Now!</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
