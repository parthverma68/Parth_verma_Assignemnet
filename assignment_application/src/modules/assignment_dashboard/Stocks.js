import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TableApp from '../app_structural_module/app_components/Table_assignment';
import { Grid, Paper } from '@mui/material';
import axios from 'axios';
import { csvJSON } from '../../utils'
import { Navigate, useNavigate } from "react-router-dom";

export default function Stocks(props) {
 const navigate = useNavigate();
 const [isRowClicked, setIsRowClicked] = React.useState(false)
 const [rowClicked, setClickedRowInfo] = React.useState('')
 const [data, setData] = React.useState('')


 React.useEffect(() => {

  getData()

 }, [])

 const getData = () => {
  try {
   const baseURL = 'https://prototype.sbulltech.com/api/v2/instruments'
   axios.get(`${baseURL}`).then((response) => {
    if (response) {
     let json = JSON.parse(csvJSON(response.data))
     setData(json);
    }
   });
  } catch (err) {
   console.log(err)
  }
 }

 const rowClickedFunction = (row) => navigate('/quotes', { state: { rowClicked: row.Symbol } })






 return (
  <Grid sm={3}>
   <Paper elevation={4}
   >
    {<TableApp tableData={data} rowClickedFunction={rowClickedFunction} />}


   </Paper>
  </Grid>
 );
}