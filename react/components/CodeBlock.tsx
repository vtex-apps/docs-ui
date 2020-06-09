import React, { FC, useRef, useEffect } from 'react'
import hljs from 'highlight.js'

interface Props {
  language: string
  value: string
}

const CodeBlock: FC<Props> = ({ language, value }) => {
  const codeBlockRef = useRef<HTMLPreElement>(null)
  useEffect(() => {
    if (codeBlockRef?.current) {
      hljs.highlightBlock(codeBlockRef.current)
    }
  }, [codeBlockRef])

  // highlight.js does not support `.jsonc` files
  const codeBlockLanguage = language === 'jsonc' ? 'json' : language

  return (
    <pre>
      <code ref={codeBlockRef} className={`language-${codeBlockLanguage}`}>
        {value}
      </code>
    </pre>
  )
}

export default CodeBlock
