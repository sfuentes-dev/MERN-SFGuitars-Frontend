import { Link } from 'react-router-dom'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import './footer.css'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg='4'>
            <div>
              <h2 className='text-white'>SF Guitars</h2>
            </div>
            <p className='footer__text mt-4'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              quas nisi excepturi fuga sapiente ex quae explicabo natus
              similique iure?
            </p>
          </Col>
          <Col lg='3'>
            <div className='footer__quick-links'>
              <h4 className='quick__links-title'>Top Brands</h4>
              <ListGroup>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Gibson Guitars</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Fender Guitars</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>PRS Guitars</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>ESP Guitars</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg='2'>
            <div className='footer__quick-links'>
              <h4 className='quick__links-title'>Useful Links</h4>
              <ListGroup>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Shop</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Cart</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Login</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg='3'>
            <div className='footer__quick-links'>
              <h4 className='quick__links-title'>Contact</h4>
              <ListGroup>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2 justify-content-center text-white'>
                  <span>
                    <i className='ri-map-pin-line'></i>
                  </span>
                  <p>123 Bogotam, Colombia</p>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2 justify-content-center text-white'>
                  <span>
                    <i className='ri-phone-line'></i>
                  </span>
                  <p>+57 312 234 5678</p>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2 justify-content-center text-white'>
                  <span>
                    <i className='ri-mail-line'></i>
                  </span>
                  <p>sfguitars@info.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg='12'>
            <p className='footer__copyright'>
              &copy; Copyright {year} developed by Sebastian Fuentes. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
