import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coy } from 'react-syntax-highlighter/dist/styles/prism'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { useRuntime } from 'vtex.render-runtime'

import ArticleNav from './ArticleNav'
import { slug } from '../utils'

export const CustomRenderers = {
  root: ({ children }: any) => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const { hints } = useRuntime()

    if (hints.mobile) return children

    const TOCLines: string[] = children.reduce(
      (acc: any, { key, props }: any) => {
        // Skip non-headings and H1's
        if (key.indexOf('heading') !== 0 || props.level === 1) {
          return acc
        }

        const { value } = props.children[0].props
        return value ? acc.concat([`${value}`]) : acc
      },
      []
    )

    return (
      <div className="flex">
        <div className="flex flex-column w-80-l">{children}</div>
        {TOCLines.length > 0 && <ArticleNav headings={TOCLines} />}
      </div>
    )
  },
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
  heading: (props: any) => {
    const hashId = getHeadingSlug(props.children)

    switch (props.level) {
      case 1:
        return (
          <h1 id={hashId} className="t-heading-1 fw1 c-on-base mt7 mb7">
            {props.children}
          </h1>
        )

      case 2:
        return (
          <h2 id={hashId} className="t-heading-2 fw1 mt9 mb5 c-on-base">
            {props.children}
          </h2>
        )

      case 3:
        return (
          <h3 id={hashId} className="t-heading-3 fw1 mt7 c-on-base">
            {props.children}
          </h3>
        )

      case 4:
        return (
          <h4 id={hashId} className="t-heading-4 fw1 mt7 c-on-base">
            {props.children}
          </h4>
        )

      case 5:
        return (
          <h5 id={hashId} className="t-heading-5 mt5 mb5 c-on-base lh-copy">
            {props.children}
          </h5>
        )

      case 6:
        return (
          <h6 id={hashId} className="t-heading-6 c-on-base mv5 lh-copy">
            {props.children}
          </h6>
        )
      default:
        return <p className="c-on-base lh-copy">{props.children}</p>
    }
  },
  image: (props: any) => (
    <span className="mv5 mh0">
      <img className="shadow-4" src={props.src} alt={props.alt} />
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
    <li className="t-body c-on-base mv4 lh-copy">{props.children}</li>
  ),
  paragraph: (props: any) => (
    <p className="t-body c-on-base mb7 lh-copy">{props.children}</p>
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
      <td className="t-body pa5" style={{ minWidth: '10rem' }}>
        {props.children}
      </td>
    )
  },
  tableRow: (props: any) => <tr className="bb b--muted-3">{props.children}</tr>,
  thematicBreak: () => <hr className="mv7" />,
}

function getHeadingSlug(childNodes: any) {
  return (
    (childNodes[0].props.children && slug(childNodes[0].props.children)) || ''
  )
}
