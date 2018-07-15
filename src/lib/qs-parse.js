import qs from 'querystring'
import { compose, split, nth } from 'ramda'

/**
 * qsparse
 *
 * takes a querystring and parses it to an object
 *
 * @param qstring {string}
 * @returns {object}
 */
const qsparse = compose(
  qs.parse,
  nth(1),
  split('?')
)

export default qsparse
