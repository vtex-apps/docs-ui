import React, { FunctionComponent, AnchorHTMLAttributes } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coy } from 'react-syntax-highlighter/dist/styles/prism'
import AnchorLink from 'react-anchor-link-smooth-scroll'

import { useRuntime } from 'vtex.render-runtime'

const customParagraph: FunctionComponent = ({ children }) => (
  <p className="t-body lh-title">{children}</p>
)

const customH1: FunctionComponent = ({ children }) => (
  <h1
    id={`${children}`.toLowerCase().replace(' ', '-')}
    className="t-heading-2 bb b--muted-4">
    {children}
  </h1>
)

const customH2: FunctionComponent = ({ children }) => (
  <h2
    id={`${children}`.toLowerCase().replace(' ', '-')}
    className="t-heading-3">
    {children}
  </h2>
)

const customH3: FunctionComponent = ({ children }) => (
  <h3
    id={`${children}`.toLowerCase().replace(' ', '-')}
    className="t-heading-4">
    {children}
  </h3>
)

const customH4: FunctionComponent = ({ children }) => (
  <h4
    id={`${children}`.toLowerCase().replace(' ', '-')}
    className="t-heading-5">
    {children}
  </h4>
)

const customH5: FunctionComponent = ({ children }) => (
  <h5
    id={`${children}`.toLowerCase().replace(' ', '-')}
    className="t-heading-6">
    {children}
  </h5>
)

const customTableHeader: FunctionComponent = ({ children }) => (
  <th className="tc ph4">{children}</th>
)

const customTableData: FunctionComponent = ({ children }) => (
  <td className="tc pv4 ph4">{children}</td>
)

const customPre: FunctionComponent = ({ children }) => (
  <pre>
    <SyntaxHighlighter language="javascript" style={coy}>
      {children}
    </SyntaxHighlighter>
  </pre>
)

const customListItem: FunctionComponent = ({ children }) => (
  <li>
    <p className="t-body lh-title">{children}</p>
  </li>
)

const customAnchor: FunctionComponent<AnchorHTMLAttributes<any>> = ({
  href,
  children,
}) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { route } = useRuntime()

  const isIdLink = !!href && href[0] === '#'
  const isRelativeLink = !!href && href[0] === '/'

  if (isIdLink && !!href) {
    return (
      <AnchorLink offset={() => 80} href={href.toLowerCase()}>
        {children}
      </AnchorLink>
    )
  }

  if (isRelativeLink) {
    return <a href={`/docs/${route.params.app}${href}`}>{children}</a>
  }

  return <a href={href}>{children}</a>
}

export const remarkReactComponents = {
  h1: customH1,
  h2: customH2,
  h3: customH3,
  h4: customH4,
  h5: customH5,
  a: customAnchor,
  p: customParagraph,
  pre: customPre,
  th: customTableHeader,
  td: customTableData,
  li: customListItem,
}
