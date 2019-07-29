import slugify from 'slugify'

function slug(str: string) {
  const replaced =
    (typeof str === 'string' && str.replace(/[*+~.()'"!:@&[\]]/g, '')) || ''
  const slugified = slugify(replaced, { lower: true }) || ''
  return slugified
}

export { slug }
