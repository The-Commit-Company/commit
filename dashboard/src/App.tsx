import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserProvider } from './utils/auth/UserProvider'
import { ProtectedRoute } from './utils/auth/ProtectedRoute'
import { SignUp } from './pages/features/auth/SignUp'
import { FrappeProvider } from 'frappe-react-sdk'

function App() {

  return (
    <div className="App">
      <FrappeProvider url={import.meta.env.VITE_FRAPPE_PATH ?? ''} socketPort={import.meta.env.VITE_SOCKET_PORT ?? ''}>
        <BrowserRouter>
          <UserProvider>
            <Routes>
              {/** Public Routes */}
              <Route path="/sign-up" element={<SignUp />} />

              {/** Private Routes */}
              <Route path="/" element={<ProtectedRoute />} />
              <Route path="/dashboard" element={<h1>Dashboard</h1>} />
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </FrappeProvider>
    </div>
  )
}

export default App
