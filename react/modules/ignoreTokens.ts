import { DOCS_IGNORE_END, DOCS_IGNORE_START } from './constantExports'

export function findDocsIgnoreNodes(childNodes: any[]) {
  const ignoreStartIndexes = []
  const ignoreEndIndexes = []

  for (let idx = 0; idx < childNodes.length; idx++) {
    const currNode = childNodes[idx]

    const isHTMLNode = currNode.key.includes('html')

    const isDocsIgnoreStart =
      isHTMLNode && currNode.props.value === DOCS_IGNORE_START
    const isDocsIgnoreEnd =
      isHTMLNode && currNode.props.value === DOCS_IGNORE_END

    if (isDocsIgnoreStart) {
      ignoreStartIndexes.push(idx)
    }

    if (isDocsIgnoreEnd) {
      ignoreEndIndexes.push(idx)
    }
  }

  return {
    start: ignoreStartIndexes,
    end: ignoreEndIndexes,
  }
}

export function removeIgnoredNodesFromDocs(
  startNodes: number[],
  endNodes: number[],
  children: any[]
) {
  let activeIntervalIdx = 0
  let [activeIntervalStart] = startNodes
  let [activeIntervalEnd] = endNodes

  if (startNodes.length === 0) {
    return children
  }

  return children.filter((_, idx) => {
    if (idx < activeIntervalStart || idx > activeIntervalEnd) {
      return true
    }

    if (idx === activeIntervalEnd) {
      activeIntervalIdx++

      activeIntervalStart =
        activeIntervalIdx > startNodes.length - 1
          ? children.length
          : startNodes[activeIntervalIdx]
      activeIntervalEnd =
        activeIntervalIdx > endNodes.length - 1
          ? children.length
          : endNodes[activeIntervalIdx]
    }

    return false
  })
}
