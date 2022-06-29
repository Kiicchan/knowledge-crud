import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { baseApiUrl, showError } from '../global'

export default function useLoadData(path, initialValue = []) {
  const [data, setData] = useState(initialValue)

  const loadData = useCallback(() => {
    const url = `${baseApiUrl}${path}`
    return axios.get(url).then((res) => setData(res.data))
  }, [path])

  useEffect(() => {
    loadData().catch(showError)
  }, [loadData])

  return [data, loadData]
}
