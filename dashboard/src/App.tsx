import { FrappeProvider } from 'frappe-react-sdk'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserProvider } from './utils/auth/UserProvider'
import { ProtectedRoute } from './utils/auth/ProtectedRoute'
import { SignUp } from './pages/features/auth/SignUp'

function App() {

  return (
    <div className="App">
      <FrappeProvider url={'https://localhost:8000' ?? ''}>
        <BrowserRouter >
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
