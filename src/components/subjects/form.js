import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { withStyles, TextField, Button, Typography } from '@material-ui/core'
import { merge } from 'ramda'

import { get, put } from '../../lib/subjects'
import slugify from '../../lib/slugify'

class SubjectForm extends React.Component {
  state = {
    subject: { name: '' }
  }
  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({ loading: true })
      get(this.props.match.params.id).then(subject => {
        this.setState({ subject, loading: false })
      })
    }
  }
  render() {
    const { classes, history } = this.props
    const { subject } = this.state
    if (this.state.loading) {
      return <div>Loading...</div>
    }
    return (
      <Formik
        initialValues={this.state.subject}
        validate={values => {
          let errors = {}

          if (values.name.length < 1) {
            errors.name = 'Required'
          }
          return errors
        }}
        onSubmit={(values, actions) => {
          const subject = merge(values, {
            _id: `subject-${slugify(values.name)}`,
            type: 'subject'
          })
          put(subject).then(res => {
            if (res.ok) {
              history.push('/subjects')
            }
          })
        }}
        component={() => (
          <div className={classes.root}>
            <div>
              <Typography variant="title">Subject</Typography>
              <Typography variant="caption">
                Create or Update a subject for your flash cards
              </Typography>
            </div>
            <Form className={classes.form}>
              <Field
                name="name"
                render={({ field, form: { errors, touched } }) => {
                  return (
                    <TextField
                      className={classes.textfield}
                      label="Name"
                      required
                      error={touched.name && errors.name}
                      helperText={errors.name}
                      {...field}
                    />
                  )
                }}
              />
              <Field
                name="description"
                render={({ field }) => (
                  <TextField
                    className={classes.textfield}
                    multiline
                    label="Description"
                    {...field}
                  />
                )}
              />
              <div>
                <Button type="submit">
                  {subject._id ? 'Update' : 'Create'}
                </Button>
                <Button
                  to={subject._id ? `/subjects/${subject._id}` : '/subjects'}
                  component={Link}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        )}
      />
    )
  }
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 16px',
    marginTop: 64
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  textfield: {
    margin: '16px 0px 16px 0px'
  }
}

export default withStyles(styles)(SubjectForm)
