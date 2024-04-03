import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import logo from '@/assets/logo.jpg'

import { verifyTrainingRecord } from '@/services'

import './verify.css'

export const Verify = () => {
  const params = useParams()
  const [data, setData] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
    verifyTrainingRecord(params?.id)
      .then((res) => setData(res.data))
      .catch((err) => {
        if (err.response?.status === 404) {
          setError('Certificate not found')
        }
      })
  }, [params])

  return (
    <main className="container">
      <img src={logo} alt="logo" />
      {error && <div className="error">{error}</div>}
      {data.is_valid && (
        <div className="valid-certificate">CERTIFICATE IS VALID!</div>
      )}
      {!data.is_valid && !error && (
        <div className="invalid-certificate">CERTIFICATE IS NOT VALID!</div>
      )}
      <p>
        We can confirm that <span>{data.full_name}</span> received a certificate
        for <span>{data.course}</span> on <span>{data.issued}</span>.
      </p>

      {data.expiry && data.is_valid && (
        <div className="expiry">
          <p>
            The certificate will expire on <span>{data.expiry}</span>.
          </p>
        </div>
      )}
    </main>
  )
}
