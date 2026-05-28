import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContractPage from './ContractPage.jsx'

const path = window.location.pathname

createRoot(document.getElementById('root')).render(
  path === '/contract' ? <ContractPage /> : <App />
)
