import * as React from 'react';
import { App_Table } from '../../app_structural_module'
import { Grid, Paper } from '@mui/material';
import axios from 'axios';
import { csvJSON } from '../../../utils'
import { useNavigate } from "react-router-dom";

export default function Stocks(props) {
 const navigate = useNavigate();

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
   <Paper elevation={4}   >
    {<App_Table tableData={data} rowClickedFunction={rowClickedFunction} />}
   </Paper>
  </Grid>
 );
}