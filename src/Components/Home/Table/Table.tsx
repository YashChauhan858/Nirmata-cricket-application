const Table = () => {
  const tableHeader = ['Name', 'Type', 'Points', 'Rank', 'Age']

  return (
    <div className="flex flex-col">
      <div className="rounded relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-sm bg-secondary">
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
          <tbody>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 text-textColor font-medium whitespace-nowrap "
              >
                1
              </th>
              <td className="px-6 py-4 text-textColor">2</td>
              <td className="px-6 py-4 text-textColor">3</td>
              <td className="px-6 py-4 text-textColor">4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
