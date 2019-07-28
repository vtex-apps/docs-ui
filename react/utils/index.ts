import slugify from 'slugify'

function slug(str?: string | Record<string, any>) {
  const replaced =
    (str && str.toString().replace(/[*+~.()'"!:@&[\]]/g, '')) || ''
  const slugified = slugify(replaced, { lower: true }) || ''
  return slugified
}

export { slug }
