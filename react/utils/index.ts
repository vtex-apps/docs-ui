import slugify from 'slugify'

function slug(str: string) {
  const replaced =
    (typeof str === 'string' && str.replace(/[*+~.()'"!:@&[\]]/g, '')) || ''
  const slugified = slugify(replaced, { lower: true }) || ''
  return slugified
}

function formatLink(path: string) {
  const isExternalLink = !!path && path.match(/((http(s)?):\/)|(www.)/)
  // There is an issue during the parsing of Summary.md at `docs-graphql`
  const PROTOCOL_PREFIX = 'https:/'
  const linkUrl = isExternalLink
    ? `https://${path.substring(PROTOCOL_PREFIX.length)}`
    : `/docs/${removeFileExtension(path)}`

  return linkUrl
}

function removeFileExtension(fileName: string) {
  const MARKDOWN_EXTENSION = '.md'
  const hasExtension = fileName.endsWith(MARKDOWN_EXTENSION)

  return !hasExtension
    ? fileName
    : fileName.substring(0, fileName.length - MARKDOWN_EXTENSION.length)
}

export { slug, formatLink, removeFileExtension }
