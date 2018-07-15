import React from 'react'
import Component from '@reactions/component'
import { Formik, Form, Field } from 'formik'
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
import { merge, map } from 'ramda'
import { put, get } from '../../lib/cards'
import { list } from '../../lib/subjects'
import slugify from '../../lib/slugify'
import qsparse from '../../lib/qs-parse'

const emptyCard = {
  term: '',
  definition: '',
  subjectId: ''
}

const CardForm = ({ classes, match, location }) => (
  <Component
    didMount={({ setState }) => {
      const query = qsparse(location.search)
      if (match.params.id) {
        get(match.params.id).then(card => setState({ card, loading: false }))
      } else {
        setState(state => ({
          card: merge(state.card, { subjectId: query.subjectId || '' }),
          loading: false
        }))
      }
    }}
    initialState={{
      subjects: [],
      card: emptyCard,
      redirect: false,
      loading: true
    }}
  >
    {({ state, setState }) => {
      if (state.loading) {
        return <div>Loading...</div>
      }
      if (state.redirect) {
        return <Redirect to={`/cards?subjectId=${state.card.subjectId}`} />
      }

      return (
        <Formik
          initialValues={state.card}
          validate={values => {
            let errors = {}
            if (values.term.length < 1) {
              errors.term = 'Required'
            }
            if (values.definition.length < 1) {
              errors.definition = 'Required'
            }
            return errors
          }}
          onSubmit={values => {
            const card = merge(values, {
              type: 'card',
              _id: `card-${slugify(values.term)}`
            })

            put(card).then(res => {
              if (res.ok) {
                setState({
                  redirect: true
                })
              }
            })
          }}
          component={() => (
            <React.Fragment>
              <main className={classes.root}>
                <div>
                  <Typography className={classes.title} variant="headline">
                    Flash Card
                  </Typography>
                  <Typography variant="caption">
                    Add or Update a flash card by specifying a term and
                    definition.
                  </Typography>
                </div>
                <Form className={classes.form}>
                  <Field
                    name="term"
                    render={({ field, form: { errors, touched } }) => (
                      <TextField
                        label="Term"
                        required
                        error={
                          touched.term && errors.term && errors.term.length > 0
                        }
                        helperText={errors.term}
                        {...field}
                      />
                    )}
                  />
                  <Field
                    name="definition"
                    render={({ field, form: { errors, touched } }) => (
                      <TextField
                        multiline
                        rowsMax={12}
                        required
                        label="Definition"
                        error={touched.definition && errors.definition}
                        {...field}
                      />
                    )}
                  />
                  <div className={classes.buttons}>
                    <Button type="submit">
                      {state.card._id ? 'Update' : 'Create'} Card
                    </Button>
                    <Button
                      to={
                        state.card._id
                          ? `/cards/${state.card._id}`
                          : `/cards?subjectId=${state.card.subjectId}`
                      }
                      component={Link}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </main>
            </React.Fragment>
          )}
        />
      )
    }}
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

export default withStyles(styles)(CardForm)
