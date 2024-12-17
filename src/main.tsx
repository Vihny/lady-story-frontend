import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'
import ToastNotification from './components/toast/toast.tsx'
import { queryClient } from './lib/react-query.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastNotification />
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
