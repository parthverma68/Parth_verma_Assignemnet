import Layout from "./app_structural_module/app_components/Layout_assignment"
import Quotes from './assignment_dashboard/Quotes'
import Stocks from './assignment_dashboard/Stocks'
const Assignment_routes = () => {

 return (
  <Layout>
   <Stocks />
   <Quotes />
  </Layout>
 )
}

export default Assignment_routes