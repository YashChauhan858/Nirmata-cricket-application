import { TPlayer, getDateByEpoch, getPlayers } from '@Utils'
import { useQuery } from '@tanstack/react-query'

/** ---------------- @Images_Icons ------------------- */
import externalLink from '@Assets/externalLink.png'
import { useNavigate } from 'react-router-dom'

const Table = () => {
  const navigate = useNavigate()

  const tableHeader = ['Name', 'Type', 'Points', 'Rank', 'Age']

  const { data, isLoading } = useQuery({
    queryKey: ['AllPlayersDetails'],
    queryFn: getPlayers,
  })
  const isValidList = !!data && data?.length !== 0 && !isLoading

  const navigateToPlayerDetailsPage = (playerDetails: TPlayer) => {
    navigate('/player-details', { state: playerDetails })
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
