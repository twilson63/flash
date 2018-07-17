import React from 'react'
import Component from '@reactions/component'
import {
  TextField,
  Button,
  Typography,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import { merge } from 'ramda'
import { put } from '../../lib/cards'

const emptyCard = {
  term: '',
  definition: '',
  subject: ''
}

const Form = ({ classes }) => (
  <Component initialState={{ card: emptyCard, redirect: false }}>
    {({ state, setState }) => (
      <React.Fragment>
        {state.redirect ? <Redirect to="/cards" /> : null}

        <main className={classes.root}>
          <div>
            <Typography className={classes.title} variant="headline">
              Flash Card
            </Typography>
            <Typography variant="caption">
              Create a new flash card by specifying a term and definition.
            </Typography>
          </div>
          <form
            className={classes.form}
            onSubmit={e => {
              e.preventDefault()
              const card = merge(state.card, {
                type: 'card',
                _id: `card-${state.card.term}`
              })
              put(card).then(res => {
                if (res.ok) {
                  setState({
                    redirect: true
                  })
                }
              })
            }}
          >
            <TextField
              label="Term"
              value={state.card.term}
              onChange={e => {
                const card = merge(state.card, { term: e.target.value })
                setState({ card })
              }}
            />
            <TextField
              multiline
              label="Definition"
              value={state.card.definition}
              onChange={e => {
                const card = merge(state.card, { definition: e.target.value })
                setState({ card })
              }}
            />
            <FormControl>
              <InputLabel htmlFor="subject">Subject</InputLabel>
              <Select
                inputProps={{ id: 'subject' }}
                value={state.card.subject}
                onChange={e => {
                  const card = merge(state.card, { subject: e.target.value })
                  setState({ card })
                }}
              >
                <MenuItem value={'js-2017'}>JavaScript</MenuItem>
                <MenuItem value={'fp-ramda'}>Functional</MenuItem>
                <MenuItem value={'command-line'}>Command-line</MenuItem>
                <MenuItem value={'nodejs'}>NodeJS</MenuItem>
                <MenuItem value={'http-json'}>HTTP/JSON</MenuItem>
                <MenuItem value={'rest-api'}>REST API</MenuItem>
                <MenuItem value={'nosql'}>NoSQL</MenuItem>
                <MenuItem value={'sql'}>SQL</MenuItem>
                <MenuItem value={'react'}>
                  Component Architecture (React)
                </MenuItem>
                <MenuItem value={'redux'}>
                  App State Management (Redux)
                </MenuItem>
                <MenuItem value={'material'}>UX (Material-UI)</MenuItem>
                <MenuItem value={'flexbox'}>Styles (flexbox)</MenuItem>
              </Select>
            </FormControl>
            <div className={classes.buttons}>
              <Button type="submit">Create Card</Button>
              <Button to="/cards" component={Link}>
                Cancel
              </Button>
            </div>
          </form>
        </main>
      </React.Fragment>
    )}
  </Component>
)

const styles = {
  title: {
    marginTop: 32
  },
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 16px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  buttons: {
    marginTop: 32
  }
}

export default withStyles(styles)(Form)
