// node_module level import goes here
import React, { useEffect, useMemo, useState } from 'react'
import MaterialReactTable from 'material-react-table'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

/** 
 * @compoennt App_Table
 * @param tableData {Array}
 * @param rowClickedFunction {function}
 * @param hideColumn  {number}
 * @param heading {string}
 * create table with all the inbuild functionality
 */
const App_Table = ({ tableData, rowClickedFunction, hideColumn, heading }) => {
	//data and fetching state
	const [data, setData] = useState(tableData)

	// const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false)
	const [isRefetching, setIsRefetching] = useState(false)
	// const [rowCount, setRowCount] = useState(10);

	//table state
	const [columnFilters, setColumnFilters] = useState([])
	const [globalFilter, setGlobalFilter] = useState('')
	const [sorting, setSorting] = useState([])
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	})

	//if you want to avoid useEffect, look at the React Query example instead
	useEffect(() => {
		const fetchData = async () => {
			if ((!tableData.length || !data.length)) {
				setIsLoading(true)
			} else {
				setIsRefetching(true)
			}
			if ((tableData.length > 0 || data.length > 0)) {
				setData(tableData)
				setIsLoading(false)
				setIsRefetching(false)
			}
		}
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
    columnFilters,
    globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
    tableData
  ])

	/**
    * @function getRowClickFunction
    * @parms {object}
    * get value of row clicked
    */
	const getRowClickFunction = (row) => {
		rowClickedFunction && rowClickedFunction(row.original)
	}

	/**
      *@function createColumn
      * create column based on the data 
      * specify data and maping for table
     */
	const createColumn = () => {

		if (data && data.length > 0) {
			let keys = data && data.length > 0 && Object.keys(data[0])
			hideColumn && keys.splice(hideColumn, 1)
			let columConfig = keys.map((e, i) =>
				(
					{
						accessorKey: e,
						header: e,
						size: 250,
						Cell: ({ cell, row }) => (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '1rem',
								}}
							>
								{i == 0 ? <Typography style={{
									cursor: heading !== 'Quotes' ? 'pointer' : ''
								}}
								onClick={() => getRowClickFunction(cell.row)}>{cell.getValue()}
								</Typography> : <Typography>{cell.getValue()}
								</Typography>}
							</Box >
						),
					}
				))
			return columConfig
		}
		else {
			return []
		}
	}

	const columns = useMemo(
		createColumn, [data]
	)


	return (
		<MaterialReactTable
			columns={columns}
			data={data}
			state={{
				isLoading
			}}
			enableColumnActions={false}
			enableColumnFilters={true}
			enablePagination={true}
			enableSorting={true}
			enableBottomToolbar={true}
			enableTopToolbar={true}
			muiTableBodyRowProps={{ hover: true }}
			renderTopToolbarCustomActions={({ table }) => {
				return (
					<div style={{
						display: 'flex',
						gap: '4.5rem',
						margin: '.5rem',
						fontWeight: '700',
					}}>
						{heading}
					</div>
				)
			}

			}

		/>
	)
}

export default App_Table