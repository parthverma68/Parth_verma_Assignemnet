/* node_module level import goes here */
import * as React from 'react'
import { Grid, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

/* sourcecode level import goes here */
import { AppTable } from '../../app_structural_module'
import { useInstrument_quotes_context } from '../Context/Instrument_Quotes_context'

/**
 * @component
 * represents Stocks page 
 * current Landing page
 * have One instrument request to get all stocks
 * have a timer function to get expiry time of quots page
 */
function Stocks() {
	const navigate = useNavigate()
	const [data, setData] = React.useState('')
	const { getInstruments, saveSymbol, updateValidTill } = useInstrument_quotes_context()

	React.useEffect(() => {
		let payload = getInstruments().then(data => {
			let myTableDataFiltered = data.filter(e => e.Symbol !== '')
			setData(myTableDataFiltered)
			let sortBylowestVAlidTill = data.sort((a, b) => (new Date(a.validTill) - new Date(b.validTill)))
			let timer = getPageRefreshTimer(sortBylowestVAlidTill)
			updateValidTill(timer)
		})
	}, [])

	/**
   * @function
   * @parms {Array}
   * have a timer function to get expiry time of quots page
   */
	const getPageRefreshTimer = (data) => {
		let pageRefreshTimerHour = new Date(data[0].Validtill).getHours()
		let pageRefreshTimerMin = new Date(data[0].Validtill).getMinutes()
		let pageRefreshTimer = pageRefreshTimerHour * 3600 + pageRefreshTimerMin * 60
		return (pageRefreshTimer * 1000)
	}
	/**
     * @function
     * @parms {Array}
     * get the information of row clicked in Stocks table
     */
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
	)
}

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps)(Stocks)