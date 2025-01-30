/**Импорт компонентов*/
import "../pages/index.css";
import { createCard, deleteCard, setLike } from "./components/card.js";
import { openModal,closeModal } from "./components/modal.js";
import { validationConfig, enableValidation, clearValidation } from "./validation/validation.js";
import { getInitialProfile, getInitialCards, updateProfile, updateAvatar, newCard, removeCard, newtLike, removeLike} from "./api/api.js";

/**Темплейт карточки*/
const cardTemplate = document.querySelector("#card-template").content;

/**Переменные*/
let currentCard;
let currentCardData;
let currentProfile;
/**DOM узлы*/
const pageContent = document.querySelector(".page__content");
const content = pageContent.querySelector(".content");
const places = content.querySelector(".places");
/**DOM узлы - контент данных изменения*/
const cardsContainer = places.querySelector(".places__list");
const profileInfoContainer = content.querySelector(".profile__info");
const profileAvatar = content.querySelector(".profile__image");
/**DOM узлы - компоненты управления*/
const profileEditButton = content.querySelector(".profile__edit-button");
const profileAddButton = content.querySelector(".profile__add-button");
const profileEditAvatarButton = content.querySelector(".profile__image-edit");
/**DOM узлы - модальные окна*/
const popupProfile = pageContent.querySelector(".popup_type_edit");
const popupAddCard = pageContent.querySelector(".popup_type_new-card");
const popupAvatar = pageContent.querySelector(".popup_type_edit-avatar");
const popupOpenImage = pageContent.querySelector(".popup_type_image");
const popupDeleteCardsConfirm = pageContent.querySelector(".popup_type_delete_confirm");
/**DOM узлы - формы*/
const formEditProfile = popupProfile.querySelector(".popup__form");
const formAddCard = popupAddCard.querySelector(".popup__form");
const formAvatar = popupAvatar.querySelector(".popup__form");
const formDeleteCardsConfirm = popupDeleteCardsConfirm.querySelector(".popup__form");
/**DOM узлы - кнопки закрытия окон*/
const popupAddCardCloseButton = popupAddCard.querySelector(".popup__close");
const popupProfileCloseButton = popupProfile.querySelector(".popup__close");
const popupOpenImageCloseButton = popupOpenImage.querySelector(".popup__close");
const popupAvatarCloseButton = popupAvatar.querySelector(".popup__close");
const popupDeleteCardsConfirmCloseButton = popupDeleteCardsConfirm.querySelector(".popup__close");

/**Функции вывода ошибок API*/
function hideApiError(formElemet){
  const ApiErrorElement = formElemet.querySelector(validationConfig.errorApiClass);
  ApiErrorElement.classList.remove(validationConfig.errorClass);
  ApiErrorElement.textContent = "";
};
function showApiError(formElemet, errorText){
  const ApiElement = formElemet.querySelector(validationConfig.errorApiClass);
  ApiElement.classList.add(validationConfig.errorClass);
  ApiElement.textContent = errorText;
};

