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

 const getQuotes = () => {
  try {
   const baseURL = `${api.quotes}/${Symbol}`
   axios.get(`${baseURL}`).then((response) => {
    if (response) {
     let json = (response.data && response.data.payload)
     dispatch({
      type: INSTRUMENT_QUOTES_ACTION_TYPES.QUOTES_LIST_SAVE,
      payload: json
     })
    }
   });
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

 const Symbol = (data) => {
  dispatch({
   type: INSTRUMENT_QUOTES_ACTION_TYPES,
   payload: data
  })

 }

 const values = {
  getQuotes,
  getInstruments,
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

