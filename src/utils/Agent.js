import axios from "axios";
import qs from "qs";
import jwtDecode from "jwt-decode";

const API_ROOT = window.runConfig.REACT_APP_API_URL;
const AUTH_BAKCEND_ROOT = `${window.runConfig.REACT_APP_AUTH_URL}/backend`;

axios.defaults.paramsSerializer = (params) => qs.stringify(params);

  const headers = () => {
    const at = window.localStorage.getItem("cxmAccessToken");
    const headers = {};
    
    if (at) {
      headers["Content-Type"] = "application/json";
      headers.accept = "*/*";
      headers.csrf = "token";
      headers.Authorization = `Bearer ${at}`;
      const jwtObj = jwtDecode(at);
      if (jwtObj.pri_username) headers["X-TRACE-ID"] = jwtObj.aud;
      else headers["X-TRACE-ID"] = null;
    }
    
    return headers;
  };

  // 기본 API 서버로 요청
  const requests = {
    post: (url, data) => {
      const header = headers();
      const config = { headers: header };
      return axios.post(`${API_ROOT}${url}`, data, config).then((r) => r.data);
    },
    get: (url, params) => {
      const header = headers();
      const config = { params, headers: header };
      return axios.get(`${API_ROOT}${url}`, config).then((r) => r.data);
    },
    put: (url, data) => {
      const header = headers();
      const config = { headers: header };
      return axios.put(`${API_ROOT}${url}`, data, config).then((r) => r.data);
    },
    delete: (url, data) => {
      const header = headers();
      const config = { headers: header, data: data };
      return axios.delete(`${API_ROOT}${url}`, config).then((r) => r.data);
    }
  };
  
  const authHeaders = () => {
    const at = window.localStorage.getItem("cxmAccessToken");
    const headers = {};
  
    if (at) {
      headers["Content-Type"] = "application/json";
      headers.accept = "*/*";
      headers.csrf = "token";
      headers.Authorization = `Bearer ${at}`;
      const jwtObj = jwtDecode(at);
      if (jwtObj.pri_username) headers["X-TRACE-ID"] = jwtObj.aud;
      else headers["X-TRACE-ID"] = null;
    }

    return headers;
  };

  // 인증서버로 요청
  const authRequests = {
    post: (url, data) => {
      const header = authHeaders();
      const config = { headers: header };
      return axios.post(`${AUTH_BAKCEND_ROOT}${url}`, data, config).then((r) => r.data);
    },
    get: (url, params) => {
      const header = authHeaders();
      const config = { params, headers: header };
      return axios.get(`${AUTH_BAKCEND_ROOT}${url}`, config).then((r) => r.data);
    },
    put: (url, data) => {
      const header = authHeaders();
      const config = { headers: header };
      return axios.put(`${AUTH_BAKCEND_ROOT}${url}`, data, config).then((r) => r.data);
    },
    delete: (url, data) => {
      const header = authHeaders();
      const config = { headers: header, data: data };
      return axios.delete(`${AUTH_BAKCEND_ROOT}${url}`, config).then((r) => r.data);
    }
  };

export default {
  requests,
  authRequests,
};