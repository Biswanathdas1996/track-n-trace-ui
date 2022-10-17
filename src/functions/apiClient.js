// import { result } from "lodash";
import { API_BASE_URL, AUTH_URL, LOCAL_BASE_URL } from "../config";

export function getAuthToken() {
  return fetch(`${AUTH_URL}${"/GetConfig.php"}`)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
}

export function postData(url, data, authKey, localURL) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  if (authKey) {
    myHeaders.append("app-config-token", authKey);
  }
  var raw = JSON.stringify(data);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  return fetch(
    localURL ? `${LOCAL_BASE_URL}${url}` : `${API_BASE_URL}${url}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
}

export function getData(url, authKey, localURL) {
  var myHeaders = new Headers();
  if (authKey) {
    myHeaders.append("app-config-token", authKey);
  }
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    localURL ? `${LOCAL_BASE_URL}${url}` : `${API_BASE_URL}${url}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
}

export const getAuthData = async (url) => {
  const token = await getAuthToken();
  return await getData(url, token);
};

export const getAuthDataPost = async (url, data) => {
  const token = await getAuthToken();
  return await postData(url, data, token);
};
