import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/slices/authSlice'
import { loginUser } from '../utils/api'
import { AppDispatch } from '../redux/store'

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const user= await loginUser(formData)
      dispatch(setUser(user))
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
      if (error instanceof Error) {
        try {
          const errorData = JSON.parse(error.message)
          setErrors(errorData)
        } catch {
          setErrors({ form: error.message || 'Login failed. Please try again.' })
        }
      } else {
        setErrors({ form: 'An unexpected error occurred. Please try again.' })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
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
          required
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>
      {errors.form && <p className="text-red-500">{errors.form}</p>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Login
      </button>
    </form>
  )
}