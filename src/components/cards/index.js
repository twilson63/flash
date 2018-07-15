import React from 'react'
import PropTypes from 'prop-types'
import Component from '@reactions/component'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { map } from 'ramda'
import qsparse from '../../lib/qs-parse'
import { list } from '../../lib/cards'

import Header from '../shared/header'
// TODO: filter by subject id
const Cards = ({ history, match, location }) => (
  <Component
    initialState={{ cards: [] }}
    didMount={async ({ setState }) => {
      const query = qsparse(location.search)
      setState({
        cards: await list(query.subjectId),
        subjectId: query.subjectId
      })
    }}
  >
    {({ state }) => (
      <React.Fragment>
        <Header to={`/cards/new?subjectId=${state.subjectId}`} />
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
