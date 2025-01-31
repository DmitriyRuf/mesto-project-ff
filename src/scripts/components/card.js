/**Функция создания карточки*/
function createCard(cardTemplate, cardData, profileData, deleteCardEvent, openImageEvent, setLikeEvent) {
    /**Элементы карточки*/
    const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
    const cardImage = cardItem.querySelector(".card__image");
    const cardtitle = cardItem.querySelector(".card__title");
    const cardLikeButton = cardItem.querySelector(".card__like-button");
    const cardDeleteButton = cardItem.querySelector(".card__delete-button");
    /**Заполнение Id карточки*/
    cardItem.id = cardData._id;
    /**Заполнение картинки для карточки*/
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    /**Заполнение заголовка для карточки*/
    cardtitle.textContent = cardData.name;
    /**Заполнение числа лайков карточки и установка лайка для текущего пользователя*/
    setLike(cardData, profileData, cardItem)
    /**Определение функции для иконки удаления или удаление самой кнопки*/
    if (cardData.owner._id == profileData._id){
    cardDeleteButton.addEventListener("click", () => deleteCardEvent(cardData, cardItem));
    } else {
      cardDeleteButton.remove();
    }
    /**Определение функции для открытия картинки*/
    cardImage.addEventListener("click", () => openImageEvent(cardData));
    /**Определение функции лайка*/
    cardLikeButton.addEventListener("click", () => setLikeEvent(cardData, profileData, cardItem));
    /**Возвращение заполненной карточки*/
    return cardItem;
  };
  
  /**Функция удаления карточки*/
  function deleteCard(cardItem) {
    cardItem.remove();
  };
  /**Функция установки/удаления лайка*/
  function setLike(cardData, profileData, cardItem) {
    const cardLikeButton = cardItem.querySelector(".card__like-button");
    const cardLikeCount = cardItem.querySelector(".card__like-count");
    cardLikeCount.textContent = cardData.likes.length;
    cardLikeButton.classList.toggle("card__like-button_is-active", cardData.likes.some(i => i._id === profileData._id));
  };

  /**Список объектов для экспорта*/
  export { createCard, deleteCard, setLike };