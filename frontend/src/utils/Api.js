class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfile(token) {
    return fetch(`${this._baseUrl}/users/me`, { headers: 
      {
        ...this._headers,
        authorization: `Bearer ${token}`

      } }).then(
      this._checkResponse
    );
  }
  
  getCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: 
      {
        ...this._headers,
        authorization: `Bearer ${token}`
      }, })
      .then(
      this._checkResponse
    );
  }
  editProfile(name, about, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: 
        {
          ...this._headers,
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }
  addCard(name, link,token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: 
      {
        ...this._headers,
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }
  deleteCard(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: 
      {
        ...this._headers,
        authorization: `Bearer ${token}`
      }
      }).then(this._checkResponse);
  }
  
  addLike(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: 
      {
        ...this._headers,
        authorization: `Bearer ${token}`
      },
    }).then(this._checkResponse);
  }


  deleteLike(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: 
      {
        ...this._headers,
        authorization: `Bearer ${token}`
      },
    }).then(this._checkResponse);
  }

  getAvatar() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  updateAvatar(avatar, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: 
      {
        ...this._headers,
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked, token) {
    return isLiked ? this.addLike(id, token) : this.deleteLike(id, token);
  }
  
}

export const api = new Api({
  baseUrl: "https://api.15pr.site",
  headers: {
      "Content-Type": "application/json",
  },
});
