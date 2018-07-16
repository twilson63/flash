import React from 'react'
import Component from '@reactions/component'
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Typography,
  Card,
  CardContent
} from '@material-ui/core'
import { map, append, without, contains } from 'ramda'

import Header from './header'
import { list } from '../../lib/subjects'

const toggle = (item, list) => {
  if (contains(item, list)) {
    return without([item], list)
  } else {
    return append(item, list)
  }
}

const Config = () => (
  <Component
    initialState={{ subjects: [], selected: [] }}
    didMount={({ setState }) => {
      list().then(subjects => setState({ subjects }))
    }}
  >
    {({ state, setState }) => (
      <React.Fragment>
        <Header />
        <Card>
          <CardContent>
            <Typography color="inherit" variant="headline">
              Select Subject(s)
            </Typography>
            <Typography color="inherit" variant="caption">
              Before we can start to play a flash card game, we need to select
              one or more subjects by clicking on each subject you would like to
              be challenged with.
            </Typography>
          </CardContent>
        </Card>
        <List>
          {map(
            subject => (
              <ListItem
                key={subject._id}
                onClick={() =>
                  setState({ selected: toggle(subject._id, state.selected) })
                }
              >
                <Checkbox
                  color="primary"
                  disableRipple
                  checked={contains(subject._id, state.selected)}
                />
                <ListItemText>{subject.name}</ListItemText>
              </ListItem>
            ),
            state.subjects
          )}
        </List>
      </React.Fragment>
    )}
  </Component>
)

export default Config
