import './App.css'
import { FrappeProvider } from 'frappe-react-sdk'
function App() {

  return (
    <div className="App">
      <FrappeProvider>
        <div>
          <h1>Commit</h1>
        </div>
      </FrappeProvider>
    </div>
  )
}

export default App
