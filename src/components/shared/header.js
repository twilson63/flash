import React from 'react'

import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Icon
} from '@material-ui/core'
import Home from '@material-ui/icons/Home'
import { Link } from 'react-router-dom'
export default ({ to }) => (
  <AppBar position="sticky">
    <Toolbar>
      <IconButton color="inherit" to="/" component={Link}>
        <Home />
      </IconButton>
      <Typography style={{ flex: 'auto' }} color="inherit" variant="title">
        Flash
      </Typography>
      <Button to={to} component={Link} color="inherit">
        new
      </Button>
    </Toolbar>
  </AppBar>
)
