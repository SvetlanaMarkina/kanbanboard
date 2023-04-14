import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from './components/App/App'
import { storageInitial } from './data'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
storageInitial()
root.render(<App />)


