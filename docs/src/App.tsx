import { FrappeProvider } from 'frappe-react-sdk'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PageNotFound from './components/common/PageNotFound/PageNotFound'
import DocsLandingPage from './pages/features/LandingPage/DocsLandingPage'
import DocsPage from './pages/features/docs/DocsPage'
import PageContent from './pages/features/docs/PageContent'
import ViewDocs from './pages/features/docs/ViewDocs'


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
				<Routes>
					<Route path="/" index element={<DocsLandingPage />} />
					<Route path='/:ID' element={<ViewDocs />} >
						<Route index element={<DocsPage />} />
						<Route path=':pageID' element={<PageContent />} />
					</Route>
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</FrappeProvider>
	)
}

export default App
