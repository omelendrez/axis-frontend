import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import {
  UserProvider,
  NetworkProvider,
  PageProvider,
  PendingTasksProvider,
  TrainingProvider
} from '@/context'

import store from './store'
import { ThemeProvider } from '@/context'
import { Loading } from '@/components'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <ThemeProvider>
            <UserProvider>
              <NetworkProvider>
                <TrainingProvider>
                  <PageProvider>
                    <PendingTasksProvider>
                      <App />
                    </PendingTasksProvider>
                  </PageProvider>
                </TrainingProvider>
              </NetworkProvider>
            </UserProvider>
          </ThemeProvider>
        </BrowserRouter>
      </Suspense>
    </Provider>
  </React.StrictMode>
)
