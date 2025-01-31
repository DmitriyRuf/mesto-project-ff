/**Настройки подключения*/
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-31',
  headers: {
  authorization: '8fb61c75-604e-4d96-aba9-a3e69ed9080c',
  'Content-Type': 'application/json'
  }
};
/**Обработка ответа API*/
function handleResponse(response, message){
  return response.json( ).then( json => {
    if (response.ok){
      return json;
    }
    return Promise.reject(`${message} Ошибка: ${response.status}`);
  })  
  .then((result) => {
    return result;
  })
  .catch((err) => {
    return Promise.reject(err);
  });
};

/**Получить профайл*/
const getInitialProfile = () => { 
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => handleResponse(res,'Запрос профайла не выполнен.')); 
};

/**Получить карточки*/
const getInitialCards = () => { 
 return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => handleResponse(res,'Запрос карточек не выполнен.')); 
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
  .then(res => handleResponse(res,'Изменение профиля не выполнено.')); 
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
  .then(res => handleResponse(res,'Изменение аватара не выполнено.'));
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
  .then(res => handleResponse(res,'Добавление карточки не выполнено.'));
};

/**Удалить карточку*/
const removeCard = (deleteId) => { 
  return fetch(`${config.baseUrl}/cards/${deleteId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => handleResponse(res,'Удаление карточки не выполнено.'));
};

/**Поставить лайк на карточке*/
const newtLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => handleResponse(res,'Не удалось поставить лайк.'));
};

/**Убрать лайк на карточке*/
const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => handleResponse(res,'Не удалось убрать лайк.'));
}

/**Список объектов для экспорта*/
export { getInitialProfile, getInitialCards, updateProfile, updateAvatar, newCard, removeCard, newtLike, removeLike };