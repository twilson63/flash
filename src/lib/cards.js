/* global fetch */

const url = process.env.DB
const user = process.env.USERNAME
const pwd = process.env.PASSWORD

const token = btoa(`${user}:${pwd}`)

export const list = () =>
  fetch(`${url}/_find`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`
    },
    method: 'POST',
    body: JSON.stringify({
      selector: {
        type: 'card'
      }
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

export const put = card =>
  /* eslint-disable-next-line no-underscore-dangle */
  fetch(`${url}/${card._id}`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`
    },
    method: 'PUT',
    body: JSON.stringify(card)
  }).then(res => res.json())
