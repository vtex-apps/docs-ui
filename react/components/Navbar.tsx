import React, { FunctionComponent, useState } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { IconCaretDown, IconCaretUp, IconBars } from 'vtex.styleguide'
import { useRuntime, Link } from 'vtex.render-runtime'

import logoPath from '../images/VTEX_Cold_Gray_RGB.svg'

const supportedLangs = [
  {
    id: 'en-US',
  },
  {
    id: 'pt-BR',
  },
]

const Navbar: FunctionComponent<
  InjectedIntlProps & { enableLocaleSelector?: boolean }
> = ({ intl, enableLocaleSelector }) => {
  const { culture, emitter } = useRuntime()
  const [openLocaleSelector, setOpenLocaleSelector] = useState(false)
  const [openNav, setOpenNav] = useState(false)
  const [selectedLocale, setSelectedLocale] = useState(
    findLocale(culture.locale)
  )

  const handleLocaleClick = ({ target: { id } }: { target: any }) => {
    emitter.emit('localesChanged', id)
    setOpenLocaleSelector(false)
    setSelectedLocale(findLocale(id))
  }

  return (
    <nav className="flex">
      <div
        className="fixed bg-base c-muted-1 w-100 flex flex-column flex-row-l justify-between z-5"
        style={{
          boxShadow: `0px 3px 20px rgba(0, 0, 0, 0.3)`,
        }}
      >
        <div className="flex">
          <button
            className="dn-l bg-base c-on-base w-33 w-50-l bn"
            onClick={() => setOpenNav(!openNav)}
          >
            <IconBars />
          </button>
          <div className="w-40 w-50-l">
            <Link
              page="io.landing"
              className="c-muted-1 self-center flex items-center link"
            >
              <img src={logoPath} className="h3" alt="VTEX" />
              <p className="dn-s flex-l">|</p>
              <p className="dn-s flex-l ml3">Developer</p>
            </Link>
          </div>
        </div>
        <div className="flex-l" hidden={!openNav}>
          <ul className="flex flex-column flex-row-l justify-center list mt0 items-center mb0 relative">
            <li className="mh5 mv5 mv0-l">
              <a
                className="link c-muted-1"
                href="https://docs.google.com/document/d/1ZM0sF22yPxaKZ9jvKWR-h8Ba00shHZS5uWgQmA8Tg7U/edit?usp=sharing"
              >
                {intl.formatMessage({ id: 'io.navbar.learn' })}
              </a>
            </li>
            <li className="mh5 mv5 mv0-l">
              <Link className="link c-muted-1" page="io.store-features">
                {intl.formatMessage({ id: 'io.navbar.feature-list' })}
              </Link>
            </li>
            <li className="mh5 mv5 mv0-l">
              <Link page="io.faq" className="link c-muted-1">
                {intl.formatMessage({ id: 'io.navbar.faq' })}
              </Link>
            </li>
            {enableLocaleSelector && (
              <li className="flex items-center">
                <div className="h-100 relative w3">
                  <button
                    onClick={() => setOpenLocaleSelector(!openLocaleSelector)}
                    className="c-muted-1 bg-base bn flex items-center pointer"
                  >
                    <p className="ttu mr4">{splitLocale(selectedLocale.id)}</p>
                    {openLocaleSelector ? <IconCaretUp /> : <IconCaretDown />}
                  </button>
                  <div
                    hidden={!openLocaleSelector}
                    className="z-4 bg-base pa3 absolute"
                  >
                    {supportedLangs.map(({ id }) => (
                      <button
                        className="tc ttu c-muted-1 pointer bn bg-base"
                        onClick={handleLocaleClick}
                        id={id}
                        key={id}
                      >
                        {splitLocale(id)}
                      </button>
                    ))}
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

function splitLocale(locale: string) {
  return locale.split('-')[0]
}

function findLocale(locale: any) {
  const localeObj = supportedLangs.find(
    ({ id }) => splitLocale(id) === splitLocale(locale)
  )
  return localeObj || supportedLangs[0]
}

export default injectIntl(Navbar)
