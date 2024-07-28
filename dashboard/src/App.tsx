import { FrappeProvider } from 'frappe-react-sdk'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { APIViewerContainer } from './pages/features/api_viewer/APIViewer'
import { Overview } from './pages/overview/Overview'
import { ERDViewer } from './pages/features/erd/ERDViewer'
import { AppAPIViewerContainer } from './pages/features/api_viewer/AppAPIViewer'
import { CreateERD } from './pages/features/erd/meta/CreateERDForMeta'

function App() {

  const getSiteName = () => {
    // @ts-ignore
    if (window.frappe?.boot?.versions?.frappe && (window.frappe.boot.versions.frappe.startsWith('15') || window.frappe.boot.versions.frappe.startsWith('16'))) {
      // @ts-ignore
      return window.frappe?.boot?.sitename ?? import.meta.env.VITE_SITE_NAME
    }
    return import.meta.env.VITE_SITE_NAME

  }

  return (
    <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT ?? undefined} siteName={getSiteName()}>
      <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
        {/* <UserProvider> */}
        <Routes>
          {/** Public Routes */}
          {/* <Route path="/sign-up" element={<SignUp />} /> */}

          {/** Private Routes */}
          {/* <Route path="/" element={<ProtectedRoute />} /> */}
          {/* default route on '/' */}
          <Route path="/" index element={<Overview />} />
          {/*TODO: Need to Change below route */}
          <Route path='/project-erd' element={<ERDViewer />} />
          <Route path="/project-viewer/:ID" element={<APIViewerContainer />} />
          <Route path="/meta-viewer/:ID" element={<AppAPIViewerContainer />} />
          <Route path='/meta-erd/:ID' element={<ERDViewer />} />
          <Route path='/meta-erd/create' element={<CreateERD />} />
        </Routes>
        {/* </UserProvider> */}
      </BrowserRouter>
    </FrappeProvider>
  )
}

export default App
