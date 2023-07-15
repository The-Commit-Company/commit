import { FrappeProvider } from 'frappe-react-sdk'

function App() {

  return (
    <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT ?? undefined}>
    </FrappeProvider>
  )
}

export default App
