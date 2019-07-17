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

export const helpRenderers = {
  break: () => <br />,
  code: (props: any) => {
    const codeBlock = props.value.replace(/“/gm, '"').replace(/”/gm, '"')

    return (
      <div className="overflow-scroll-gradient">
        <pre className="w-100 overflow-y-auto overflow-scroll-gradient__scroller">
          <SyntaxHighlighter language="javascript" style={coy}>
            {codeBlock}
          </SyntaxHighlighter>
        </pre>
      </div>
    )
  },
  emphasis: (props: any) => <em className="i">{props.children}</em>,
  // heading: (props: any) => {
  //   switch (props.level) {
  //     case 1:
  //       return (
  //         <h1 className="t-heading-1 c-on-base mt7 mb7">
  //           {props.children}
  //         </h1>
  //       )

  //     case 2:
  //       return (
  //         <h2 className="mt9 mb5">
  //           <a
  //             className="t-heading-2 no-underline c-on-base mv0"
  //             href=''
  //           >
  //             {props.children}
  //           </a>
  //         </h2>
  //       )

  //     case 3:
  //       return (
  //         <h3 className="mt7">
  //           <a
  //             className="t-heading-3 no-underline c-on-base mv0"
  //             href=''
  //           >
  //             {props.children}
  //           </a>
  //         </h3>
  //       )

  //     case 4:
  //       return (
  //         <h4 className="mt7">
  //           <a
  //             className="t-heading-4 no-underline c-on-base mv0"
  //             href=''
  //           >
  //             {props.children}
  //           </a>
  //         </h4>
  //       )

  //     case 5:
  //       return (
  //         <h5 className="mt5 mb5">
  //           <a
  //             className="t-heading-5 c-on-base mv0 lh-copy"
  //             href=''
  //           >
  //             {props.children}
  //           </a>
  //         </h5>
  //       )

  //     case 6:
  //       return (
  //         <h6 className="t-heading-6 c-on-base mv5 lh-copy">
  //           {props.children}
  //         </h6>
  //       )
  //   }
  // },
  image: (props: any) => (
    <span className="mv5 mh0">
      <img className="db center mv9 shadow-4" src={props.src} alt={props.alt} />
    </span>
  ),
  inlineCode: (props: any) => (
    <span
      className="t-body c-on-base pa2 mw6 br2 bg-muted-4"
      style={{ wordBreak: 'break-word', wordWrap: 'break-word' }}>
      {props.value}
    </span>
  ),
  link: (props: any) => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const { route } = useRuntime()

    const isIdLink = !!props.href && props.href[0] === '#'
    const isRelativeLink = !!props.href && props.href[0] === '/'

    if (isIdLink && !!props.href) {
      return (
        <AnchorLink offset={() => 80} href={props.href.toLowerCase()}>
          {props.children}
        </AnchorLink>
      )
    }

    if (isRelativeLink) {
      return (
        <a href={`/docs/${route.params.app}${props.href}`}>{props.children}</a>
      )
    }

    return <a href={props.href}>{props.children}</a>
  },
  list: (props: any) => {
    if (props.ordered) {
      return <ol className="mv7">{props.children}</ol>
    }

    return <ul className="t-body c-on-base mb7 lh-copy">{props.children}</ul>
  },
  listItem: (props: any) => (
    <li className="t-body c-on-base mb5 lh-copy">{props.children}</li>
  ),
  paragraph: (props: any) => (
    <p className="t-body c-on-base mb7">{props.children}</p>
  ),
  strong: (props: any) => <strong className="fw7">{props.children}</strong>,
  table: (props: any) => (
    <div className="overflow-x-auto">
      <table
        style={{ borderSpacing: '0', borderCollapse: 'collapse' }}
        className="w-100 center mv7 bb b--gray">
        {props.children}
      </table>
    </div>
  ),
  tableCell: (props: any) => {
    if (props.isHeader) {
      return (
        <th className="t-body fw5 c-muted-1 bb bw1 pa2 pb3 b--muted-3 tl">
          {props.children}
        </th>
      )
    }

    return (
      <td className="t-body pa5" style={{ minWidth: '15rem' }}>
        {props.children}
      </td>
    )
  },
  tableRow: (props: any) => <tr className="bb b--muted-3">{props.children}</tr>,
  thematicBreak: () => <hr className="mv7" />,
}
