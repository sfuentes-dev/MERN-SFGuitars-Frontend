import axios from '../axios.js'
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import DashboardProducts from '../components/DashboardProducts.jsx'
import OrderAdminPage from '../components/OrderAdminPage.jsx'
import ClientsAdminPage from '../components/ClientsAdminPage.jsx'

const AdminDashboard = () => {
  return (
    <Container className='mt-5'>
      <Tab.Container defaultActiveKey='products'>
        <Row>
          <Col sm={3}>
            <Nav variant='pills' className='flex-column'>
              <Nav.Item>
                <Nav.Link eventKey='products'>Products</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='orders'>Orders</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='clients'>Clients</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey='products'>
                <DashboardProducts />
              </Tab.Pane>
              <Tab.Pane eventKey='orders'>
                <OrderAdminPage />
              </Tab.Pane>
              <Tab.Pane eventKey='clients'>
                <ClientsAdminPage />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  )
}

export default AdminDashboard
