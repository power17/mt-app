import axios from 'axios'

const instance = axios .create({
  baseURL: `http://${process.env.Host || 'localhost'}: ${process.env.PORT || 3000}`,
  timeout: 1000,
  header: {}
})
