import slugify from 'slugify'

function slug(str: string) {
  const replaced = (str && str.replace(/[*+~.()'"!:@&[\]]/g, '')) || ''
  const slugified = slugify(replaced, { lower: true }) || ''
  return slugified
}

export { slug }
