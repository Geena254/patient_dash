import React from 'react'
import LoginForm from '../pages/components/LoginForm'
import Navigation from '../pages/components/Navigation'

export default function LoginPage() {
  return (
    <div className="container mx-auto mt-10">
      <Navigation />
      <h1 className="text-2xl font-bold mb-5">Patient Login</h1>
      <LoginForm />
    </div>
  )
}