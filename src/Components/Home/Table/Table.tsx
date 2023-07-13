import { getDateByEpoch, getPlayers } from '@Utils'
import { useQuery } from '@tanstack/react-query'

const Table = () => {
  const tableHeader = ['Name', 'Type', 'Points', 'Rank', 'Age']

  const { data, isLoading } = useQuery({
    queryKey: ['AllPlayersDetails'],
    queryFn: getPlayers,
  })
  const isValidList = !!data && data?.length !== 0 && !isLoading
  return (
    <div className="flex flex-col">
      <div className="rounded relative h-96 overflow-y-auto">
        <table className="w-full text-sm text-left text-gray-500 table-auto">
          <thead className="text-sm bg-secondary sticky top-0">
            <tr>
              {tableHeader.map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-6 py-3 text-textColor"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="h-52 overflow-hidden overflow-y-auto">
            {isValidList &&
              data.map((playerDetails) => (
                <tr key={playerDetails.id} className="bg-white border-b">
                  <th
                    scope="row"
                    title={playerDetails?.name ?? ''}
                    className="px-6 py-4 text-textColor font-medium whitespace-nowrap cursor-pointer hover:font-semibold"
                  >
                    <p className="w-60 text-ellipsis overflow-hidden">
                      {playerDetails?.name ?? '-'}
                    </p>
                  </th>
                  <td className="px-6 py-4 text-textColor">
                    {playerDetails?.type ?? '-'}
                  </td>
                  <td className="px-6 py-4 text-textColor">
                    {playerDetails?.points ?? '-'}
                  </td>
                  <td className="px-6 py-4 text-textColor">
                    {playerDetails?.rank ?? '-'}
                  </td>
                  <td className="px-6 py-4 text-textColor">
                    {getDateByEpoch(playerDetails?.dob ?? 0)}
                  </td>
                </tr>
              ))}
            {!isLoading && data?.length === 0 && (
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
