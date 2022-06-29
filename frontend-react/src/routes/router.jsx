import React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Home from '../components/home/Home'
import AdminPages from '../components/admin/AdminPages'
import ArticlesByCategory from '../components/article/ArticlesByCategory'
import ArticleById from '../components/article/ArticleById'
import Auth from '../components/auth/Auth'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ isAllowed, redirectPath = '/', children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}

export default function MainRoutes() {
  const user = useSelector((state) => state.user.info)
  return (
    <Routes>
      <Route
        element={<ProtectedRoute isAllowed={!!user} redirectPath={'/auth'} />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/categories/:id/articles"
          element={<ArticlesByCategory />}
        />
        <Route path="/articles/:id" element={<ArticleById />} />
      </Route>
      <Route element={<ProtectedRoute isAllowed={user?.admin} />}>
        <Route path="/admin" element={<AdminPages />} />
      </Route>
      <Route element={<ProtectedRoute isAllowed={!user} />}>
        <Route path="/auth" element={<Auth />} />
      </Route>
    </Routes>
  )
}
