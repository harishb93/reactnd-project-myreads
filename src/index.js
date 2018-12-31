import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from './App'
import './index.css'
import {BrowserRouter} from 'react-router-dom';

const options = {
  position: 'top center',
  timeout: 3000,
  offset: '50px',
  transition: 'fade'
}

ReactDOM.render(
  <BrowserRouter>
    <AlertProvider template={AlertTemplate} {...options}>
        <App />
    </AlertProvider>
  </BrowserRouter>, document.getElementById('root'))
