import React, { useEffect, useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';

import { Box } from '@mui/system';
import { Typography } from '@mui/material';


const Table = ({ tableData, rowClickedFunction }) => {
 //data and fetching state
 const [data, setData] = useState(tableData);

 // const [isError, setIsError] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 // const [isRefetching, setIsRefetching] = useState(false);
 // const [rowCount, setRowCount] = useState(10);

 //table state
 const [columnFilters, setColumnFilters] = useState([]);
 const [globalFilter, setGlobalFilter] = useState('');
 const [sorting, setSorting] = useState([]);
 const [pagination, setPagination] = useState({
  pageIndex: 0,
  pageSize: 10,
 });

 //if you want to avoid useEffect, look at the React Query example instead
 useEffect(() => {
  const fetchData = async () => {
   if ((!tableData.length || !data.length)) {
    setIsLoading(true);
   } else {
    setIsRefetching(true);
   }
   if ((tableData.length > 0 || data.length > 0)) {
    setData(tableData)
    setIsLoading(false);
    setIsRefetching(false);
   }
  };
  fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [
  columnFilters,
  globalFilter,
  pagination.pageIndex,
  pagination.pageSize,
  sorting,
  tableData
 ]);

 const getRowClickFunction = (cell, index, row) => {
  console.log("i mam workinf")
  rowClickedFunction && rowClickedFunction(row.original)

 }

 const createColumn = () => {
  if (data && data.length > 0) {
   let keys = data && data.length > 0 && Object.keys(data[0])

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
       {i == 0 ? <Typography style={{ cursor: "pointer" }}
        onClick={() => getRowClickFunction(cell.getValue(), i, cell.row)}>{cell.getValue()}
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
  createColumn,
  [data],
 );


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

  />
 );
};

export default Table;