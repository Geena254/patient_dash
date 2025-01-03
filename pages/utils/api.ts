import axios, { AxiosError } from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'  // Replace with your Django API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Set a timeout of 10 seconds
})

export const registerUser = async (userData: any) => {
  try {
    const response = await api.post('/register/', userData)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      if (axiosError.response) {
        console.error('Server responded with:', axiosError.response.data)
        throw new Error(JSON.stringify(axiosError.response.data))
      } else if (axiosError.request) {
        console.error('No response received:', axiosError.request)
        throw new Error('Unable to connect to the server. Please check your internet connection and try again.')
      } else {
        console.error('Error setting up request:', axiosError.message)
        throw new Error('An error occurred while setting up the request. Please try again.')
      }
    }
    console.error('Unexpected error:', error)
    throw new Error('An unexpected error occurred. Please try again.')
  }
}

export const loginUser = async (credentials: any) => {
  try {
    const response = await api.post('/login/', credentials)
    const { access } = response.data  // Extract access token
    api.defaults.headers['Authorization'] = `Bearer ${access}`  // Set the Authorization header for future requests
    return {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email
      };

  } catch (error) {
    console.error('Login error:', error)
    if (axios.isAxiosError(error) && !error.response) {
      throw new Error('Unable to connect to the server. Please check your internet connection and try again.')
    }
    throw error
  }
}

export const fetchPatientData = async (userId: number) => {
  try {
    const response = await api.get(`/patients/${userId}/`)
    return response.data
  } catch (error) {
    console.error('Error fetching patient data:', error)
    if (axios.isAxiosError(error) && !error.response) {
      throw new Error('Unable to connect to the server. Please check your internet connection and try again.')
    }
    throw error
  }
}

export const updatePatientData = async (userId: number, updatedData: any) => {
  try {
    const response = await api.put(`/patients/${userId}/`, updatedData)
    return response.data
  } catch (error) {
    console.error('Error updating patient data:', error)
    if (axios.isAxiosError(error) && !error.response) {
      throw new Error('Unable to connect to the server. Please check your internet connection and try again.')
    }
    throw error
  }
}

export default api
