import { lazy } from 'react'
import { Route } from 'react-router-dom'

const Verify = lazy(() => import('@/pages/Verify'))

export const verifyRoutes = (
  <Route exact path="/verify/:id" element={<Verify />} />
)
