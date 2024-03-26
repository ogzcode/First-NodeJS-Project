import PropTypes from 'prop-types'
import { FaAngleLeft, FaAnglesLeft, FaAnglesRight, FaAngleRight } from 'react-icons/fa6';

export default function Pagination({ table }) {

    function getVisiblePageNumbers() {
        const currentPage = table.getState().pagination.pageIndex;
        const totalPages = table.getPageCount();
        const visiblePages = Math.min(5, totalPages);

        const startIndex = Math.max(Math.min(currentPage - 2, totalPages - visiblePages), 0);
        const endIndex = Math.min(startIndex + visiblePages - 1, totalPages - 1);

        return Array.from({ length: endIndex - startIndex + 1 }, (_, i) => startIndex + i);
    }

    const baseStyle = "flex items-center justify-center w-8 h-8 rounded-md ms-0 cursor-pointer"

    return (
        <div className="flex items-center justify-between pt-8">
            <div className='flex items-center gap-8'>
                <span className="flex items-center gap-1 text-stone-800">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount().toLocaleString()}
                    </strong>
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                    className="rounded-md px-2 h-8 border text-center border-stone-300 text-stone-800 bg-white transition focus:border-stone-400"
                >
                    {[1, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}
                            className="text-stone-700 text-center"
                        >
                            {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex items-center gap-2 font-medium'>
                <button
                    className={baseStyle + " text-violet-500 bg-violet-50"}
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <FaAnglesLeft />
                </button>
                <button
                    className={baseStyle + " text-violet-500 bg-violet-50"}
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <FaAngleLeft />
                </button>
                {
                    getVisiblePageNumbers().map((pageNumber) => (
                        <button
                            key={pageNumber}
                            className={`${pageNumber === table.getState().pagination.pageIndex ? baseStyle + " text-white bg-violet-500" : baseStyle + " text-violet-500 bg-violet-50"}`}
                            onClick={() => table.setPageIndex(pageNumber)}
                        >
                            {pageNumber + 1}
                        </button>
                    ))
                }
                <button
                    className={baseStyle + " text-violet-500 bg-violet-50"}
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <FaAngleRight />
                </button>
                <button
                    className={baseStyle + " text-violet-500 bg-violet-50"}
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <FaAnglesRight />
                </button>
            </div>
        </div>
    )
}

Pagination.propTypes = {
    table: PropTypes.object
}