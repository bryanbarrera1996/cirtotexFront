import axios from 'axios';

export const loginApi = () => {
    const headers = {    
      'x-api-key':process.env.REACT_APP_API_KEY,      
    };
    return axios.post(`${process.env.REACT_APP_API_URL}/login/`,{},{headers})
      .then((response) => response.data)
      .catch((error) => {throw error;})  
  }; 