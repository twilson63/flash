import React from 'react'
import Component from '@reactions/component'
import { get, remove } from '../../lib/cards'
import { Link } from 'react-router-dom'
import { Typography, withStyles, Button } from '@material-ui/core'

const Show = ({ match, classes, history }) => (
  <Component
    initialState={{ card: null }}
    didMount={({ setState }) =>
      get(match.params.id).then(card => setState({ card: card }))
    }
  >
    {({ state }) => (
      <React.Fragment>
        {!state.card ? (
          <div>Loading...</div>
        ) : (
          <div className={classes.root}>
            <Typography variant="title">{state.card.term}</Typography>
            <Typography variant="caption">{state.card.definition}</Typography>
            <Typography variant="subheading">{state.card.subject}</Typography>
            <Button to={`/cards/${state.card._id}/edit`} component={Link}>
              Edit
            </Button>

            <Button to={`/cards`} component={Link}>
              List
            </Button>
          </div>
        )}
      </React.Fragment>
    )}
  </Component>
)

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
