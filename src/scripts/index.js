/**Импорт компонентов*/
import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, setLike } from "./components/card.js";
import {openModal,closeModal } from "./components/modal.js";

/**Темплейт карточки*/
const cardTemplate = document.querySelector("#card-template").content;

/**DOM узлы*/
const pageContent = document.querySelector(".page__content");
const content = pageContent.querySelector(".content");
const places = content.querySelector(".places");
/**DOM узлы - контент данных изменения*/
const cardsContainer = places.querySelector(".places__list");
const profileInfoContainer = content.querySelector(".profile__info");
/**DOM узлы - компоненты управления*/
const profileEditButton = content.querySelector(".profile__edit-button");
const profileAddButton = content.querySelector(".profile__add-button");
/**DOM узлы - модальные окна*/
const popupProfile = pageContent.querySelector(".popup_type_edit");
const popupAddCard = pageContent.querySelector(".popup_type_new-card");
const popupOpenImage = document.querySelector(".popup_type_image");
/**DOM узлы - формы*/
const formEditProfile = popupProfile.querySelector(".popup__form");
const formAddCard = popupAddCard.querySelector(".popup__form");
/**DOM узлы - кнопки закрытия окон*/
const popupAddCardCloseButton = popupAddCard.querySelector(".popup__close");
const popupProfileCloseButton = popupProfile.querySelector(".popup__close");
const popupOpenImageCloseButton = popupOpenImage.querySelector(".popup__close");

/**Функция меппинга данных между карточкой и модальным окном картинки*/
function fillImageModal(cardData){
  const popupImage = popupOpenImage.querySelector(".popup__image");
  const popupCaption = popupOpenImage.querySelector(".popup__caption");
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
};
/**Функция меппинга данных между профайлом и модальным окном профайла*/
function fillProfileModal(source, target){
  if (source.classList.contains("profile__info") && target.classList.contains("popup_type_edit")){
  const profileTitle = source.querySelector(".profile__title");
  const profileDescription = source.querySelector(".profile__description");
  const profileForm = target.querySelector(".popup__form");
  profileForm.elements.name.value = profileTitle.textContent;
  profileForm.elements.description.value = profileDescription.textContent;
  }
};

/**Событие открытия формы изображения*/
function handleOpenImage(cardData) {
  fillImageModal(cardData, popupOpenImage);
  openModal(popupOpenImage);
}
/**Событие открытия формы профайла*/
function handleOpenProfilePopup(evt) {
  fillProfileModal(profileInfoContainer, popupProfile);
  openModal(popupProfile);
}
/**Событие открытия формы добавления карточки*/
function handleOpenAddCardPopup(evt) {
  openModal(popupAddCard);
}
/**Событие закрытия формы*/
function handleClosePopup(evt) {
    const popupModal = evt.target.closest(".popup");
    closeModal(popupModal);
}

/**Отправка формы профайла*/
function handleFormProfileSubmit(evt) {
/**Сброс событий формы на Submit*/
  evt.preventDefault();
/**Перенос значений формы в профайл*/
  const profileTitle = profileInfoContainer.querySelector(".profile__title");
  const profileDescription = profileInfoContainer.querySelector(".profile__description");
  profileTitle.textContent = formEditProfile.elements.name.value;
  profileDescription.textContent = formEditProfile.elements.description.value;
/**Очистка полей формы*/
  formEditProfile.reset();
/**Закрытие модального окна*/
  const popupModal = evt.target.closest(".popup");
  closeModal(popupModal);
}
/**отправка формы добавления карточки*/
function handleFormAddCardSubmit(evt) {
/**Сброс событий формы на Submit*/
  evt.preventDefault();
/**Создание новой карточки на основе введенных данных формы*/
  const cardName = formAddCard.querySelector(".popup__input_type_card-name");
  const cardUrl = formAddCard.querySelector(".popup__input_type_url");
  const cardData = {name: cardName.value,link: cardUrl.value};
  const cardItem = createCard(cardTemplate,cardData,deleteCard,handleOpenImage,setLike);
/**Добавление новой карточки в начало списка*/
  cardsContainer.prepend(cardItem);
/**Очистка полей формы*/
  formAddCard.reset();
/**Закрытие модального окна*/
  const popupModal = evt.target.closest(".popup");
  closeModal(popupModal);
}

/**Регистрация событий открытия модульных окон*/
profileEditButton.addEventListener("click", handleOpenProfilePopup);
profileAddButton.addEventListener("click", handleOpenAddCardPopup);
/**Регистрация событий закрытия модульных окон*/
popupProfileCloseButton.addEventListener("click", handleClosePopup);
popupAddCardCloseButton.addEventListener("click", handleClosePopup);
popupOpenImageCloseButton.addEventListener("click", handleClosePopup);
/**Регистрация событий Submit модульных окон*/
formEditProfile.addEventListener("submit", handleFormProfileSubmit);
formAddCard.addEventListener("submit", handleFormAddCardSubmit);

/**Определение начального состояния анимации модальных окон для плавного открытия/закрытия*/
pageContent.querySelectorAll(".popup").forEach(function (popupModal) {
  popupModal.classList.add("popup_is-animated");
});

/**Вывести карточки на страницу*/
initialCards.forEach(function (cardData) {
  const cardItem = createCard(cardTemplate,cardData,deleteCard,handleOpenImage,setLike);
  cardsContainer.append(cardItem);
});