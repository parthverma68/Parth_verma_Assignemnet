import * as React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { AppTable } from '../../app_structural_module';

export default function Quotes() {
  const location = useLocation();
  const [data, setData] = React.useState('')
  let Symbol = location && location.state && location.state.rowClicked

  const getData = () => {
    try {
      const baseURL = `https://prototype.sbulltech.com/api/v2/quotes/${Symbol}`
      axios.get(`${baseURL}`).then((response) => {
        if (response) {
          let json = (response.data && response.data.payload)

          setData(json[Symbol])
        }
      });
    } catch (err) {
      console.log(err)
    }
  }

  React.useEffect(() => {
    getData()

  }, [Symbol])


  return (
    <>
      {data && <AppTable tableData={data} />}
    </>)
}