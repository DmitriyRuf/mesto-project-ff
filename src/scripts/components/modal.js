/**Функция закрытия модального окна на нажатие клафиш*/
function keyHandler(evt) {
  if (evt.key === "Escape"){
    const modalWindow = document.querySelector(".popup_is-opened");  
    if (modalWindow !== null){
        closeModal(modalWindow);
    }
  }
};
/**Функция закрытия модального окна на оверлей*/
function handleOverlyClosePopup(evt) {
    if (evt.target.classList.contains("popup_is-opened")){
        closeModal(evt.target);
    }
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

/**Список объектов для экспорта*/
export { openModal, closeModal };