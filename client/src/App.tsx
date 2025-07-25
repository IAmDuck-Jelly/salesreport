import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './components/auth/LoginPage'
import ChatPage from './components/chat/ChatPage'
import { AuthProvider } from './context/AuthContext'
import { ChatProvider } from './context/ChatContext'
import { FormProvider } from './context/FormContext'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading (e.g., checking auth status)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <AuthProvider>
      <ChatProvider>
        <FormProvider>
          <div className="app">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/chat" 
                element={
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </FormProvider>
      </ChatProvider>
    </AuthProvider>
  )
}

export default App