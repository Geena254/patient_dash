import React from 'react'
import RegisterForm from '../pages/components/RegisterForm'
import Navigation from '../pages/components/Navigation'

export default function RegisterPage() {
  return (
    <div className="container mx-auto mt-10">
      <Navigation />
      <h1 className="text-2xl font-bold mb-5">Patient Registration</h1>
      <RegisterForm />
    </div>
  )
}