import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createTheme, MantineProvider } from '@mantine/core'

import "@mantine/core/styles.css"
import '@mantine/carousel/styles.css';

import { LogtoProvider, type LogtoConfig } from '@logto/react'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router/router.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const theme = createTheme({})
const queryClient = new QueryClient()

const config: LogtoConfig = {
  endpoint: "https://logtoauth.bilalmancer.com/",
  appId: '122nyl6zj1b04mkkc3hbq'
}

createRoot(document.getElementById('root')!).render(
  <LogtoProvider config={config}>
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <StrictMode>
          <RouterProvider router={router}></RouterProvider>
        </StrictMode>
      </QueryClientProvider>
    </MantineProvider>
  </LogtoProvider>
)
