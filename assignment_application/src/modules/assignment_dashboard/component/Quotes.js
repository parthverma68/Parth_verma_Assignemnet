// node_module level import goes here

import * as React from 'react';
import { connect } from 'react-redux'

//sourcecode level import goes here
import { AppTable } from '../../app_structural_module';
import { useInstrument_quotes_context } from '../Context/Instrument_Quotes_context'
function Quotes() {

  const { getQuotes, validTill, currentSymbol } = useInstrument_quotes_context()
  const [data, setData] = React.useState('')

  React.useEffect(() => {
    let payload = getQuotes(currentSymbol)
      .then(responseQuotes => setData(responseQuotes[currentSymbol]))
    let pooling = setTimeout(() => {
      let payload = getQuotes(currentSymbol)
        .then(responseQuotes => setData(responseQuotes[currentSymbol]))

    }, validTill);

  }, [])
  return (
    <>
      {<AppTable
        tableData={data}
        heading={"Quotes"} />}
    </>)
}

const mapStateToProps = (state) => {

  return state
}

export default connect(mapStateToProps)(Quotes)