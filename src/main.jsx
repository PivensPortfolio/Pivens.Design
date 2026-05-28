import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContractPage from './ContractPage.jsx'
import InvoicePage from './InvoicePage.jsx'
import InvoiceView from './InvoiceView.jsx'

const path = window.location.pathname

function Root() {
  if (path === '/contract') return <ContractPage />
  if (path === '/invoice') return <InvoicePage />
  if (path.startsWith('/invoice/')) return <InvoiceView />
  return <App />
}

createRoot(document.getElementById('root')).render(<Root />)
