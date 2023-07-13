import { Table } from '@Components'

const Home = () => {
  return (
    <div className="w-full flex flex-col gap-7 items-center pt-48">
      <div>
        <h1 className="text-xl font-semibold mb-6 text-textColor">
          Welcome to player list
        </h1>
        <Table />
      </div>
    </div>
  )
}
export default Home
