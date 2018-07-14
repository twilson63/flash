/* global fetch */

const url = process.env.DB
const user = process.env.USERNAME
const pwd = process.env.PASSWORD

const token = btoa(`${user}:${pwd}`)
const headers = {
  'Content-Type': 'application/json',
  authorization: `Basic ${token}`
}

export const list = () =>
  fetch(`${url}/_find`, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      selector: {
        type: 'subject'
      }
    })
  })
    .then(res => res.json())
    .then(json => json.docs)
    .catch(() => [
      {
        type: 'subject',
        name: 'No Subject Found'
      }
    ])

export const get = id =>
  fetch(`${url}/${id}`, {
    headers,
    method: 'GET'
  }).then(res => res.json())

export const put = subject =>
  /* eslint-disable-next-line no-underscore-dangle */
  fetch(`${url}/${subject._id}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify(subject)
  }).then(res => res.json())

export const remove = subject =>
  /* eslint-disable-next-line no-underscore-dangle */
  fetch(`${url}/${subject._id}?rev=${subject._rev}`, {
    headers,
    method: 'DELETE',
    body: JSON.stringify(subject)
  }).then(res => res.json())
