import { FrappeProvider } from 'frappe-react-sdk'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PageNotFound from './components/common/PageNotFound/PageNotFound'
import APIViewerContainer from './pages/features/api_viewer/APIViewer'
import AppAPIViewerContainer from './pages/features/api_viewer/AppAPIViewer'
import ViewDocs from './pages/features/docs/ViewDocs'
import ERDViewer from './pages/features/erd/ERDViewer'
import CreateERD from './pages/features/erd/meta/CreateERDForMeta'
import Overview from './pages/overview/Overview'
import { DocsMainPage } from './components/features/documentation/DocsMainPage'
import { PageTable } from './pages/features/docs/DocsEditor/PageTable'
import { Sidebar } from './components/features/Sidebar/DashboardSidebar'
import { DocsSettings } from './pages/features/docs/Settings/DocsSettings'


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
          <Route path='/docs' element={<Navigate to={'/'} />} />
          <Route path='/docs/:ID' element={<ViewDocs />} >
            <Route index element={<Navigate to={'overview'} />} />
            <Route path='overview' element={<DocsMainPage />} />
            <Route path='editor' element={<PageTable />}>
              {/* Add nested dynamic route inside editor */}
              <Route path=':pageID' element={<PageTable />} />
            </Route>
            <Route path='sidebar' element={<Sidebar />} />
            <Route path='navbar' element={<></>} />
            <Route path='footer' element={<></>} />
            <Route path='settings' element={<DocsSettings />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        {/* </UserProvider> */}
      </BrowserRouter>
    </FrappeProvider>
  )
}

export default App
