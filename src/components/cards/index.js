import React from 'react'
import PropTypes from 'prop-types'
import Component from '@reactions/component'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { list } from '../../lib/cards'
import { map } from 'ramda'

import Header from '../shared/header'
// TODO: filter by subject id
const Cards = ({ history }) => (
  <Component
    initialState={{ cards: [] }}
    didMount={async ({ setState }) => setState({ cards: await list() })}
  >
    {({ state }) => (
      <React.Fragment>
        <Header to="/cards/new" />
        <List>
          {map(
            card => (
              <ListItem
                key={card._id}
                button
                onClick={e => {
                  history.push('/cards/' + card._id)
                }}
              >
                <ListItemText>{card.term}</ListItemText>
              </ListItem>
            ),
            state.cards
          )}
        </List>
      </React.Fragment>
    )}
  </Component>
)

export default Cards
