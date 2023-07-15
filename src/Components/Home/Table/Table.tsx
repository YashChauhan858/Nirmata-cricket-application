import { TPlayer, getDateByEpoch, getPlayers } from '@Utils'
import { useQuery } from '@tanstack/react-query'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
/** ---------------- @Components --------------------- */
import { DropDown } from '@Components'

/** ---------------- @Images_Icons ------------------- */
import externalLink from '@Assets/externalLink.png'
import sort from '@Assets/sort.png'

interface ISortOrder {
  Age: 'asc' | 'desc'
  Name: 'asc' | 'desc'
  Rank: 'asc' | 'desc'
}

const Table = () => {
  const navigate = useNavigate()

  const tableHeader = ['Name', 'Rank', 'Age', 'Type', 'Points']
  const isFilterableColumn = ['Name', 'Age', 'Rank']

  const [sortOrder, setSortOrder] = useState<ISortOrder>({
    Age: 'asc',
    Name: 'asc',
    Rank: 'asc',
  })

  const [cricketerList, setCricketerList] = useState<TPlayer[]>([])
  const [setsearchByName, setSearchByName] = useState<string>('')
  const [dropDownState, setDropDownState] = useState<string>('')

  const { data: cricketerData, isLoading } = useQuery<TPlayer[]>({
    queryKey: ['AllPlayersDetails'],
    queryFn: getPlayers,
    onSuccess: (data) => {
      const isValidList = !!data && data?.length !== 0
      if (isValidList) {
        setCricketerList(data)
      } else {
        setCricketerList([])
      }
    },
    refetchOnWindowFocus: false,
  })

  const typeList = ['allRounder', 'batsman', 'bowler', 'wicketKeeper']

  const navigateToPlayerDetailsPage = (playerDetails: TPlayer) => {
    navigate('/player-details', { state: playerDetails })
  }

  const filterListByCricketerName = (name: string) => {
    setSearchByName(name)
    if (name) {
      const searchList = cricketerData?.filter((cricketer) =>
        cricketer.name?.toLowerCase()?.includes(name.toLocaleLowerCase()),
      )
      setCricketerList(searchList ?? [])
    } else {
      setCricketerList(cricketerData ?? [])
    }
  }

  const sortListByColumnType = (columnType: string) => {
    if (columnType === 'Age') {
      setCricketerList((prevState) =>
        sortOrder.Age === 'asc'
          ? [...prevState.sort((a, b) => (a.dob ?? 0) - (b.dob ?? 0))]
          : [...prevState.sort((a, b) => (b.dob ?? 0) - (a.dob ?? 0))],
      )
      setSortOrder((prevState) => ({
        ...prevState,
        Age: prevState['Age'] === 'asc' ? 'desc' : 'asc',
      }))
    }
    if (columnType === 'Name') {
      setCricketerList((prevState) => [
        ...prevState.sort((a, b) => {
          if ((a.name ?? '') < (b.name ?? '')) {
            return sortOrder.Name === 'asc' ? 1 : -1
          }
          if ((a.name ?? '') > (b.name ?? '')) {
            return sortOrder.Name === 'asc' ? -1 : 1
          }
          return 0
        }),
      ])
      setSortOrder((prevState) => ({
        ...prevState,
        Name: prevState['Name'] === 'asc' ? 'desc' : 'asc',
      }))
    }
    if (columnType === 'Rank') {
      setCricketerList((prevState) =>
        sortOrder.Rank === 'asc'
          ? [...prevState.sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0))]
          : [...prevState.sort((a, b) => (b.rank ?? 0) - (a.rank ?? 0))],
      )
      setSortOrder((prevState) => ({
        ...prevState,
        Rank: prevState['Rank'] === 'asc' ? 'desc' : 'asc',
      }))
    }
  }
  return (
    <div className="flex flex-col">
      <div className="rounded relative h-96 overflow-y-auto">
        <table className="w-full text-sm text-left text-gray-500 table-auto">
          <thead className="text-sm bg-secondary sticky top-0 z-10">
            <tr>
              {tableHeader.map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-6 py-3 text-textColor"
                >
                  <div
                    className={`flex items-center ${
                      isFilterableColumn.includes(heading)
                        ? 'cursor-pointer select-none'
                        : ''
                    }`}
                    onClick={() =>
                      isFilterableColumn.includes(heading) &&
                      sortListByColumnType(heading)
                    }
                  >
                    <p>{heading}</p>
                    {isFilterableColumn.includes(heading) && (
                      <img
                        src={sort}
                        alt="sort-item"
                        className="icon-color object-contain h-3 ml-3"
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
            <tr>
              <th className="p-2">
                <input
                  type="text"
                  className="font-normal p-2 rounded focus:outline-none text-primary bg-textColor"
                  placeholder="Search By Name"
                  value={setsearchByName}
                  onChange={({ target: { value } }) =>
                    filterListByCricketerName(value)
                  }
                />
              </th>
              <th></th>
              <th></th>
              <th>
                <DropDown
                  dropDownList={typeList}
                  getDropDown={(a) => setDropDownState(a)}
                  dropValue={dropDownState}
                />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className="h-52 overflow-hidden overflow-y-auto">
            {cricketerList.length !== 0 &&
              cricketerList.map((playerDetails) => (
                <tr
                  key={playerDetails.id}
                  className="border-b border-textColor h-10"
                >
                  <th
                    scope="row"
                    title={playerDetails?.name ?? ''}
                    className="px-6 py-4 text-textColor font-medium whitespace-nowrap cursor-pointer hover:font-semibold"
                    onClick={() => navigateToPlayerDetailsPage(playerDetails)}
                  >
                    <div className="w-full flex items-center">
                      <p className="text-ellipsis overflow-hidden w-60">
                        {playerDetails?.name ?? '-'}
                      </p>
                      <img
                        src={externalLink}
                        alt="open-in-external-page"
                        className="icon-color object-contain h-5 ml-3"
                      />
                    </div>
                  </th>
                  <td className="px-6 py-4 text-textColor">
                    {playerDetails?.rank ?? '-'}
                  </td>
                  <td className="px-6 py-4 text-textColor">
                    {getDateByEpoch(playerDetails?.dob ?? 0)}
                  </td>
                  <td className="px-6 py-4 text-textColor">
                    {playerDetails?.type ?? '-'}
                  </td>
                  <td className="px-6 py-4 text-textColor">
                    {playerDetails?.points ?? '-'}
                  </td>
                </tr>
              ))}
            {!isLoading && cricketerList?.length === 0 && (
              <tr className="border-b">
                <td
                  colSpan={5}
                  className="px-6 py-4 text-textColor text-center font-semibold"
                >
                  No Results Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
