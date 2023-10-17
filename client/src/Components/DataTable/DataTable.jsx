import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import PropTypes from "prop-types";

import "./DataTable.scss";

const DataTable = ({ tableData, columns, expandedContent, mainTable }) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div
      className={`table-component-container ${mainTable ? "" : "sub-table"}`}
    >
      {mainTable && (
        <input
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="filter-input"
          placeholder="Search"
        />
      )}

      <table className="table-container">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: "🔼", desc: "🔽" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row, rowIndex) => (
            <>
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {expandedContent && (
                <tr key={`expanded-${rowIndex}`}>
                  <td colSpan={columns.length}>
                    {expandedContent(row.original)}
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
      {mainTable && tableData?.length > 10 && (
        <div className="button-container">
          <button onClick={() => table.setPageIndex(0)}>First page</button>
          <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            Previous page
          </button>
          <button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Next page
          </button>
          <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
            Last page
          </button>
        </div>
      )}
    </div>
  );
};

DataTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  expandedContent: PropTypes.func,
  mainTable: PropTypes.bool,
};

export default DataTable;
