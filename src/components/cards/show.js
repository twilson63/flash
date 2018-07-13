import React from 'react'
import Component from '@reactions/component'
import { get } from '../../lib/cards'
import { Typography, withStyles } from '@material-ui/core'

const Show = ({ match, classes }) => <div>Todo Show</div>

const styles = {
  root: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}

export default withStyles(styles)(Show)
