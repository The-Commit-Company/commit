import { FrappeProvider } from 'frappe-react-sdk'
import { Graph } from './pages/features/erd/Graph'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {

  return (
    <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT ?? undefined}>
      <BrowserRouter>
        {/* <UserProvider> */}
        <Routes>
          {/** Public Routes */}
          {/* <Route path="/sign-up" element={<SignUp />} /> */}

          {/** Private Routes */}
          {/* <Route path="/" element={<ProtectedRoute />} /> */}
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/graph" element={<Graph />} />
        </Routes>
        {/* </UserProvider> */}
      </BrowserRouter>
    </FrappeProvider>
  )
}

export default App
