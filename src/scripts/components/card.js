/**Функция создания карточки*/
function createCard(cardTemplate, cardData, deleteCardEvent, openImageEvent, setLikeEvent) {
    /**Элементы карточки*/
    const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
    const cardImage = cardItem.querySelector(".card__image");
    const cardtitle = cardItem.querySelector(".card__title");
    const cardLikeButton = cardItem.querySelector(".card__like-button");
    const cardDeleteButton = cardItem.querySelector(".card__delete-button");
    /**Заполнение картинки для карточки*/
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    /**Заполнение заголовка для карточки*/
    cardtitle.textContent = cardData.name;
    /**Определение функции для иконки удаления*/
    cardDeleteButton.addEventListener("click", () => deleteCardEvent(cardItem));
    /**Определение функции для открытия картинки*/
    cardImage.addEventListener("click", () => openImageEvent(cardData));
    /**Определение функции лайка*/
    cardLikeButton.addEventListener("click", setLikeEvent);
    /**Возвращение заполненной карточки*/
    return cardItem;
  };
  
  /**Функция удаления карточки*/
  function deleteCard(cardItem) {
    cardItem.remove();
  };
  /**Функция установки/удаления лайка*/
  function setLike(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  }

  /**Список объектов для экспорта*/
  export { createCard, deleteCard, setLike };