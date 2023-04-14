// ПРОВЕРКА СТАТУСА
function _responseStatus(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const BASE_URL = "https://auth.nomoreparties.co";

// АВТОРИЗАЦИЯ
export function registerUser(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(_responseStatus);
}

// РЕГИСТРАЦИЯ
export function loginUser(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(_responseStatus);
}

// ПОЛУЧЕНИЕ ТОКЕНА
export function getToken(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(_responseStatus);
}