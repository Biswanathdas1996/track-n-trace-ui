import { API_BASE_URL } from "../config";

export function postData(url, data) {
  const myHeaders = new Headers();
  const raw = JSON.stringify(data);
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
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
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(`${API_BASE_URL}${url}`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
}
