import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContractPage from './ContractPage.jsx'
import InvoicePage from './InvoicePage.jsx'
import InvoiceView from './InvoiceView.jsx'
import ReviewPage from './ReviewPage.jsx'

const path = window.location.pathname

function Root() {
  if (path === '/contract') return <ContractPage />
  if (path === '/invoice') return <InvoicePage />
  if (path.startsWith('/invoice/')) return <InvoiceView />
  if (path.startsWith('/review/')) return <ReviewPage />
  return <App />
}

createRoot(document.getElementById('root')).render(<Root />)
