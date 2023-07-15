import {
  TPlayer,
  divideArrayIntoChunks,
  getDateByEpoch,
  getPlayers,
} from '@Utils'
import { useQuery } from '@tanstack/react-query'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
/** ---------------- @Components --------------------- */
import { DropDown } from '@Components'

/** ---------------- @Images_Icons ------------------- */
import externalLink from '@Assets/externalLink.png'
import sort from '@Assets/sort.png'
import Pagination from '../Pagination/Pagination'

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

  const [cricketerList, setCricketerList] = useState<TPlayer[][]>([[]])
  const [setsearchByName, setSearchByName] = useState<string>('')
  const [dropDownState, setDropDownState] = useState<string>('All')
  const [paginationState, setPaginationState] = useState({
    currentPage: 1,
    totalNumberOfPages: 0,
    pageSize: 10,
  })

  const incrementPage = () =>
    setPaginationState((prevState) => ({
      ...prevState,
      currentPage:
        prevState.currentPage === prevState.totalNumberOfPages
          ? prevState.currentPage
          : prevState.currentPage + 1,
    }))
  const decrementPage = () =>
    setPaginationState((prevState) => ({
      ...prevState,
      currentPage:
        prevState.currentPage === 1
          ? prevState.currentPage
          : prevState.currentPage - 1,
    }))
  const selectPageFromPaginationList = (page: number) =>
    setPaginationState((prevState) => ({
      ...prevState,
      currentPage: page,
    }))

  const { data: cricketerData, isLoading } = useQuery<TPlayer[]>({
    queryKey: ['AllPlayersDetails'],
    queryFn: getPlayers,
    onSuccess: (data) => {
      const isValidList = !!data && data?.length !== 0
      if (isValidList) {
        setCricketerList(divideArrayIntoChunks(data, paginationState.pageSize))
        setPaginationState((prevState) => ({
          ...prevState,
          currentPage: 1,
          totalNumberOfPages: Math.ceil(data.length / paginationState.pageSize),
        }))
      } else {
        setCricketerList([[]])
      }
    },
    refetchOnWindowFocus: false,
  })

  const typeList = ['All', 'allRounder', 'batsman', 'bowler', 'wicketKeeper']
  const onDropDownStateChangeHandler = (cricketerType: string) => {
    const dividedData = divideArrayIntoChunks(
      cricketerData ?? [],
      paginationState.pageSize,
    )
    if (cricketerType === 'All') {
      setCricketerList(dividedData)
    } else {
      setCricketerList((prevState) => {
        prevState[paginationState.currentPage - 1] = dividedData[
          paginationState.currentPage - 1
        ].filter((details) => details.type === cricketerType)
        return [...prevState]
      })
    }
    setDropDownState(cricketerType)
  }

  const navigateToPlayerDetailsPage = (playerDetails: TPlayer) => {
    navigate('/player-details', { state: playerDetails })
  }

  const filterListByCricketerName = (name: string) => {
    setSearchByName(name)
    const dividedData = divideArrayIntoChunks(
      cricketerData ?? [],
      paginationState.pageSize,
    )
    if (name) {
      setCricketerList((prevState) => {
        prevState[paginationState.currentPage - 1] = dividedData[
          paginationState.currentPage - 1
        ]?.filter((cricketer) =>
          cricketer.name?.toLowerCase()?.includes(name.toLocaleLowerCase()),
        )
        return [...prevState]
      })
    } else {
      setCricketerList(dividedData)
    }
  }

  const sortListByColumnType = (columnType: string) => {
    const dividedData = divideArrayIntoChunks(
      cricketerData ?? [],
      paginationState.pageSize,
    )
    if (columnType === 'Age') {
      setCricketerList((prevState) => {
        prevState[paginationState.currentPage - 1] =
          sortOrder.Age === 'asc'
            ? dividedData[paginationState.currentPage - 1].sort(
                (a, b) => (a.dob ?? 0) - (b.dob ?? 0),
              )
            : dividedData[paginationState.currentPage - 1].sort(
                (a, b) => (b.dob ?? 0) - (a.dob ?? 0),
              )
        return [...prevState]
      })
      setSortOrder((prevState) => ({
        ...prevState,
        Age: prevState['Age'] === 'asc' ? 'desc' : 'asc',
      }))
    }
    if (columnType === 'Name') {
      setCricketerList((prevState) => {
        prevState[paginationState.currentPage - 1] = dividedData[
          paginationState.currentPage - 1
        ].sort((a, b) => {
          if ((a.name ?? '') < (b.name ?? '')) {
            return sortOrder.Name === 'asc' ? 1 : -1
          }
          if ((a.name ?? '') > (b.name ?? '')) {
            return sortOrder.Name === 'asc' ? -1 : 1
          }
          return 0
        })
        return [...prevState]
      })
      setSortOrder((prevState) => ({
        ...prevState,
        Name: prevState['Name'] === 'asc' ? 'desc' : 'asc',
      }))
    }
    if (columnType === 'Rank') {
      setCricketerList((prevState) => {
        prevState[paginationState.currentPage - 1] =
          sortOrder.Rank === 'asc'
            ? dividedData[paginationState.currentPage - 1].sort(
                (a, b) => (a.rank ?? 0) - (b.rank ?? 0),
              )
            : dividedData[paginationState.currentPage - 1].sort(
                (a, b) => (b.rank ?? 0) - (a.rank ?? 0),
              )
        return [...prevState]
      })
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
                  getDropDown={onDropDownStateChangeHandler}
                  dropValue={dropDownState}
                />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className="h-52 overflow-hidden overflow-y-auto">
            {cricketerList[paginationState.currentPage - 1].length !== 0 &&
              cricketerList[paginationState.currentPage - 1].map(
                (playerDetails) => (
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
                ),
              )}
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
      <div className="ml-auto mt-3">
        <Pagination
          totalNumberOfPages={paginationState.totalNumberOfPages}
          currentPage={paginationState.currentPage}
          increment={incrementPage}
          decrement={decrementPage}
          setPage={(page) => selectPageFromPaginationList(page)}
        />
      </div>
    </div>
  )
}

export default Table
