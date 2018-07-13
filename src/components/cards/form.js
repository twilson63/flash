import React from 'react'
import Component from '@reactions/component'
import {
  TextField,
  Button,
  Typography,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import { merge } from 'ramda'
import { put } from '../../lib/cards'

const emptyCard = {
  term: '',
  definition: '',
  subject: ''
}

const Form = ({ classes }) => <div>TODO Create Form</div>

const styles = {
  title: {
    marginTop: 32
  },
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 16px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  buttons: {
    marginTop: 32
  }
}

export default withStyles(styles)(Form)
