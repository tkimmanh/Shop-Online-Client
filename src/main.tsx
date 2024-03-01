import { QueryProvider } from './lib/QueryProvider.tsx'
import { AppProvider } from './context/app.context.tsx'
import { BrowserRouter } from 'react-router-dom'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import React from 'react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
)
