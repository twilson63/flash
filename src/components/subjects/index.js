import React from 'react'
import PropTypes from 'prop-types'
import Component from '@reactions/component'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { list } from '../../lib/subjects'
import { map } from 'ramda'
import Header from '../shared/header'

const [LOADING, READY, ERROR] = ['LOADING', 'READY', 'ERROR']

const Subjects = ({ classes, history }) => (
  <Component
    initialState={{ status: LOADING, subjects: [] }}
    didMount={({ setState }) =>
      list().then(subjects => setState({ subjects, status: READY }))
    }
  >
    {({ state, setState }) => (
      <React.Fragment>
        <Header to="/subjects/new" />
        {state.status === LOADING ? (
          <div>Loading...</div>
        ) : (
          <List>
            {map(
              subject => (
                <ListItem
                  key={subject._id}
                  button
                  onClick={e => {
                    history.push('/subjects/' + subject._id)
                  }}
                >
                  <ListItemText>{subject.name}</ListItemText>
                </ListItem>
              ),
              state.subjects
            )}
          </List>
        )}
      </React.Fragment>
    )}
  </Component>
)

export default Subjects
