
import axios from 'axios';
const resource = '/auth/singin';

export const auth = (username, password) =>{
    const payload = {username, password};
      return axios.post(`${process.env.REACT_APP_API_URL}${resource}`,payload,{})
        .then((response) => response.data)
        .catch((error) => {
            alert('Credenciales invalidas');
            throw error;
        }) 
}