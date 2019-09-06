/* eslint @typescript-eslint/no-explicit-any: 0 */
import React, { Fragment } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/styles/prism'
import { useRuntime } from 'vtex.render-runtime'
import { useDevice } from 'vtex.device-detector'
import { Link } from 'vtex.styleguide'

import ArticleNav from './ArticleNav'
import { slug } from '../utils'

export const CustomRenderers = {
  root: ({ children }: any) => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const { isMobile } = useDevice()

    if (isMobile) {
      return (
        <div className="flex flex-column center" style={{ maxWidth: '95vw' }}>
          {children}
        </div>
      )
    }

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
        <div className="flex flex-column w-80-l" style={{ maxWidth: '680px' }}>
          {children}
        </div>
        {TOCLines.length > 0 && (
          <div className="sticky h-50" style={{ top: 0 }}>
            <ArticleNav headings={TOCLines} />
          </div>
        )}
      </div>
    )
  },
  break: () => <br />,
  code: (props: any) => {
    const { language, value } = props
    const codeBlock = value.replace(/“/gm, '"').replace(/”/gm, '"')

    return (
      <div className="overflow-scroll-gradient">
        <pre className="w-100 overflow-y-auto overflow-scroll-gradient__scroller bg-muted-5 ba b--muted-3 br2 pa4 mb6 mt0">
          <SyntaxHighlighter
            language={language}
            style={base16AteliersulphurpoolLight}
            customStyle={{
              background: 'transparent',
              backgroundColor: 'transparent',
              marginBottom: 0,
              marginTop: 0,
              fontSize: '0.9rem',
            }}
            showLineNumbers={!!language && language !== 'sh'}
            codeTagProps={{
              style: {
                background: 'transparent',
                backgroundColor: 'transparent',
              },
            }}>
            {codeBlock}
          </SyntaxHighlighter>
        </pre>
      </div>
    )
  },
  emphasis: (props: any) => <em className="i">{props.children}</em>,
  heading: (props: any) => {
    const hashId = getHeadingSlug(props.children)
    const { app } = useRuntime().route.params
    const vendor = app && app.split('.')[0]

    switch (props.level) {
      case 1:
        return (
          <Fragment>
            <h1
              id={hashId}
              className={`t-heading-1 c-on-base mt7 ${
                vendor !== 'vtex' ? 'mb3' : 'mb7'
              }`}>
              {props.children}
            </h1>
            {vendor && vendor !== 'vtex' ? (
              <p className="t-small c-on-base mt0 lh-copy mb6">
                This application was created by: <strong>{vendor}</strong>
              </p>
            ) : null}
          </Fragment>
        )

      case 2:
        return (
          <h2 id={hashId} className="t-heading-2 mt4 mb5 c-on-base">
            {props.children}
          </h2>
        )

      case 3:
        return (
          <h3 id={hashId} className="t-heading-3 mt7 c-on-base">
            {props.children}
          </h3>
        )

      case 4:
        return (
          <h4 id={hashId} className="t-heading-4 mt7 c-on-base">
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
    <div className="mh0">
      <img className="shadow-4" src={props.src} alt={props.alt} />
    </div>
  ),
  inlineCode: (props: any) => (
    <span
      className="pv1 ph2 mw6 br2 bg-muted-5 ba b--muted-3 t-code c-emphasis"
      style={{ wordWrap: 'break-word' }}>
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
        <Link to={props.href.toLowerCase()} className="dim">
          {props.children}
        </Link>
      )
    }

    if (isRelativeLink) {
      return (
        <Link to={`/docs/${route.params.app}${props.href}`} className="dim">
          {props.children}
        </Link>
      )
    }

    return (
      <Link href={props.href} className="dim">
        {props.children}
      </Link>
    )
  },
  list: (props: any) => {
    if (props.ordered) {
      return (
        <ol className="t-body c-on-base mt0 mb6 pl6 lh-copy">
          {props.children}
        </ol>
      )
    }

    return (
      <ul className="t-body c-on-base mt0 mb6 pl6 lh-copy">{props.children}</ul>
    )
  },
  listItem: (props: any) => (
    <li className="t-body c-on-base mb4 mt0 lh-copy">{props.children}</li>
  ),
  paragraph: (props: any) => {
    if (props.children === '' || props.children.length === 0) return null
    return <p className="t-body c-on-base mt0 lh-copy mb6">{props.children}</p>
  },
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
      <td className="t-body pa5 lh-copy" style={{ minWidth: '10rem' }}>
        {props.children}
      </td>
    )
  },
  tableRow: (props: any) => (
    <tr className="bb b--muted-3 lh-copy">{props.children}</tr>
  ),
  thematicBreak: () => <hr className="mv7" />,
}

function getHeadingSlug(childNodes: any) {
  return (
    (childNodes[0].props.children && slug(childNodes[0].props.children)) || ''
  )
}
