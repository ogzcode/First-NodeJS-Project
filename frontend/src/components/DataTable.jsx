import { useState } from "react"
import PropTypes from 'prop-types';
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table"

import { FaCaretDown, FaCaretUp } from "react-icons/fa6"

import { Input } from "./Input"
import Pagination from "./TablePagination";


export default function DataTable({ data, columns, headerChildren }) {
    const [sorting, setSorting] = useState([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [pagination, setPagination] = useState({ page: 0, pageSize: 10 })
    const table = useReactTable({
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel({}),
        state: {
            sorting,
            globalFilter,
            pagination,
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })


    return (
        <>
            <div className="mb-4 flex justify-between items-center">
                <Input
                    type="text"
                    value={globalFilter}
                    onChange={setGlobalFilter}
                    placeholder="Search"
                    required={false}
                />
                {
                    headerChildren
                }
            </div>
            <div className="overflow-x-auto border border-stone-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left text-stone-700">
                    <thead className="text-sm text-stone-700 bg-stone-50 uppercase font-normal">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <th key={header.id} colSpan={header.colSpan} className="py-4">
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    className={
                                                        header.column.getCanSort()
                                                            ? 'cursor-pointer select-none w-full'
                                                            : 'w-full'
                                                    }
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    title={
                                                        header.column.getCanSort()
                                                            ? header.column.getNextSortingOrder() === 'asc'
                                                                ? 'Sort ascending'
                                                                : header.column.getNextSortingOrder() === 'desc'
                                                                    ? 'Sort descending'
                                                                    : 'Clear sort'
                                                            : undefined
                                                    }
                                                >
                                                    <div className="flex items-center gap-1 relative pl-6">
                                                        {{
                                                            asc: <FaCaretUp className="absolute left-1 text-violet-500 text-xl" />,
                                                            desc: <FaCaretDown className="absolute left-1 text-violet-500 text-xl" />,
                                                        }[header.column.getIsSorted()] ?? null}
                                                        {
                                                            flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                    )
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row, index) => (
                            <tr className={
                                index !== table.getRowModel().rows.length - 1
                                    ? 'border-b border-stone-200'
                                    : ''
                            } key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td className="px-6 py-3 text-base" key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination table={table} />
        </>
    )
}

DataTable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    headerChildren: PropTypes.node,
}