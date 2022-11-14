import * as React from 'react';
import { AppTable } from '../../app_structural_module'
import { Grid, Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useInstrument_quotes_context } from '../Context/Instrument_Quotes_context'


export default function Stocks(props) {
 const navigate = useNavigate();
 const [data, setData] = React.useState('')
 const { getInstruments } = useInstrument_quotes_context()


 React.useEffect(() => {
  let payload = getInstruments().then(data => {
   setData(data)
  })
 }, [])

 const rowClickedFunction = (row) => navigate('/quotes', { state: { rowClicked: row.Symbol } })
 return (
  <Grid item sm={3}>
   <Paper elevation={4}   >
    {<AppTable tableData={data} rowClickedFunction={rowClickedFunction} />}
   </Paper>
  </Grid>
 );
}