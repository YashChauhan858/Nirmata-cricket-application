import { useState } from 'react'

/** ------------ @Image ---------------- */
import arrow from '@Assets/arrow.svg'

interface IDropDown {
  dropDownList: string[]
  getDropDown: (a: string) => void
  dropValue: string
}
const DropDown = ({ dropDownList, getDropDown, dropValue }: IDropDown) => {
  const [dropDownToggler, setDropDownToggler] = useState<boolean>(false)

  const selectValueAndCloseDropDown = (dropValue: string) => {
    getDropDown(dropValue)
    setDropDownToggler(false)
  }
  return (
    <>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-primary w-full bg-textColor ring-offset-0 font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center justify-between"
        type="button"
        onClick={() => setDropDownToggler(!dropDownToggler)}
      >
        {dropValue === 'All' ? 'Select type' : dropValue}
        <img src={arrow} alt="" className="w-2.5 h-2.5 ml-2.5" />
      </button>
      {dropDownToggler && (
        <div id="dropdown" className="z-10 relative">
          <ul className="py-1 text-sm text-gray-700 absolute w-full">
            {dropDownList.length !== 0 &&
              dropDownList.map((dropDownValue) => (
                <li
                  key={dropDownValue}
                  onClick={() => selectValueAndCloseDropDown(dropDownValue)}
                >
                  <p className="cursor-pointer rounded-lg block px-4 py-2 mt-1 text-primary bg-textColor font-medium hover:opacity-90 transition-opacity duration-200">
                    {dropDownValue}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default DropDown
