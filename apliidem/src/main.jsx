import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import AppRouter from './router/AppRouter.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <AuthContextProvider>


      <Provider store={store}>
        <AppRouter />
      </Provider>




    </AuthContextProvider>
  </React.StrictMode >,
)
