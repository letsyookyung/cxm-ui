import axios from "axios";
import qs from "qs";
import jwtDecode from "jwt-decode";

const API_ROOT = window.runConfig.REACT_APP_API_URL;
const AUTH_BAKCEND_ROOT = `${window.runConfig.REACT_APP_AUTH_URL}/backend`;

axios.defaults.paramsSerializer = (params) => qs.stringify(params);
  
  const headers = () => {
    const at = localStorage.getItem("cxmAccessToken");
    const headers = {};
  
    if (at) {
      headers.csrf = "token";
      headers.Authorization = `Bearer ${at}`;
  
      const jwtObj = jwtDecode(at);
  
      if (jwtObj.pri_username != null) headers["X-TRACE-ID"] = jwtObj.aud;
      else headers["X-TRACE-ID"] = null;
    }

    return headers;
  };

  const requests = {
    post: (url, params) => axios.post(`${API_ROOT}${url}`, params, {headers}).then((r) => r.data),
    get: (url, params) => axios.get(`${API_ROOT}${url}`, params, {headers}).then((r) => r.data),
    put: (url, params) => axios.put(`${API_ROOT}${url}`, params, {headers}).then((r) => r.data),
    delete: (url, params) => axios.delete(`${API_ROOT}${url}`, params, {headers}).then((r) => r.data),
  };
  
  const authHeaders = () => {
    const at = localStorage.getItem("cxmAccessToken");
    const headers = {};
  
    if (at) {
      headers["Content-Type"] = "application/json";
      headers.accept = "*/*";
      headers.csrf = "token";
      headers.Authorization = `Bearer ${at}`;
  
      const jwtObj = jwtDecode(at);
  
      if (jwtObj.pri_username != null) headers["X-TRACE-ID"] = jwtObj.aud;
      else headers["X-TRACE-ID"] = null;
    }

    console.log(headers);
  
    return headers;
  };
  
  const authRequests = {
    post: (url, params) => axios.post(`${AUTH_BAKCEND_ROOT}${url}`, params, {authHeaders}).then((r) => r.data),
    get: (url, params) => axios.get(`${AUTH_BAKCEND_ROOT}${url}`, params, {authHeaders}).then((r) => r.data),
    put: (url, params) => axios.put(`${AUTH_BAKCEND_ROOT}${url}`, params, {authHeaders}).then((r) => r.data),
    delete: (url, params) => axios.delete(`${AUTH_BAKCEND_ROOT}${url}`, params, {authHeaders}).then((r) => r.data),
  };

export default {
  requests,
  authRequests,
};