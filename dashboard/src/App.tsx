import { FrappeProvider } from 'frappe-react-sdk'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { FullPageLoader } from './components/common/FullPageLoader/FullPageLoader'

const ERDViewer = lazy(async () => import('./pages/features/erd/ERDViewer'))
const Overview = lazy(async () => import('./pages/overview/Overview'))
const APIViewerContainer = lazy(async () => import('./pages/features/api_viewer/APIViewer'))
const AppAPIViewerContainer = lazy(async () => import('./pages/features/api_viewer/AppAPIViewer'))
const CreateERD = lazy(async () => import('./pages/features/erd/meta/CreateERDForMeta'))
const ViewDocs = lazy(async () => import('./pages/features/docs/ViewDocs'))
const PageNotFound = lazy(async () => import('./components/common/PageNotFound/PageNotFound'))
const DocsPage = lazy(async () => import('./pages/features/docs/DocsPage'))
const DocsLandingPage = lazy(async () => import('./pages/features/docs/LandingPage/DocsLandingPage'))
const PageContent = lazy(async () => import('./pages/features/docs/PageContent'))

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
        <Suspense fallback={<FullPageLoader />}>
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
            <Route path='/docs' element={<DocsLandingPage />} />
            <Route path='/docs/:ID' element={<ViewDocs />} >
              <Route index element={<DocsPage />} />
              <Route path=':pageID' element={<PageContent />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Suspense>
        {/* </UserProvider> */}
      </BrowserRouter>
    </FrappeProvider>
  )
}

export default App
