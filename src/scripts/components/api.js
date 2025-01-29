/**Настройки подключения*/
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-31',
  headers: {
  authorization: '8fb61c75-604e-4d96-aba9-a3e69ed9080c',
  'Content-Type': 'application/json'
  }
}

/**Получить профайл*/
const getInitialProfile = () => { 
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok){
      return res.json( );
    }
    return Promise.reject(`Запрос профайла не выполнен. Ошибка: ${res.status}`);
  })
  .then((result) => {
    return result;
  })
  .catch((err) => {
    console.log(err);
  }); 
};

/**Получить карточки*/
const getInitialCards = () => { 
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok){
      return res.json( );
    }
    return Promise.reject(`Запрос карточек не выполнен. Ошибка: ${res.status}`);
  })
  .then((result) => {
    return result;
  })
  .catch((err) => {
    console.log(err);
  }); 
};

  /**Редактировать профиль*/
const updateProfile = (newName, newAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newAbout
    })
  })
  .then(res => {
    if (res.ok){
      return res.json( );
    }
    return Promise.reject(`Изменение профиля не выполнено. Ошибка: ${res.status}`);
  })
  .then((result) => {
    return result;
  })
  .catch((err) => {
    return Promise.reject(err);
  }); 
};

/**Редактировать аватар*/
const updateAvatar = (newAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatar
    })
  })
  .then(res => {
    if (res.ok){
      return res.json( );
    }
    return Promise.reject(`Изменение аватара не выполнено. Ошибка: ${res.status}`);
  })
  .then((result) => {
    return result;
  })
  .catch((err) => {
    return Promise.reject(err);
  }); 
};

/**Добавить карточку*/
const newCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link
    })
  })
  .then(res => {
    if (res.ok){
      return res.json( );
    }
    return Promise.reject(`Добавление карточки не выполнено. Ошибка: ${res.status}`);
  })
  .then((result) => {
    return result;
  })
  .catch((err) => {
    return Promise.reject(err);
  }); 
};

/**Удалить карточку*/
const removeCard = (deleteId) => { 
  return fetch(`${config.baseUrl}/cards/${deleteId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (res.ok){
      return res.json( );
    }
    return Promise.reject(`Удаление карточки не выполнено. Ошибка: ${res.status}`);
  })
  .then((result) => {
    return result;
  })
  .catch((err) => {
    return Promise.reject(err);
  }); 
};

/**Поставить лайк на карточке*/
const newtLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => {
    if (res.ok){
      return res.json( );
    }
    return Promise.reject(`Не удалось поставить лайк. Ошибка: ${res.status}`);
  })
  .then((result) => {
    return result;
  })
  .catch((err) => {
    return Promise.reject(err);
  }); 
};

/**Убрать лайк на карточке*/
const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (res.ok){
      return res.json( );
    }
    return Promise.reject(`Не удалось убрать лайк. Ошибка: ${res.status}`);
  })
  .then((result) => {
    return result;
  })
  .catch((err) => {
    return Promise.reject(err);
  }); 
}

/**Список объектов для экспорта*/
export { getInitialProfile, getInitialCards, updateProfile, updateAvatar, newCard, removeCard, newtLike, removeLike };