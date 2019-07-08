import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'

import Logo from '../images/VTEX_footer.svg'
import VTEXOffices from '../VTEXOffices.json'

const footerLinks = [
  {
    id: 'pricing',
    options: [],
  },
  {
    id: 'company',
    options: ['carrers', 'partnersAWS', 'dmca', 'blog'],
  },
  {
    id: 'resources',
    options: [
      'devdocs',
      'support',
      'announcements',
      'releases',
      'status',
      'health',
      'vtexio',
    ],
  },
  {
    id: 'partners',
    options: ['vtex', 'find', 'program', 'appstore'],
  },
]

const Footer: FunctionComponent = () => (
  <footer className="bg-base pa10-l pv7 c-muted-1">
    <div className="flex flex-wrap justify-between">
      <div className="w-33-l ph4 ph0-l">
        <img src={Logo} alt="VTEX" />
        <p className="flex">
          <FormattedMessage id="io.footer.vtex" />
        </p>
      </div>
      <div className="flex-l flex-wrap dn-s">
        {footerLinks.map(category => {
          const baseMessageId = `io.footer.${category.id}`
          return (
            <ul key={category.id}>
              <p className="fw7">
                <FormattedMessage id={baseMessageId} />
              </p>
              {category.options.map(option => (
                <li className="list" key={option}>
                  <p>
                    <FormattedMessage id={`${baseMessageId}.${option}`} />
                  </p>
                </li>
              ))}
            </ul>
          )
        })}
      </div>
    </div>
    <div className="flex flex-wrap center mv7">
      {VTEXOffices.Offices.map(office => (
        <div key={office.short} className="ph4 w-20-ns w-50-s">
          <p className="t-heading-3">{office.short}</p>
          <p>{office.address1}</p>
          <p>{office.address2}</p>
          {office.address3 && <p>{office.address3}</p>}
          <p>{office.city}</p>
        </div>
      ))}
    </div>
  </footer>
)

export default Footer
