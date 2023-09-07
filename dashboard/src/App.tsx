import { FrappeProvider } from 'frappe-react-sdk'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { APIViewerContainer } from './pages/features/api_viewer/APIViewer'
import { Overview } from './pages/overview/Overview'
import { ERDViewer } from './pages/features/erd/ERDViewer'

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
          {/*TODO: Need to Change below route */}
          <Route path='erd/:ID' element={<ERDViewer />} />
          <Route path="/viewer/:ID" element={<APIViewerContainer />} />
        </Routes>
        {/* </UserProvider> */}
      </BrowserRouter>
    </FrappeProvider>
  )
}

export default App
