import { useState, useEffect } from 'react'
import axios from 'axios'
import { baseApiUrl, userKey } from '../global'
import { useDispatch } from 'react-redux'
import { setAuth } from '../store/slices/userSlice'

export default function useValidateToken() {
  const [validatingToken, setValidatingToken] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    async function validateToken() {
      setValidatingToken(true)

      const json = localStorage.getItem(userKey)
      const userData = JSON.parse(json)
      dispatch(setAuth(null))

      if (!userData) {
        setValidatingToken(false)
        return
      }

      const res = await axios.post(`${baseApiUrl}/validateToken`, userData)
      if (res.data) {
        dispatch(setAuth(userData))
      } else {
        localStorage.removeItem(userKey)
      }

      setValidatingToken(false)
    }
    validateToken()
  }, [dispatch])

  return [validatingToken]
}
