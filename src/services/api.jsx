import axios from 'axios';

const token = '199|qDbhbr9cBRjb1ieGr4xjQYNnsyNaZWuplToN0Bw5';

const api = axios.create({
  baseURL: 'http://drwell-dev-api.mtechsp.com.br/api',
  timeout: 4000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
