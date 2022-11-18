import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://localhost:4000',
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
})

export default instance
