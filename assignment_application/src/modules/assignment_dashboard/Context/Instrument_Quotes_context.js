import React, { createContext, useContext, useReducer } from 'react'
import api from '../api'
import axios from 'axios'
import { csvJSON } from '../../../utils'
import {
	ACTION_TYPES as INSTRUMENT_QUOTES_ACTION_TYPES,
	reducer as instrumentQuotesReducer,
	initialState as instumentQuotesState
} from './Instrument_quotes_reducer'

const InstrumentQuotesContext = createContext()
let useInstrument_quotes_context = () => useContext(InstrumentQuotesContext)


const InstrumentQuotesContextProvider = ({ children }) => {

	const [instrumentQuotes, dispatch] = React.useReducer(instrumentQuotesReducer, instumentQuotesState)

	const getQuotes = async (Symbol) => {
		try {
			const baseURL = `${api.quotes}/${Symbol}`
			const response = await axios.get(`${baseURL}`)
			if (response) {
				let json = (response.data && response.data.payload)
				dispatch({
					type: INSTRUMENT_QUOTES_ACTION_TYPES.QUOTES_LIST_SAVE,
					payload: json
				})
				return json
			}
		} catch (err) {
			console.log(err)
		}
	}

	const getInstruments = async () => {
		try {
			const baseURL = api.instruments
			let response = await axios.get(`${baseURL}`)
			if (response) {
				let jsonData = JSON.parse(csvJSON(response.data))
				dispatch({
					type: INSTRUMENT_QUOTES_ACTION_TYPES.INSTRUMENT_LIST_SAVE,
					payload: jsonData
				})
				return jsonData
			}

		} catch (err) {
			console.log(err)
		}
	}

	const saveSymbol = (data) => {
		dispatch({
			type: INSTRUMENT_QUOTES_ACTION_TYPES.CURRENT_SYMBOL,
			payload: data
		})

	}
	const updateValidTill = (data) => {
		dispatch({
			type: INSTRUMENT_QUOTES_ACTION_TYPES.VALID_TILL,
			payload: data
		})

	}

	const values = {
		saveSymbol,
		getQuotes,
		getInstruments,
		updateValidTill,
		...instrumentQuotes
	}

	return (
		<InstrumentQuotesContext.Provider value={values}>
			{children}
		</InstrumentQuotesContext.Provider>
	)
}



export default InstrumentQuotesContextProvider
export { useInstrument_quotes_context }

