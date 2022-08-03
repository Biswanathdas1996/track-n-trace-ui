import { API_BASE_URL } from "../config";
export function postData(url, data) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(data);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(`${API_BASE_URL}${url}`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
}

export function getData(url) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(`${API_BASE_URL}${url}`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
}
