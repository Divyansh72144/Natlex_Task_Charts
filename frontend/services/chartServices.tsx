import axios from 'axios';

const BASE_URL = 'http://localhost:5174/api/charts';

const get = (id:string) => {
  return axios.get(`${BASE_URL}/${id}`);
};

const getAll = () => {
  return axios.get(BASE_URL);
};

const create = (newObject: unknown) => {
  return axios.post(BASE_URL, newObject);
};

const remove = (id: string) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

const update = (id: string, newObject: unknown) => {
  return axios.put(`${BASE_URL}/${id}`, newObject);
};

const chartServices = {
  getAll,
  create,
  remove,
  update,
  get
};

export default chartServices;
