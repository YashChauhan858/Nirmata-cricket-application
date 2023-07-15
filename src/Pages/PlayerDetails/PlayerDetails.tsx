import { TPlayer, getDateByEpoch, getPlayers } from '@Utils'
/** ---------------- @Image_Icons ----------------- */
import backButton from '@Assets/backButton.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { SimilarPlayers } from '@Components'

const PlayerDetails = () => {
  const location = useLocation()
  const playerData = location.state as TPlayer

  const navigate = useNavigate()

  const navigateBackToList = () => navigate('/', { replace: true })

  const { data: cricketerData } = useQuery<TPlayer[]>({
    queryKey: ['AllPlayersDetails'],
    queryFn: getPlayers,
    refetchOnWindowFocus: false,
  })

  return (
    <div className="w-full h-full p-10  flex gap-3">
      <div className="rounded-lg bg-secondary w-3/5 p-10 pb-14">
        <div className="flex gap-2 mb-10 ">
          <div
            className="bg-primary flex items-center rounded-sm"
            onClick={navigateBackToList}
          >
            <img
              src={backButton}
              alt="back-button"
              className="object-contain h-5 icon-color cursor-pointer"
            />
          </div>
          <h1 className="text-textColor text-2xl font-semibold bg-primary w-full rounded-sm pl-4">
            Player Details
          </h1>
        </div>
        <div className="flex">
          <div className="w-3/12">
            <p className="font-semibold pl-1 h-16 text-textColor text-base">
              Name:
            </p>
            <p className="font-semibold pl-1 h-16 text-textColor text-base">
              Type:
            </p>
            <p className="font-semibold pl-1 h-16 text-textColor text-base">
              Points:
            </p>
            <p className="font-semibold pl-1 h-16 text-textColor text-base">
              Dob:
            </p>
            <p className="font-semibold pl-1 h-16 text-textColor text-base">
              Description:
            </p>
          </div>
          <div className="w-3/4">
            <p className="text-textColor text-base h-16">
              {playerData?.name ?? '-'}
            </p>
            <p className="text-textColor text-base h-16">
              {playerData?.type ?? '-'}
            </p>
            <p className="text-textColor text-base h-16">
              {playerData?.points ?? '-'}
            </p>
            <p className="text-textColor text-base h-16">
              {getDateByEpoch(playerData?.dob ?? 0)}
            </p>
            <p className="text-textColor text-base h-16 pb-24">
              {playerData?.description ?? '-'}
            </p>
          </div>
        </div>
      </div>
      <div className="w-20">
        <SimilarPlayers
          tableData={cricketerData ?? []}
          typeToSeparate={playerData.type ?? ''}
        />
      </div>
    </div>
  )
}

export default PlayerDetails
