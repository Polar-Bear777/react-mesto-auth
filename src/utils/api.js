// Запросы к серверу
export class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._headers = this._options.headers;
  }

  // Статус ответа
  _responseStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._responseStatus(res));
  }

  // Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._responseStatus(res));
  }

  // Редактирование профиля
  editUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "c7a7f9e2-add2-49e1-b302-3362c55f30ce",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._responseStatus(res));
  }

  // Добавление новой карточки через попап
  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: "c7a7f9e2-add2-49e1-b302-3362c55f30ce",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._responseStatus(res));
  }

  // Обновление аватара пользователя
  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => this._responseStatus(res));
  }

  // Удаление карточки
  handleDeleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: "c7a7f9e2-add2-49e1-b302-3362c55f30ce",
        "Content-Type": "application/json",
      },
    }).then((res) => this._responseStatus(res));
  }

  // Поставить\Снять ЛАЙК
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: this._headers,
    }).then((res) => this._responseStatus(res));
  }
}

// Создание экземпляра
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "c7a7f9e2-add2-49e1-b302-3362c55f30ce",
    "Content-Type": "application/json",
  },
});

export default api;
