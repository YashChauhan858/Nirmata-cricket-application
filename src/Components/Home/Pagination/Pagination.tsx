interface IPagination {
  totalNumberOfPages: number
  increment: () => void
  decrement: () => void
  setPage: (a: number) => void
  currentPage: number
}

const Pagination = ({
  totalNumberOfPages,
  increment,
  decrement,
  setPage,
  currentPage,
}: IPagination) => {
  console.log(currentPage)
  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <p
            onClick={decrement}
            className="cursor-pointer text-textColor flex items-center justify-center px-3 h-8 ml-0  border rounded-l-lg hover:text-primary hover:bg-textColor transition-all duration-200"
          >
            Previous
          </p>
        </li>
        {totalNumberOfPages > 0 &&
          Array(totalNumberOfPages)
            .fill(1)
            .map((p, index) => (
              <li>
                <p
                  onClick={() => setPage(index + 1)}
                  className={` ${
                    index + 1 === currentPage ? 'text-primary bg-textColor' : ''
                  } cursor-pointer text-textColor flex items-center justify-center px-3 h-8 text-gray-500 bg-white border border-gray-300 hover:text-primary hover:bg-textColor transition-all duration-200`}
                >
                  {index + 1}
                </p>
              </li>
            ))}
        <li>
          <p
            onClick={increment}
            className="cursor-pointer text-textColor flex items-center justify-center px-3 h-8  border rounded-r-lg hover:text-primary hover:bg-textColor transition-all duration-200"
          >
            Next
          </p>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
