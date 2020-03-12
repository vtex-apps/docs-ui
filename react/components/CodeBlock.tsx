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

  return (
    <pre>
      <code ref={codeBlockRef} className={`language-${language}`}>
        {value}
      </code>
    </pre>
  )
}

export default CodeBlock
