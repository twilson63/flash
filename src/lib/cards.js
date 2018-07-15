/* global fetch */
/* global btoa */
import { merge } from 'ramda'

const url = process.env.DB
const user = process.env.USERNAME
const pwd = process.env.PASSWORD

const token = btoa(`${user}:${pwd}`)
const headers = {
  'Content-Type': 'application/json',
  authorization: `Basic ${token}`
}

export const list = subjectId => {
  let selector = {
    type: 'card'
  }
  if (subjectId) {
    selector = merge(selector, { subjectId })
  }
  return fetch(`${url}/_find`, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      selector
    })
  })
    .then(res => res.json())
    .then(json => json.docs)
    .catch(() => [
      {
        type: 'card',
        term: 'No Cards Found'
      }
    ])
}

export const get = id =>
  fetch(`${url}/${id}`, {
    headers,
    method: 'GET'
  }).then(res => res.json())

export const put = card =>
  /* eslint-disable-next-line no-underscore-dangle */
  fetch(`${url}/${card._id}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify(card)
  }).then(res => res.json())

export const remove = card =>
  /* eslint-disable-next-line no-underscore-dangle */
  fetch(`${url}/${card._id}?rev=${card._rev}`, {
    headers,
    method: 'DELETE',
    body: JSON.stringify(card)
  }).then(res => res.json())
