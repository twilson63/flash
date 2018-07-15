import { compose, toLower, replace } from 'ramda'

/**
 * slugify
 *
 * convert string into dash separated slug
 *
 * @param s {string}
 * @returns {string}
 */
const slugify = compose(
  replace(/\s/g, '-'),
  toLower
)

export default slugify
