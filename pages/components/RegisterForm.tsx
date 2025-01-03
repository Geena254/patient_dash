import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/slices/authSlice'
import { registerUser } from '../utils/api'
import { AppDispatch } from '../redux/store'

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    phone: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors(prev => ({ ...prev, [e.target.name]: '', form: '' }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.username) newErrors.username = 'Username is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    if (formData.password !== formData.password2) newErrors.password2 = 'Passwords do not match'
    if (!formData.first_name) newErrors.first_name = 'First name is required'
    if (!formData.last_name) newErrors.last_name = 'Last name is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
      try {
        const user = await registerUser(formData)
        dispatch(setUser(user))
        router.push('/dashboard')
      } catch (error) {
        console.error('Registration failed:', error)
        if (error instanceof Error) {
          if (error.message.includes('Unable to connect to the server')) {
            setErrors({ form: error.message })
          } else {
            try {
              const errorData = JSON.parse(error.message)
              if (typeof errorData === 'object' && errorData !== null && Object.keys(errorData).length > 0) {
                setErrors(errorData)
              } else {
                setErrors({ form: 'Registration failed. Please try again.' })
              }
            } catch {
              setErrors({ form: error.message || 'Registration failed. Please try again.' })
            }
          }
        } else {
          setErrors({ form: 'An unexpected error occurred. Please try again.' })
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block mb-1">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block mb-1">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>
      <div>
        <label htmlFor="password2" className="block mb-1">Confirm Password</label>
        <input
          type="password"
          id="password2"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.password2 && <p className="text-red-500 text-sm">{errors.password2}</p>}
      </div>
      <div>
        <label htmlFor="first_name" className="block mb-1">First Name</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
      </div>
      <div>
        <label htmlFor="last_name" className="block mb-1">Last Name</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="block mb-1">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>
      {errors.form && <p className="text-red-500">{errors.form}</p>}
      <button 
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        disabled={isLoading}
      >
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </form>
  )
}