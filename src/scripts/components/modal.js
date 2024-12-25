/**Функция закрытия модального окна на нажатие клафиш*/
function keyHandler(evt) {
  if (evt.key === "Escape"){
    const modalWindow = document.querySelector(".popup_is-opened");  
    closeModal(modalWindow);
  }
};
/**Функция закрытия модального окна на оверлей*/
function handleOverlyClosePopup(evt) {
    closeModal(evt.target);
}
/**Функция открытия модального окна*/
function openModal(modalWindow){
    /**добавление класса анимации для плавного открытия*/
    modalWindow.classList.add("popup_is-opened");
    /**регистрация событий для закрытия формы*/
    document.body.addEventListener("keydown", keyHandler);
    modalWindow.addEventListener("click", handleOverlyClosePopup);
}
/**Функция закрытия модального окна*/
function closeModal(modalWindow){
    /**удаление класса анимации для плавного закрытия*/
    modalWindow.classList.remove('popup_is-opened');
    /**регистрация событий для закрытия формы*/
    document.body.removeEventListener('keydown', keyHandler);
    modalWindow.removeEventListener("click", handleOverlyClosePopup);
}
/**Функция меппинга данных между карточкой и модальным окном картинки*/
function fillImageModal(source, target){
    const cardImage = source.querySelector(".card__image");
    const cardtitle = source.querySelector(".card__title");
    const popupImage = target.querySelector(".popup__image");
    const popupCaption = target.querySelector(".popup__caption");
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardtitle.textContent;
};
/**Функция меппинга данных между профайлом и модальным окном профайла*/
function fillProfileModal(source, target){
    const profileTitle = source.querySelector(".profile__title");
    const profileDescription = source.querySelector(".profile__description");
    const profileForm = target.querySelector(".popup__form");
    profileForm.elements.name.value = profileTitle.textContent;
    profileForm.elements.description.value = profileDescription.textContent;
};

/**Список объектов для экспорта*/
export { openModal, closeModal, fillImageModal, fillProfileModal };