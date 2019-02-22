import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import './index.scss'

const root = document.getElementById('root')

if (root) {
    ReactDOM.render(<App />, root)
} else {
    console.error('Element with id root not found')
}
