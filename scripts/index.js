//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//DOM узлы
const content = document.querySelector(".content");
const places = content.querySelector(".places");
const placesList = places.querySelector(".places__list");

//Функция создания карточки
function addCard(cardValues, deleteCard) {
  //Элементы карточки
  const placesItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = placesItem.querySelector(".card__image");
  const cardtitle = placesItem.querySelector(".card__title");
  const cardDeleteButton = placesItem.querySelector(".card__delete-button");
  //Заполнение картинки для карточки
  cardImage.setAttribute("src", cardValues.link);
  cardImage.setAttribute("alt", cardValues.name);
  //Заполнение заголовка для карточки
  cardtitle.textContent = cardValues.name;
  //Определение функции для иконки удаления
  cardDeleteButton.addEventListener("click", deleteCard);
  //Возвращение заполненной карточки
  return placesItem;
}

//Функция удаления карточки
function deleteCard(event) {
  const placesItem = event.target.closest(".places__item");
  placesItem.remove();
}

//Вывести карточки на страницу
initialCards.forEach(function (cardValues) {
  const placesItem = addCard(cardValues, deleteCard);  
  placesList.append(placesItem);
});
