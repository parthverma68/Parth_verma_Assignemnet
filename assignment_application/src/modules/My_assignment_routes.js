import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { App_Layout } from './app_structural_module'
import { Quotes, Stocks } from './assignment_dashboard'

const Assignment_routes = () => {
 return (
  <BrowserRouter>
   <Routes>
    <Route exact path={'/'} element={<App_Layout />}>
     <Route exact path={'stocks'} element={<Stocks />} />
     <Route exact path={'quotes'} element={<Quotes />} />
    </Route>
   </Routes>
  </BrowserRouter>
 )
}

export default Assignment_routes