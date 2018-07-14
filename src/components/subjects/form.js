import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { withStyles, TextField, Button, Typography } from '@material-ui/core'
import { merge } from 'ramda'

import { put } from '../../lib/subjects'
import { get } from '../../lib/cards'

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
        onSubmit={(values, actions) => {
          const subject = merge(values, {
            _id: `subject-${values.name.toLowerCase()}`,
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
                render={({ field }) => <TextField label="Name" {...field} />}
              />
              <Field
                name="description"
                render={({ field }) => (
                  <TextField multiline label="Description" {...field} />
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
  }
}

export default withStyles(styles)(SubjectForm)
