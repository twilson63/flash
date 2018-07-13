import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

/**
 *
 * Start Component
 *
 * Initial Page the user sees when opening the application
 *
 * @param {object} props
 */
const Start = ({ classes }) => (
  <main className={classes.main}>
    <Typography variant="display2">Flash</Typography>
    <Typography variant="caption">Time to Learn</Typography>
    <div>
      <Button component={Link} to="/cards">
        Create
      </Button>
    </div>
  </main>
)

const styles = {
  main: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}

Start.propTypes = {
  classes: PropTypes.shape({}).isRequired
}

export default withStyles(styles)(Start)
