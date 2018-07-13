import React from 'react'
import Component from '@reactions/component'
import { get } from '../../lib/cards'
import { Typography, withStyles } from '@material-ui/core'

const Show = ({ match, classes }) => (
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
