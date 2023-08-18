import superagentPromise from "superagent-promise";
import _superagent from "superagent";
import jwtDecode from "jwt-decode";

const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = window.runConfig.REACT_APP_API_URL;
// const { REACT_APP_API_URL } = window["runConfig"];
// const API_ROOT = process.env.REACT_APP_API_URL
const AUTH_BAKCEND_ROOT = `${window.runConfig.REACT_APP_AUTH_URL}/backend`;

const handleErrors = (err) => {
  throw err;
};

// const responseBody = res => res.body;
const responseBody = (res) => {
  if (res.body !== null) {
    return res.body;
  }
  return res.text;
};

const tokenPlugin = (req) => {
  const at = localStorage.getItem("accessToken");

  if (at) {
    req.set("csrf", "token");
    req.set("Authorization", `Bearer ${at}`);

    const jwtObj = jwtDecode(at);

    if (jwtObj.pri_username != null) req.set("X-TRACE-ID", jwtObj.aud);
    else req.set("X-TRACE-ID", null);
  }
};

const requests = {
  del: (url, body) =>
    superagent
      .del(`${API_ROOT}${url}`)
      .withCredentials()
      .send(body)
      .use(tokenPlugin)
      .then(responseBody)
      .catch(handleErrors),
  get: (url, param) =>
    superagent
      .get(`${API_ROOT}${url}`)
      .withCredentials()
      .query(param)
      .use(tokenPlugin)
      .then(responseBody)
      .catch(handleErrors),
  getFile: (url, param) =>
    superagent
      .get(`${API_ROOT}${url}`)
      .responseType("blob")
      .withCredentials()
      .query(param)
      .use(tokenPlugin)
      .then(responseBody)
      .catch(handleErrors),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .withCredentials()
      .use(tokenPlugin)
      .then(responseBody)
      .catch(handleErrors),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .withCredentials()
      .use(tokenPlugin)
      .then(responseBody)
      .catch(handleErrors),
  postFile: (url, param, file) =>
    superagent
      .post(`${API_ROOT}${url}`)
      .withCredentials()
      .query(param)
      .send(file)
      .use(tokenPlugin)
      .then(responseBody)
      .catch(handleErrors),
  patch: (url, body) =>
    superagent
      .patch(`${API_ROOT}${url}`, body)
      .withCredentials()
      .use(tokenPlugin)
      .then(responseBody)
      .catch(handleErrors),
};

const authRequests = {
  del: (url, body) =>
    superagent
      .del(`${AUTH_BAKCEND_ROOT}${url}`)
      .withCredentials()
      .send(body)
      .use(tokenPlugin)
      .then(responseBody)
      .catch(handleErrors),
  get: (url, param) =>
    superagent
      .get(`${AUTH_BAKCEND_ROOT}${url}`)
      .withCredentials()
      .query(param)
      .use(tokenPlugin)
      .then(responseBody)
      .catch(handleErrors),
  put: (url, body) =>
    superagent
      .put(`${AUTH_BAKCEND_ROOT}${url}`, body)
      .withCredentials()
      .use(tokenPlugin)
      .then(responseBody)
      .catch(handleErrors),
  post: (url, body) =>
    superagent
      .post(`${AUTH_BAKCEND_ROOT}${url}`, body)
      .withCredentials()
      .use(tokenPlugin)
      .then(responseBody)
      .catch(handleErrors),
};

export default {
  superagent,
  requests,
  authRequests,
};
