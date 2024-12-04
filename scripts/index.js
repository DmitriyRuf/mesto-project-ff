/**Темплейт карточки*/
const cardTemplate = document.querySelector("#card-template").content;

/**DOM узлы*/
const content = document.querySelector(".content");
const places = content.querySelector(".places");
const cardsContainer = places.querySelector(".places__list");

/**Функция создания карточки*/
function createCard(cardData, deleteCard) {
  /**Элементы карточки*/
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardtitle = cardItem.querySelector(".card__title");
  const cardDeleteButton = cardItem.querySelector(".card__delete-button");
  /**Заполнение картинки для карточки*/
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  /**Заполнение заголовка для карточки*/
  cardtitle.textContent = cardData.name;
  /**Определение функции для иконки удаления*/
  cardDeleteButton.addEventListener("click", deleteCard);
  /**Возвращение заполненной карточки*/
  return cardItem;
}

/**Функция удаления карточки*/
function deleteCard(event) {
  const cardItem = event.target.closest(".places__item"); 
  cardItem.remove();
}

/**Вывести карточки на страницу*/
initialCards.forEach(function (cardData) {
  const cardItem = createCard(cardData, deleteCard);  
  cardsContainer.append(cardItem);
});
