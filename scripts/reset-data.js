require('dotenv').config()
require('isomorphic-fetch')
const DB = process.env.DB
const user = process.env.USERNAME
const pwd = process.env.PASSWORD
const token = Buffer.from(`${user}:${pwd}`).toString('base64')
const headers = {
  'Content-Type': 'application/json',
  authorization: `Basic ${token}`
}
const { pluck, map, assoc, concat } = require('ramda')

const testDocs = [
  {
    _id: 'card-string',
    type: 'card',
    term: 'string',
    definition: 'a collection of characters',
    subject: 'js-2017'
  },
  {
    _id: 'card-array',
    type: 'card',
    term: 'array',
    definition: 'a collection of values',
    subject: 'js-2017'
  }
]

fetch(`${DB}/_all_docs?include_docs=true`, { headers })
  .then(res => res.json())
  .then(res => pluck('doc', res.rows))
  .then(map(assoc('_deleted', true)))
  .then(concat(testDocs))
  .then(docs =>
    fetch(`${DB}/_bulk_docs`, {
      headers,
      method: 'POST',
      body: JSON.stringify({ docs })
    })
  )
  .then(res => res.json())

  .then(console.log.bind(console))
  .catch(console.log.bind(console))
