import Link from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <div className="container mx-auto mt-10 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Patient Management System</h1>
      <div className="space-x-4">
        <Link href="/register" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Register
        </Link>
        <Link href="/login" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Login
        </Link>
      </div>
    </div>
  )
}
