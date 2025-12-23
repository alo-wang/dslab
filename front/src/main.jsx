import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
    <StrictMode>
        {/* StrictMode로 인해 useEffect 내부로직이 2번 실행 */}
      <App />
    </StrictMode>
  </BrowserRouter>
)
