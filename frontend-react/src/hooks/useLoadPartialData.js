import { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios'
import { baseApiUrl } from '../global'

export default function usePartialLoadData(path, initialValue = []) {
  const [data, setData] = useState(initialValue)
  const page = useRef(1)
  const controller = useRef(null)

  const loadData = useCallback(() => {
    const url = `${baseApiUrl}${path}${page.current}`
    controller.current = new AbortController()
    return axios
      .get(url, {
        signal: controller.current.signal,
      })
      .then((res) => {
        setData((data) => data.concat(res.data))
        page.current++
        return res
      })
  }, [path])

  useEffect(() => {
    loadData().catch(() => {})
    return () => {
      controller.current?.abort()
      setData([])
      page.current = 1
    }
  }, [loadData])

  return [data, loadData]
}
