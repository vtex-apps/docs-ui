import React, { FC, useMemo } from 'react'
import { Dropdown } from 'vtex.styleguide'

import { useAppVersionState, useAppVersionDispatch } from './AppVersionContext'

const VersionSelector: FC = () => {
  const { major, availableMajors } = useAppVersionState()
  const setMajorInfo = useAppVersionDispatch()

  const options = useMemo(() => getDropdownOptions(availableMajors), [
    availableMajors,
  ])

  return (
    <div className="w-40 flex">
      <Dropdown
        options={options}
        value={major[0]}
        onChange={(e: Event, value: string) => {
          setMajorInfo({ type: 'updateMajor', value })
        }}
      />
    </div>
  )
}

function getDropdownOptions(originalArray: string[]) {
  return originalArray.map(item => ({ value: item[0], label: `${item}.x` }))
}

export default VersionSelector
