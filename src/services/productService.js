import axios from 'axios';
const resource = '/product/';
export const getProducts = () => {
  const headers = {};
  return axios.get(`${process.env.REACT_APP_API_URL}${resource}`, { headers })
    .then((response) => response.data)
    .catch((error) => { throw error; })
};

export const postProducts = (token, payload) => {
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  return axios.post(`${process.env.REACT_APP_API_URL}${resource}`, payload, { headers })
    .then((response) => response.data)
    .catch((error) => {
      alert('Credenciales invalidas');
      throw error;
    })
}

export const patchProducts = (token, payload) => {
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  const id = payload.id;
  delete payload.id;
  return axios.patch(`${process.env.REACT_APP_API_URL}${resource}${id}`, payload, { headers })
    .then((response) => response.data)
    .catch((error) => {
      alert('Credenciales invalidas');
      throw error;
    })
}



export const deleteProducts = (token, productID) => {
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  return axios.delete(`${process.env.REACT_APP_API_URL}${resource}${productID}`, { headers })
    .then((response) => response.data)
    .catch((error) => { throw error; })
};




export const uploadImage = (token, image) => {
  let data = new FormData();
  data.append('file', image, image.name);
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
  };
  return axios.post(`${process.env.REACT_APP_API_URL}${resource}upload/`,{
    file: image
  }, { headers })
    .then((response) => response.data)
    .catch((error) => {
      alert('Credenciales invalidas');
      throw error;
    })
}