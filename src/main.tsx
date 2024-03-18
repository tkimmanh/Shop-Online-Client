import { AppProvider } from './context/app.context.tsx'
import { BrowserRouter } from 'react-router-dom'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import React from 'react'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SnackbarProvider } from 'notistack'
const queryClient = new QueryClient()
import 'react-quill/dist/quill.snow.css'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </AppProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
