import React from 'react'
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Patient Management
        </Link>
        <div className="space-x-4">
          <Link href="/register" className="hover:text-gray-300">
            Register
          </Link>
          <Link href="/login" className="hover:text-gray-300">
            Login
          </Link>
          <Link href="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  )
}