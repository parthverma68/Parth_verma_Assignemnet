/* node_module level import goes here */
import * as React from 'react';
import { Grid, Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';

/* sourcecode level import goes here */
import { AppTable } from '../../app_structural_module'

import { useInstrument_quotes_context } from '../Context/Instrument_Quotes_context'


function Stocks() {
 const navigate = useNavigate();
 const [data, setData] = React.useState('')
 const { getInstruments, saveSymbol, updateValidTill } = useInstrument_quotes_context()


 React.useEffect(() => {
  let payload = getInstruments().then(data => {
   setData(data)
   let sortBylowestVAlidTill = data.sort((a, b) => (new Date(a.validTill) - new Date(b.validTill)))
   let pageRefreshTimer = Math.abs(new Date().getTime() - new Date(sortBylowestVAlidTill[0].Validtill).getTime()) / 3600000;
   pageRefreshTimer = Math.floor(pageRefreshTimer * 3600).toPrecision(5)
   updateValidTill(pageRefreshTimer)
  })
 }, [])

 const rowClickedFunction = (row) => {
  saveSymbol(row.Symbol)
  navigate('/quotes', { state: { rowClicked: row.Symbol } })

 }

 return (
  <Grid item sm={3}>
   <Paper elevation={20}   >
    {<AppTable
     tableData={data}
     rowClickedFunction={rowClickedFunction}
     hideColumn={3}
     heading={'Stocks'} />}
   </Paper>
  </Grid>
 );
}

const mapStateToProps = (state) => {

 return state
}

export default connect(mapStateToProps)(Stocks)