/**Функции смены текста кнопок форм*/
function setTextDefaultSaveButton(formElemet){
  const buttonElemet = formElemet.querySelector(".popup__button");
  buttonElemet.textContent = "Сохранить";
};
function setTextWaitSaveButton(formElemet){
  const buttonElemet = formElemet.querySelector(".popup__button");
  buttonElemet.textContent = "Сохранение...";
};
function setTextDefaultOkButton(formElemet){
  const buttonElemet = formElemet.querySelector(".popup__button");
  buttonElemet.textContent = "Да";
};
function setTextWaitOkButton(formElemet){
  const buttonElemet = formElemet.querySelector(".popup__button");
  buttonElemet.textContent = "Удаление...";
};

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
/**Функция меппинга данных между профайлом и данными с Сервера*/
function fillProfileAPI(source, target){
  if (target.classList.contains("profile__info")){
  const profileTitle = target.querySelector(".profile__title");
  const profileDescription = target.querySelector(".profile__description");
  profileTitle.textContent = source.name;
  profileDescription.textContent = source.about;
  profileAvatar.style.backgroundImage = "url('" + source.avatar + "')";
  currentProfile = source;
  }
};
/**Функция меппинга данных между аватаром и модальным окном аватара*/
function fillAvatarModal(source, target){
 if (source.classList.contains("profile__image") && target.classList.contains("popup_type_edit-avatar")){
  const avatarForm = target.querySelector(".popup__form");
  avatarForm.elements.link.value = source.style.backgroundImage.replace(/^.+?['"]|['"].+?$/g, "");;
  }
};
/**Функция меппинга данных между аватаром и данными с Сервера*/
function fillAvataAPI(source, target){
  if (target.classList.contains("profile__image")){
  target.style.backgroundImage = "url('" + source.avatar + "')";
  currentProfile = source;
  }
};

/**Событие открытия формы изображения*/
function handleOpenImage(cardData) {
  fillImageModal(cardData);
  openModal(popupOpenImage);
};
/**Событие открытия формы профайла*/
function handleOpenProfilePopup(evt) {
  setTextDefaultSaveButton(formEditProfile);
  clearValidation(formEditProfile, validationConfig); 
  fillProfileModal(profileInfoContainer, popupProfile);
  openModal(popupProfile);
};
/**Событие открытия формы аватара*/
function handleOpenAvatarPopup(evt) {
  setTextDefaultSaveButton(formAvatar);
  clearValidation(formAvatar, validationConfig); 
  fillAvatarModal(profileAvatar, popupAvatar);
  openModal(popupAvatar);
};
/**Событие открытия формы добавления карточки*/
function handleOpenAddCardPopup(evt) {
  formAddCard.reset();
  setTextDefaultSaveButton(formAddCard,);
  clearValidation(formAddCard, validationConfig); 
  openModal(popupAddCard);
};
/**Событие открытия формы подтверждения удаления*/
function handleOpenDeleteCardsConfirmPopup(cardData, cardItem) {
  currentCardData = cardData;
  currentCard = cardItem;
  setTextDefaultOkButton(formDeleteCardsConfirm);
  hideApiError(formDeleteCardsConfirm);
  openModal(popupDeleteCardsConfirm);
};
/**Событие закрытия формы*/
function handleClosePopup(evt) {
    const popupModal = evt.target.closest(".popup");
    closeModal(popupModal);
};
/**Установка/снятие лайка*/
function handleSetLike(cardData, profileData, cardItem){
  const cardLikeButton = cardItem.querySelector(".card__like-button");
  /**Если лайк установлен снимаем, иначе устанавливаем*/
  if (cardLikeButton.classList.contains("card__like-button_is-active") ){
    /**удаляем лайк на сервере*/
    removeLike(cardData._id)
    .then((result) => {
      setLike(result, profileData, cardItem);
    })
    .catch((error) => {
      console.log(error);
    }); 
  }else{
    /**Добавляем лайк на сервере*/
    newtLike(cardData._id)
    .then((result) => {
      setLike(result, profileData, cardItem);
    })
    .catch((error) => {
      console.log(error);
    }); 
  };
};

/**Отправка формы профайла*/
function handleFormProfileSubmit(evt) {
  /**Сброс событий формы на Submit*/
  evt.preventDefault();
  hideApiError(formEditProfile);
  setTextWaitSaveButton(formEditProfile);
  /**Обновляем данные профайла на сервере*/
  updateProfile(formEditProfile.elements.name.value, formEditProfile.elements.description.value)
  .then((result) => {
    /**Перенос значений API в профайл*/
    fillProfileAPI(result, profileInfoContainer);
    /**Очистка полей формы*/
    formEditProfile.reset();
    /**Закрытие модального окна*/
    closeModal(popupProfile);
  })
  .catch((error) => {
    showApiError(formEditProfile, error);
    setTextDefaultSaveButton(formEditProfile);
  }); 
};
/**Отправка формы аватара*/
function handleFormAvatarSubmit(evt) {
  /**Сброс событий формы на Submit*/
  evt.preventDefault();
  hideApiError(formAvatar);
  setTextWaitSaveButton(formAvatar);
  /**Обновляем данные аватара на сервере*/
  updateAvatar(formAvatar.elements.link.value)
  .then((result) => {
    /**Перенос значений API в аватар*/
    fillAvataAPI(result, profileAvatar);
    /**Очистка полей формы*/
    formAvatar.reset();
    /**Закрытие модального окна*/
    closeModal(popupAvatar);
  })
  .catch((error) => {
    showApiError(formAvatar, error);
    setTextDefaultSaveButton(formAvatar);
  }); 
};
/**отправка формы добавления карточки*/
function handleFormAddCardSubmit(evt) {
  /**Сброс событий формы на Submit*/
  evt.preventDefault();
  hideApiError(formAddCard);
  setTextWaitSaveButton(formAddCard);
  /**Создание новой карточки на основе введенных данных формы*/
  const cardName = formAddCard.querySelector(".popup__input_type_card-name");
  const cardUrl = formAddCard.querySelector(".popup__input_type_url");
  const cardData = {name: cardName.value,link: cardUrl.value};
  /**Обновляем данные аватара на сервере*/
  newCard(cardData)
  .then((result) => {
    const cardItem = createCard(cardTemplate,result,currentProfile,handleOpenDeleteCardsConfirmPopup,handleOpenImage,handleSetLike);
    /**Добавление новой карточки в начало списка*/
      cardsContainer.prepend(cardItem);
    /**Очистка полей формы*/
      formAddCard.reset();
    /**Закрытие модального окна*/
      clearValidation(formAddCard, validationConfig); 
      closeModal(popupAddCard);
  })
  .catch((error) => {
    showApiError(formAddCard, error);
    setTextDefaultSaveButton(formAddCard);
  }); 
};
/**Удаление карточки*/
function handleFormDeleteCardSubmit(evt) {
  /**Сброс событий формы на Submit*/
    evt.preventDefault();
    hideApiError(formDeleteCardsConfirm);
    setTextWaitOkButton(formDeleteCardsConfirm);
  /**удаляем карточку на сервере*/
  removeCard(currentCardData._id)
  .then((result) => {
    console.log(result);
    /**удаление карточки*/
    deleteCard(currentCard);
    currentCard = {};
    currentCardData = {};
    /**Закрытие модального окна*/
    closeModal(popupDeleteCardsConfirm);
  })
  .catch((error) => {
    showApiError(formDeleteCardsConfirm, error);
    setTextDefaultOkButton(formDeleteCardsConfirm);
  }); 
};

/**Регистрация событий открытия модульных окон*/
profileEditButton.addEventListener("click", handleOpenProfilePopup);
profileAddButton.addEventListener("click", handleOpenAddCardPopup);
profileEditAvatarButton.addEventListener("click", handleOpenAvatarPopup);
/**Регистрация событий закрытия модульных окон*/
popupProfileCloseButton.addEventListener("click", handleClosePopup);
popupAvatarCloseButton.addEventListener("click", handleClosePopup);
popupAddCardCloseButton.addEventListener("click", handleClosePopup);
popupOpenImageCloseButton.addEventListener("click", handleClosePopup);
popupDeleteCardsConfirmCloseButton.addEventListener("click", handleClosePopup);
/**Регистрация событий Submit модульных окон*/
formEditProfile.addEventListener("submit", handleFormProfileSubmit);
formAvatar.addEventListener("submit", handleFormAvatarSubmit);
formAddCard.addEventListener("submit", handleFormAddCardSubmit);
formAddCard.addEventListener("submit", handleFormAddCardSubmit);
formDeleteCardsConfirm.addEventListener("submit", handleFormDeleteCardSubmit);

/**Определение начального состояния анимации модальных окон для плавного открытия/закрытия*/
pageContent.querySelectorAll(".popup").forEach(function (popupModal) {
  popupModal.classList.add("popup_is-animated");
});

/**включение валидации*/
enableValidation(validationConfig); 

/**начальные запросы API*/
const initialsAPI = [getInitialProfile(), getInitialCards()];
/**выполняем начальные запросы API*/
Promise.all(initialsAPI)
  .then(([profileInfo, initialCards]) => {
    fillProfileAPI(profileInfo, profileInfoContainer);
    initialCards.forEach(function (cardData) {
      const cardItem = createCard(cardTemplate,cardData,currentProfile,handleOpenDeleteCardsConfirmPopup,handleOpenImage,handleSetLike);
      cardsContainer.append(cardItem);
    });
  })
  .catch((error) => {
    console.log(error);
  }); 