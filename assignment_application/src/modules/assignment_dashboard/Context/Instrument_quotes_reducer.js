/**
   * Action types
   * all action subscriobed to stocks and quotes page
    */
const ACTION_TYPES = {
	INSTRUMENT_LIST_SAVE: 'app/Instrument/saveInstrumentList',
	QUOTES_LIST_SAVE: 'app/Quotes/QuotesList',
	CURRENT_SYMBOL: 'app/Quotes/Symbol',
	VALID_TILL: 'app/Quotes/ValidTill'

}
/**
    * initialState
    * initial state of stocks and quotes 
     */
const initialState = {
	instrumentList: [],
	quotesList: [],
	currentSymbol: '',
	validTill: ''
}
/**
    *@function reducer
    * @param state {object}
    * @param action {object}
    * maintain state
    * specify data and maping for table
   */
const reducer = (state = initialState, action = {}) => {

	const { type, payload } = action
	switch (type) {
		case ACTION_TYPES.INSTRUMENT_LIST_SAVE: {
			return {
				...state,
				instrumentList: payload
			}
		}
		case ACTION_TYPES.QUOTES_LIST_SAVE: {
			return {
				...state,
				quotesList: payload
			}
		}
		case ACTION_TYPES.CURRENT_SYMBOL: {
			return {
				...state,
				currentSymbol: payload
			}
		}
		case ACTION_TYPES.VALID_TILL: {
			return {
				...state,
				validTill: payload
			}
		}
		default:
			return state

	}

}

export { ACTION_TYPES, reducer, initialState }