import React from 'react'
import PropTypes from 'prop-types'
import Component from '@reactions/component'
import { List, ListItem, ListItemText, Typography } from '@material-ui/core'
import { map } from 'ramda'

import { list } from '../../lib/subjects'
import Header from '../shared/header'

const [LOADING, READY, ERROR] = ['LOADING', 'READY', 'ERROR']

const Subjects = ({ classes, history }) => (
  <Component
    initialState={{ status: LOADING, subjects: [] }}
    didMount={({ setState }) =>
      list()
        .then(subjects => setState({ subjects, status: READY }))
        .catch(err => setState({ status: ERROR, message: err.message }))
    }
  >
    {({ state }) => (
      <React.Fragment>
        <Header to="/subjects/new" />
        {state.status === LOADING ? (
          <div>Loading...</div>
        ) : (
          <div>
            <Typography
              color="inherit"
              style={{ margin: '8px' }}
              variant="headline"
            >
              Subjects
            </Typography>

            <List>
              {map(
                subject => (
                  <ListItem
                    key={subject._id}
                    button
                    onClick={() => {
                      history.push(`/subjects/${subject._id}`)
                    }}
                  >
                    <ListItemText>{subject.name}</ListItemText>
                  </ListItem>
                ),
                state.subjects
              )}
            </List>
          </div>
        )}
      </React.Fragment>
    )}
  </Component>
)

export default Subjects
