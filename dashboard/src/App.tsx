import { FrappeProvider } from 'frappe-react-sdk'
import { CardDemo } from './components/CardDemo'
import { CardComponent } from './components/CardComponent'

function App() {

  return (
    <div className="App">
      <FrappeProvider>
        <div>
          <h1>Commit</h1>
          <CardDemo />
          {/* <CardComponent /> */}
        </div>
      </FrappeProvider>
    </div>
  )
}

export default App
