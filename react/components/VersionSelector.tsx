import React, { FunctionComponent } from 'react'
import { Dropdown } from 'vtex.styleguide'

import { useAppVersionState, useAppVersionDispatch } from './AppVersionContext'

const VersionSelector: FunctionComponent = () => {
  const { major, availableMajors } = useAppVersionState()
  const setMajorInfo = useAppVersionDispatch()

  return (
    <div className="w-40 flex">
      <Dropdown
        options={getDropdownOptions(availableMajors)}
        value={major[0]}
        onChange={(e: any, value: string) => {
          setMajorInfo({ major: value, availableMajors })
        }}
      />
    </div>
  )
}

function getDropdownOptions(originalArray: string[]) {
  return originalArray.map(item => ({ value: item[0], label: `${item}.x` }))
}

export default VersionSelector
