import React from 'react'
import Component from '@reactions/component'
import { get, remove } from '../../lib/subjects'
import { Link } from 'react-router-dom'
import { Typography, withStyles, Button } from '@material-ui/core'

const Show = ({ match, classes, history }) => (
  <Component
    initialState={{ subject: null }}
    didMount={({ setState }) =>
      get(match.params.id).then(subject => setState({ subject }))
    }
  >
    {({ state }) => (
      <React.Fragment>
        {!state.subject ? (
          <div>Loading...</div>
        ) : (
          <div className={classes.root}>
            <Typography variant="title">{state.subject.name}</Typography>
            <Typography variant="caption">
              {state.subject.description}
            </Typography>
            <Button to={`/subjects/${state.subject._id}/edit`} component={Link}>
              Edit
            </Button>
            <Button
              onClick={e => {
                if (confirm('Are you sure?')) {
                  remove(state.subject).then(res => history.push('/subjects'))
                }
              }}
            >
              Remove
            </Button>
            <Button
              to={`/cards?subjectId=${state.subject._id}`}
              component={Link}
            >
              Cards
            </Button>
            <Button to={`/subjects`} component={Link}>
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
