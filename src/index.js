import 'typeface-roboto'
import React from 'react'
import ReactDOM from 'react-dom'
import Component from '@reactions/component'
import App from './app'

ReactDOM.render(
  <Component initialState={{ count: 0 }}>{App}</Component>,
  document.getElementById('app')
)
