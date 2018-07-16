import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

const Header = () => (
  <AppBar position="sticky">
    <Toolbar>
      <Typography style={{ flex: 'auto' }} color="inherit" variant="title">
        Flash
      </Typography>
      <Button color="inherit">Start</Button>
    </Toolbar>
  </AppBar>
)

export default Header
