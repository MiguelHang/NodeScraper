import Axios from 'axios'

const MotoService = {
  
  getMotos: (params) =>{
    return Axios.post('http://localhost:2019/api/scan',
    {
      "model": params.model,
      "location": params.location,
      "brand": params.brand
    },{
      headers: {
             'Content-Type': 'application/json'
      }
    }).then((response) => {
     return response
   })
 }
};

export default MotoService