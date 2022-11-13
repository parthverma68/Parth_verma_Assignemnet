import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from "./app_structural_module/app_components/Layout_assignment"
import Quotes from './assignment_dashboard/Quotes'
import Stocks from './assignment_dashboard/Stocks'

const Assignment_routes = () => {

 return (
  <BrowserRouter>
   <Routes>
    <Route exact path={'/'} element={<Layout />}>
     <Route exact path={'stocks'} element={<Stocks />} />
     <Route exact path={'quotes'} element={<Quotes />} />
    </Route>
   </Routes>
  </BrowserRouter>
 )
}

export default Assignment_routes