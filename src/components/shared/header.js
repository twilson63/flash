import React from 'react'

import { AppBar, Toolbar, Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
export default () => (
  <AppBar position="sticky">
    <Toolbar>
      <Typography style={{ flex: 'auto' }} color="inherit" variant="title">
        Flash
      </Typography>
      <Button to="/cards/new" component={Link} color="inherit">
        new
      </Button>
    </Toolbar>
  </AppBar>
)
