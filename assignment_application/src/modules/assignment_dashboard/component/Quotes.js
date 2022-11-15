/** node_module level import goes here */
import * as React from 'react'
import { Grid, Paper } from '@mui/material'

/**  sourcecode level import goes here */
import { AppTable } from '../../app_structural_module'
import { useInstrument_quotes_context } from '../Context/Instrument_Quotes_context'

function Quotes() {
	const { getQuotes, validTill, currentSymbol } = useInstrument_quotes_context()
	const [data, setData] = React.useState('')
	/**
      * @function 
      * get Quotes from API
      * filter and sort data based on validity
      * set timer for refresh once validity is expired 
       */
	React.useEffect(() => {
		let payload = getQuotes(currentSymbol)
			.then(responseQuotes => {
				console.log(validTill)
				let tableDataFiltered = responseQuotes[currentSymbol]
					.map(e => ({ price: Math.fround(e.price).toFixed(2), time: e.time, valid_till: e.valid_till }))
				setData(tableDataFiltered)
			})
		let refreshTimer = setTimeout(() => {
			let payload = getQuotes(currentSymbol)
				.then(responseQuotes => {
					let tableDataFiltered = responseQuotes[currentSymbol]
						.map(e => ({ price: Math.fround(e.price).toFixed(2), time: e.time, valid_till: e.valid_till }))
					setData(tableDataFiltered)
				})
		}, validTill * 1000)

		return () => {
			clearTimeout(refreshTimer)
		}
	}, [])

	return (
		<Grid item sm={3}>
			<Paper elevation={20}   >
				{<AppTable
					tableData={data}
					heading={'Quotes'}
				/>}
			</Paper>
		</Grid>
	)

}


export default Quotes