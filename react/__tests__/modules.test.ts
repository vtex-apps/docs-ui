import {
  markdownWithoutIgnoredSection,
  markdownWithOneIgnoredSection,
  markdownWithMultipleIgnoredSections,
  markdownWithExtraIgnoreStartToken,
} from '../__fixtures__/markdowns'
import {
  findDocsIgnoreNodes,
  removeIgnoredNodesFromDocs,
} from '../modules/ignoreTokens'

describe('ignoreTokens module', () => {
  describe('findDocsIgnoreNodes function', () => {
    it('should return empty arrays when the markdown does not have ignore tokens', () => {
      const output = findDocsIgnoreNodes(markdownWithoutIgnoredSection)

      expect(output).toEqual({ start: [], end: [] })
    })

    it('should return expected start and end arrays in documentation with a single ignored section.', () => {
      const expected = {
        start: [4],
        end: [7],
      }
      const output = findDocsIgnoreNodes(markdownWithOneIgnoredSection)
      expect(output).toEqual(expected)
    })

    it('should return expected start and end arrays in documentation with multiple ignored sections.', () => {
      const expected = {
        start: [4, 10],
        end: [7, 13],
      }

      const output = findDocsIgnoreNodes(markdownWithMultipleIgnoredSections)

      expect(output).toEqual(expected)
    })
  })

  describe('removeIgnoredNodesFromDocs function', () => {
    it('should return original nodes if there are no DOCS_IGNORE_START nodes.', () => {
      const expected = markdownWithoutIgnoredSection

      const output = removeIgnoredNodesFromDocs(
        [],
        [],
        markdownWithoutIgnoredSection
      )

      expect(output).toEqual(expected)
    })

    it('should return nodes that were not ignored when startNodes and endNodes have one element each.', () => {
      const output = removeIgnoredNodesFromDocs(
        [4],
        [7],
        markdownWithOneIgnoredSection
      )

      expect(output).toHaveLength(6)
    })

    it('should return nodes that were not ignored when startNodes and endNodes have multiple elements.', () => {
      const output = removeIgnoredNodesFromDocs(
        [4, 10],
        [7, 13],
        markdownWithMultipleIgnoredSections
      )

      expect(output).toHaveLength(9)
    })

    it('should return expected nodes when startNodes has more elements than endNodes.', () => {
      const output = removeIgnoredNodesFromDocs(
        [4, 10, 15],
        [7, 13],
        markdownWithExtraIgnoreStartToken
      )

      expect(output).toHaveLength(7)
    })
  })
})
