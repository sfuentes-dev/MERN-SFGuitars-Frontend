import axios from '../axios.js'
import { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import Loading from './Loading'

const ClientsAdminPage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get('/users')
      .then(({ data }) => {
        setLoading(false)
        setUsers(data)
      })
      .catch((e) => {
        setLoading(false)
        console.log(e)
      })
  }, [])

  if (loading) {
    return <Loading />
  }

  if (users?.length === 0) {
    return <h2 className='py-2 text-center'>No users yet!</h2>
  }

  return (
    <>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Client Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default ClientsAdminPage
