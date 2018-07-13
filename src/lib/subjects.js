/* global fetch */

const url = process.env.DB

const get = () =>
  fetch(`${url}/_find`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      selector: {
        type: 'subject'
      }
    })
  }).then(res => res.json())

export default { get }
