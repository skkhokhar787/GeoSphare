import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { CountryProvider } from './context/CountryContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import QueryProvider from './context/QueryProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <QueryProvider>
          <CountryProvider>
            <FavoritesProvider>
              <App />
            </FavoritesProvider>
          </CountryProvider>
        </QueryProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
