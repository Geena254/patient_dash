import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { RootState } from '../redux/store'
import { setPatientData } from '../redux/slices/patientSlice'
import { fetchPatientData, updatePatientData } from '../utils/api'

export default function PatientDashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const { patientData } = useSelector((state: RootState) => state.patient)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<PatientData | null>(null)

  interface PatientData {
    name: string
    email: string
    phone: string
  }

  useEffect(() => {
    const loadPatientData = async () => {
      if (user) {
        try {
          const data = await fetchPatientData(user.id)
          dispatch(setPatientData(data))
          setFormData(data)
        } catch (error) {
          console.error('Failed to fetch patient data:', error)
        }
      }
    }
    loadPatientData()
  }, [user, dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (!user?.id) return <div>Please log in</div>

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id || !formData) return

    try {
      const updatedData = await updatePatientData(user.id, formData)
      dispatch(setPatientData(updatedData))
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update patient data:', error)
    }
  }

  if (!patientData) return <div>Loading...</div>

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData?.name || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData?.email || ''}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData?.phone || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {patientData.name}</p>
          <p><strong>Email:</strong> {patientData.email}</p>
          <p><strong>Phone:</strong> {patientData.phone}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Information
          </button>
        </div>
      )}
    </div>
  )
}
