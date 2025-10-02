import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@koobiq/design-tokens/web/css-tokens.css'
import '@koobiq/design-tokens/web/css-tokens-light.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
