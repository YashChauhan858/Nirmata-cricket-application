import { TPlayer } from '@Utils'
/** ---------------- @Images_Icons ------------------- */
import externalLink from '@Assets/externalLink.png'
import { useNavigate } from 'react-router-dom'

interface ISimilarPlayers {
  tableData: TPlayer[]
  typeToSeparate: string
}

const SimilarPlayers = ({ tableData, typeToSeparate }: ISimilarPlayers) => {
  const navigate = useNavigate()

  const listToDisplay =
    tableData?.filter((details) => details.type === typeToSeparate) ?? []

  const tableHeader = ['Name', 'Points', 'Rank']

  const navigateToPlayerDetailsPage = (playerDetails: TPlayer) => {
    navigate('/player-details', { state: playerDetails })
  }

  return !!listToDisplay && listToDisplay?.length !== 0 ? (
    <>
      <h1 className="w-full font-semibold text-lg text-textColor whitespace-nowrap mb-1">
        Players you might want to know more about
      </h1>
      <p className="text-textColor text-sm whitespace-nowrap mb-3">
        Click on the player you want to know more about
      </p>
      <table className="w-full text-sm text-left text-gray-500 table-auto">
        <thead className="text-sm bg-secondary sticky top-0 z-10">
          <tr>
            {tableHeader.map((heading) => (
              <th
                key={heading}
                scope="col"
                className="px-6 py-3 text-textColor"
              >
                <div className="flex items-center">
                  <p>{heading}</p>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="h-52 overflow-hidden overflow-y-auto">
          {listToDisplay.length !== 0 &&
            listToDisplay.map((playerDetails) => (
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
                      alt="sort-item"
                      className="icon-color object-contain h-4 ml-3"
                    />
                  </div>
                </th>
                <td className="px-6 py-4 text-textColor">
                  {playerDetails?.points ?? '-'}
                </td>
                <td className="px-6 py-4 text-textColor">
                  {playerDetails?.rank ?? '-'}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  ) : (
    <></>
  )
}

export default SimilarPlayers
