import { FrappeProvider } from 'frappe-react-sdk'
import { Graph } from './pages/features/erd/Graph'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { APIViewer } from './pages/features/api_viewer/APIViewer'
import { Overview } from './pages/overview/Overview'

function App() {

  return (
    <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT ?? undefined}>
      <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
        {/* <UserProvider> */}
        <Routes>
          {/** Public Routes */}
          {/* <Route path="/sign-up" element={<SignUp />} /> */}

          {/** Private Routes */}
          {/* <Route path="/" element={<ProtectedRoute />} /> */}
          {/* default route on '/' */}
          <Route path="/" element={<Overview />} />
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/viewer" element={<APIViewer />} />
        </Routes>
        {/* </UserProvider> */}
      </BrowserRouter>
    </FrappeProvider>
  )
}

export default App
