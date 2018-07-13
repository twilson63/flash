import React from 'react'
import PropTypes from 'prop-types'
import Component from '@reactions/component'
import { withStyles, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { get } from 'lib/subjects'

const [LOADING, READY, ERROR] = ['LOADING', 'READY', 'ERROR']

const Subjects = ({ classes }) => (
  <React.Fragment>
    <Header />
    <Component initialState={{ status: LOADING, subjects: [] }} didMount={get}>
      {({ state, setState }) => {
        if (state.status === LOADING) {
          return <Spinner />
        }
        return <React.Fragment />
      }}
    </Component>
  </React.Fragment>
)

export default Subjects
