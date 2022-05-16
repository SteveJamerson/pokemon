import axios from 'axios';
import qs from 'qs';

const api = axios.create({
   paramsSerializer: (params: any) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
   },
});

export default api;
