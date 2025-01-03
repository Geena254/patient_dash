import React, { Suspense } from 'react'
import PatientDashboard from '../pages/components/PatientDashboard'
import Loading from './loading'
import Navigation from '../pages/components/Navigation'

export default function DashboardPage() {
  return (
    <div className="container mx-auto mt-10">
      <Navigation />
      <h1 className="text-2xl font-bold mb-5">Patient Dashboard</h1>
      <Suspense fallback={<Loading />}>
        <PatientDashboard />
      </Suspense>
    </div>
  )
}